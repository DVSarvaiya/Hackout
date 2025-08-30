"use client";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
} from "react-leaflet";
import {
  Maximize2,
  Navigation,
  ZoomIn,
  ZoomOut,
  MapPin,
  AlertCircle,
  Waves,
  Radio,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

// Custom icon creation function
const createCustomIcon = (color, type) => {
  const svgIcon = `
    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="15" cy="15" r="3" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

export default function MapVisualization({ selectedAlert, selectedLayer }) {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([22.5726, 88.3639]); // Kolkata coastal area
  const [zoom, setZoom] = useState(10);

  // Sample sensor locations around coastal areas
  const sensorLocations = [
    {
      id: 1,
      position: [22.5526, 88.3339],
      type: "tide",
      status: "active",
      value: "2.4m",
      name: "Tide Gauge Station 1",
    },
    {
      id: 2,
      position: [22.5926, 88.4039],
      type: "weather",
      status: "active",
      value: "45km/h",
      name: "Weather Station A",
    },
    {
      id: 3,
      position: [22.5326, 88.3839],
      type: "water",
      status: "warning",
      value: "pH 7.8",
      name: "Water Quality Monitor",
    },
    {
      id: 4,
      position: [22.6126, 88.3439],
      type: "alert",
      status: "danger",
      value: "High tide alert",
      name: "Alert Zone Alpha",
    },
    {
      id: 5,
      position: [22.5626, 88.4239],
      type: "tide",
      status: "active",
      value: "2.2m",
      name: "Tide Gauge Station 2",
    },
  ];

  // Alert zones
  const alertZones = [
    {
      center: [22.5726, 88.3639],
      radius: 3000,
      severity: "high",
      name: "Zone A",
    },
    {
      center: [22.5326, 88.4039],
      radius: 2500,
      severity: "medium",
      name: "Zone B",
    },
  ];

  // Ocean currents paths
  const currentPaths = [
    [
      [22.55, 88.35],
      [22.57, 88.38],
      [22.59, 88.41],
    ],
    [
      [22.52, 88.4],
      [22.54, 88.42],
      [22.56, 88.44],
    ],
  ];

  const getMarkerColor = (status) => {
    switch (status) {
      case "active":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "danger":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getZoneColor = (severity) => {
    switch (severity) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  useEffect(() => {
    if (selectedAlert && map) {
      // Pan to alert location if selected
      map.setView([22.5726, 88.3639], 12);
    }
  }, [selectedAlert, map]);

  return (
    <div className="h-full w-full relative">
      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          background: #e0f2fe;
          border-radius: 0.5rem; /* Match the parent's border radius */
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-content {
          margin: 12px;
          font-size: 14px;
        }
        /* Hide leaflet attribution in corners to maintain rounded look */
        .leaflet-control-attribution {
          border-radius: 0 0 0.5rem 0;
        }
        .leaflet-control-zoom {
          border-radius: 0.5rem;
          overflow: hidden;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        whenCreated={setMap}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.8}
        />

        {/* Alert Zones */}
        {(selectedLayer === "zones" || selectedLayer === "all") &&
          alertZones.map((zone) => (
            <Circle
              key={zone.name}
              center={zone.center}
              radius={zone.radius}
              pathOptions={{
                fillColor: getZoneColor(zone.severity),
                fillOpacity: 0.2,
                color: getZoneColor(zone.severity),
                weight: 2,
                dashArray: zone.severity === "high" ? "5, 10" : undefined,
              }}
            >
              <Popup>
                <div className="text-center">
                  <h4 className="font-semibold">{zone.name}</h4>
                  <p className="text-sm text-gray-600">
                    Severity: {zone.severity}
                  </p>
                  <p className="text-sm">Radius: {zone.radius / 1000}km</p>
                </div>
              </Popup>
            </Circle>
          ))}

        {/* Ocean Currents */}
        {(selectedLayer === "currents" || selectedLayer === "all") &&
          currentPaths.map((path, index) => (
            <Polyline
              key={index}
              positions={path}
              pathOptions={{
                color: "#3b82f6",
                weight: 3,
                opacity: 0.6,
                dashArray: "10, 10",
                dashOffset: "0",
              }}
            />
          ))}

        {/* Sensor Markers */}
        {(selectedLayer === "sensors" ||
          selectedLayer === "all" ||
          selectedLayer === "weather") &&
          sensorLocations
            .filter((sensor) =>
              selectedLayer === "weather" ? sensor.type === "weather" : true
            )
            .map((sensor) => (
              <Marker
                key={sensor.id}
                position={sensor.position}
                icon={createCustomIcon(
                  getMarkerColor(sensor.status),
                  sensor.type
                )}
              >
                <Popup>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {sensor.name}
                    </h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`ml-2 font-medium ${
                            sensor.status === "active"
                              ? "text-green-600"
                              : sensor.status === "warning"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {sensor.status.toUpperCase()}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600">Reading:</span>
                        <span className="ml-2 font-medium">{sensor.value}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: 2 minutes ago
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={() => {
            if (map) {
              map.setView(center, 10);
            }
          }}
          className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          title="Reset View"
        >
          <Navigation className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={() => {
            if (map) {
              map.zoomIn();
            }
          }}
          className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={() => {
            if (map) {
              map.zoomOut();
            }
          }}
          className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-3 z-[1000]">
        <h4 className="text-xs font-medium text-gray-700 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Active Sensor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Alert</span>
          </div>
          {(selectedLayer === "zones" || selectedLayer === "all") && (
            <>
              <div className="border-t pt-1 mt-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">High Risk Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">
                    Medium Risk Zone
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Weather Overlay */}
      {(selectedLayer === "weather" || selectedLayer === "all") && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-[1000]">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Weather Conditions
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-600">Wind: NE 45 km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-600">Wave Height: 2.4m</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-600">Humidity: 78%</span>
            </div>
          </div>
        </div>
      )}

      {/* Selected Alert Popup */}
      {selectedAlert && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 max-w-xs z-[1000]">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">
                {selectedAlert.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {selectedAlert.location}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {selectedAlert.description}
              </p>
              <button
                onClick={() => {
                  if (map && selectedAlert.coordinates) {
                    map.setView(selectedAlert.coordinates, 14);
                  }
                }}
                className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                View on map →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Status Bar */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md px-3 py-2 z-[1000]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">System Online</span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
