import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { COASTAL_POINTS, CRITICAL_WAVE_HEIGHT } from "@/lib/coastal-points";
import { calculateDistance, getDateRange } from "@/lib/utils";

// Configuration - Updated to 10km as requested
const ALERT_RADIUS_KM = 10; // Critical danger zone
const WARNING_RADIUS_KM = 25; // Warning zone
const DANGER_THRESHOLD = CRITICAL_WAVE_HEIGHT; // 2.5m
const WARNING_THRESHOLD = CRITICAL_WAVE_HEIGHT * 0.8; // 2.0m

export async function GET() {
  try {
    const { start_date, end_date } = getDateRange();
    const waveData = [];
    const alertedUsers = new Map();
    let totalAlertsSent = 0;
    let totalWarningsSent = 0;

    // Get the base URL dynamically
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    // Fetch all users from database
    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select("id, email, lat, long, name")
      .not("lat", "is", null)
      .not("long", "is", null);

    if (usersError) {
      throw new Error("Failed to fetch users: " + usersError.message);
    }

    console.log(`\n📊 DATABASE CHECK:`);
    console.log(
      `Found ${users?.length || 0} users with coordinates in database`
    );

    // Debug: Show sample users
    if (users && users.length > 0) {
      console.log("\nSample users with coordinates:");
      users.slice(0, 3).forEach((user) => {
        console.log(
          `- ${user.name} (${user.email}): lat=${user.lat}, long=${user.long}`
        );
      });
    } else {
      console.log(
        "⚠️  NO USERS FOUND WITH COORDINATES! Please add users with lat/long to the database."
      );
    }

    // Check wave heights for each coastal point
    for (const point of COASTAL_POINTS) {
      try {
        const response = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${point.lat}&longitude=${point.lng}&hourly=wave_height&start_date=${start_date}&end_date=${end_date}`
        );

        const data = await response.json();

        if (data.hourly && data.hourly.wave_height) {
          const waveHeights = data.hourly.wave_height.filter((h) => h !== null);
          const maxWaveHeight = Math.max(...waveHeights);
          const currentWaveHeight = waveHeights[waveHeights.length - 1] || 0;

          let alertsSentForLocation = 0;
          let warningsSentForLocation = 0;

          // Determine alert level
          const alertLevel =
            maxWaveHeight >= DANGER_THRESHOLD
              ? "DANGER"
              : maxWaveHeight >= WARNING_THRESHOLD
              ? "WARNING"
              : "SAFE";

          // Always log the wave data for each location
          console.log(
            `\n📍 ${point.name}: ${maxWaveHeight.toFixed(2)}m (${alertLevel})`
          );

          if (alertLevel !== "SAFE" && users && users.length > 0) {
            console.log(`🌊 ${alertLevel} DETECTED at ${point.name}!`);
            console.log(`   Max height: ${maxWaveHeight.toFixed(2)}m`);
            console.log(`   Current height: ${currentWaveHeight.toFixed(2)}m`);
            console.log(
              `   Thresholds - Danger: ${DANGER_THRESHOLD}m, Warning: ${WARNING_THRESHOLD}m`
            );

            // Find all users and their distances
            const usersWithDistance = users
              .map((user) => {
                const distance = calculateDistance(
                  point.lat,
                  point.lng,
                  parseFloat(user.lat),
                  parseFloat(user.long)
                );
                return { ...user, distance };
              })
              .sort((a, b) => a.distance - b.distance); // Sort by distance

            // Categorize users by distance
            const usersByZone = {
              danger: usersWithDistance.filter(
                (u) => u.distance <= ALERT_RADIUS_KM
              ),
              warning: usersWithDistance.filter(
                (u) =>
                  u.distance > ALERT_RADIUS_KM &&
                  u.distance <= WARNING_RADIUS_KM
              ),
              nearby: usersWithDistance.filter(
                (u) => u.distance > WARNING_RADIUS_KM && u.distance <= 50
              ),
            };

            console.log(`\n   User distribution for ${point.name}:`);
            console.log(
              `   - Danger zone (≤${ALERT_RADIUS_KM}km): ${usersByZone.danger.length} users`
            );
            console.log(
              `   - Warning zone (${ALERT_RADIUS_KM}-${WARNING_RADIUS_KM}km): ${usersByZone.warning.length} users`
            );
            console.log(
              `   - Nearby (${WARNING_RADIUS_KM}-50km): ${usersByZone.nearby.length} users`
            );

            // Show nearest users
            if (usersWithDistance.length > 0) {
              console.log(`\n   Nearest users:`);
              usersWithDistance.slice(0, 5).forEach((user) => {
                console.log(
                  `   - ${user.name} (${user.email}): ${user.distance.toFixed(
                    2
                  )}km away`
                );
              });
            }

            // Function to send alert to a single user
            const sendAlertToUser = async (user, urgency) => {
              const existingAlert = alertedUsers.get(user.id);
              if (existingAlert && existingAlert.priority >= urgency.priority) {
                console.log(
                  `   ⏭️  Skipping ${user.email} - already sent higher priority alert`
                );
                return false;
              }

              try {
                console.log(
                  `   📧 Sending ${urgency.type} alert to ${
                    user.email
                  } (${user.distance.toFixed(2)}km away)...`
                );

                const alertMessage = `
${urgency.emoji} ${urgency.title} ${urgency.emoji}

Dear ${user.name || "User"},

${urgency.message}

Location: ${point.name}
Your Distance: ${user.distance.toFixed(2)}km
Current Wave Height: ${currentWaveHeight.toFixed(2)}m
Maximum Wave Height: ${maxWaveHeight.toFixed(2)}m
Critical Threshold: ${DANGER_THRESHOLD}m

${urgency.instructions}

Stay safe!
                `.trim();

                const alertResponse = await fetch(`${baseUrl}/api/send-alert`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: user.email,
                    alertMessage: alertMessage,
                    priority: urgency.priority,
                  }),
                });

                const alertResult = await alertResponse.json();

                if (alertResponse.ok) {
                  alertedUsers.set(user.id, {
                    priority: urgency.priority,
                    type: urgency.type,
                  });
                  console.log(
                    `   ✅ ${urgency.type} alert sent successfully to ${user.email}`
                  );
                  return true;
                } else {
                  console.error(
                    `   ❌ Failed to send alert to ${user.email}:`,
                    alertResult.error
                  );
                  return false;
                }
              } catch (alertError) {
                console.error(
                  `   ❌ Error sending alert to ${user.email}:`,
                  alertError.message
                );
                return false;
              }
            };

            // Send alerts based on severity and distance
            if (alertLevel === "DANGER") {
              // Critical alerts for users in danger zone
              console.log(`\n   Sending DANGER alerts...`);
              for (const user of usersByZone.danger) {
                const sent = await sendAlertToUser(user, {
                  type: "DANGER",
                  priority: 3,
                  emoji: "🚨",
                  title: "IMMEDIATE DANGER - HIGH WAVE ALERT",
                  message: `Extremely dangerous wave conditions (${maxWaveHeight.toFixed(
                    2
                  )}m) detected very close to your location!`,
                  instructions:
                    "EVACUATE COASTAL AREAS IMMEDIATELY! Move to higher ground and follow emergency services instructions. DO NOT approach the coast!",
                });
                if (sent) alertsSentForLocation++;
              }

              // High priority warnings for users in warning zone
              for (const user of usersByZone.warning) {
                const sent = await sendAlertToUser(user, {
                  type: "WARNING",
                  priority: 2,
                  emoji: "⚠️",
                  title: "HIGH WAVE WARNING - DANGER NEARBY",
                  message: `Dangerous wave conditions (${maxWaveHeight.toFixed(
                    2
                  )}m) detected near your area.`,
                  instructions:
                    "Stay away from beaches and coastal areas. Monitor local news for updates. Be prepared to evacuate if conditions worsen.",
                });
                if (sent) warningsSentForLocation++;
              }
            }

            // Send warnings for WARNING level
            if (alertLevel === "WARNING") {
              console.log(`\n   Sending WARNING alerts...`);

              // Send warnings to users in danger zone
              for (const user of usersByZone.danger) {
                const sent = await sendAlertToUser(user, {
                  type: "WARNING",
                  priority: 2,
                  emoji: "⚠️",
                  title: "WAVE HEIGHT WARNING",
                  message: `Elevated wave conditions (${maxWaveHeight.toFixed(
                    2
                  )}m) detected very close to your location.`,
                  instructions:
                    "Avoid coastal areas and beaches. Do not engage in water activities. Monitor conditions closely.",
                });
                if (sent) warningsSentForLocation++;
              }

              // Send lower priority warnings to users in warning zone
              for (const user of usersByZone.warning) {
                const sent = await sendAlertToUser(user, {
                  type: "WARNING",
                  priority: 1,
                  emoji: "⚠️",
                  title: "COASTAL ADVISORY",
                  message: `Moderate wave conditions (${maxWaveHeight.toFixed(
                    2
                  )}m) detected in your region.`,
                  instructions:
                    "Exercise caution near coastal areas. Postpone beach activities.",
                });
                if (sent) warningsSentForLocation++;
              }
            }

            totalAlertsSent += alertsSentForLocation;
            totalWarningsSent += warningsSentForLocation;

            // Summary for this location
            if (alertsSentForLocation > 0 || warningsSentForLocation > 0) {
              console.log(`\n   📊 Alerts sent for ${point.name}:`);
              console.log(`   - Critical alerts: ${alertsSentForLocation}`);
              console.log(`   - Warnings: ${warningsSentForLocation}`);
            }
          }

          waveData.push({
            name: point.name,
            lat: point.lat,
            lng: point.lng,
            maxWaveHeight: maxWaveHeight,
            currentWaveHeight: currentWaveHeight,
            alertLevel: alertLevel,
            criticalAlertsSent: alertsSentForLocation,
            warningsSent: warningsSentForLocation,
            timeChecked: new Date().toISOString(),
            // Add additional info for debugging
            dangerZoneUsers: users
              ? users.filter((u) => {
                  const dist = calculateDistance(
                    point.lat,
                    point.lng,
                    parseFloat(u.lat),
                    parseFloat(u.long)
                  );
                  return dist <= ALERT_RADIUS_KM;
                }).length
              : 0,
            warningZoneUsers: users
              ? users.filter((u) => {
                  const dist = calculateDistance(
                    point.lat,
                    point.lng,
                    parseFloat(u.lat),
                    parseFloat(u.long)
                  );
                  return dist > ALERT_RADIUS_KM && dist <= WARNING_RADIUS_KM;
                }).length
              : 0,
          });
        }
      } catch (fetchError) {
        console.error(`Failed to fetch data for ${point.name}:`, fetchError);
        waveData.push({
          name: point.name,
          lat: point.lat,
          lng: point.lng,
          error: "Failed to fetch wave data",
          maxWaveHeight: 0,
          currentWaveHeight: 0,
          alertsSent: 0,
          warningsSent: 0,
        });
      }
    }

    // Final summary
    console.log(`\n\n📊 FINAL SUMMARY:`);
    console.log(`===================`);
    console.log(`🚨 Critical alerts sent: ${totalAlertsSent}`);
    console.log(`⚠️  Warnings sent: ${totalWarningsSent}`);
    console.log(
      `📧 Total notifications: ${totalAlertsSent + totalWarningsSent}`
    );
    console.log(`📍 Locations checked: ${COASTAL_POINTS.length}`);
    console.log(`👥 Users in database: ${users?.length || 0}`);

    // Show dangerous locations
    const dangerousLocations = waveData.filter(
      (w) => w.alertLevel === "DANGER"
    );
    if (dangerousLocations.length > 0) {
      console.log(`\n🚨 DANGEROUS LOCATIONS:`);
      dangerousLocations.forEach((loc) => {
        console.log(
          `   - ${loc.name}: ${loc.maxWaveHeight.toFixed(2)}m (${
            loc.dangerZoneUsers || 0
          } users in danger zone)`
        );
      });
    }

    // Show warning locations
    const warningLocations = waveData.filter((w) => w.alertLevel === "WARNING");
    if (warningLocations.length > 0) {
      console.log(`\n⚠️  WARNING LOCATIONS:`);
      warningLocations.forEach((loc) => {
        console.log(`   - ${loc.name}: ${loc.maxWaveHeight.toFixed(2)}m`);
      });
    }

    return NextResponse.json({
      success: true,
      summary: {
        criticalAlertsSent: totalAlertsSent,
        warningsSent: totalWarningsSent,
        totalNotificationsSent: totalAlertsSent + totalWarningsSent,
        locationsChecked: COASTAL_POINTS.length,
        usersChecked: users?.length || 0,
        dangerousLocations: dangerousLocations.length,
        warningLocations: warningLocations.length,
      },
      waveData: waveData,
      alerts: {
        dangerZones: dangerousLocations.map((loc) => ({
          location: loc.name,
          waveHeight: loc.maxWaveHeight,
          usersInDangerZone: loc.dangerZoneUsers || 0,
          alertsSent: loc.criticalAlertsSent,
        })),
        warningZones: warningLocations.map((loc) => ({
          location: loc.name,
          waveHeight: loc.maxWaveHeight,
          usersInWarningZone: loc.warningZoneUsers || 0,
          warningsSent: loc.warningsSent,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Wave alert check error:", error);
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
