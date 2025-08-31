"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  AlertTriangle,
  Wind,
  Activity,
  Bell,
  Shield,
  RefreshCw,
  Zap,
  Radio,
  Cloud,
  Layers,
  CloudRain,
} from "lucide-react";

export default function Dashboard() {
  const [coords, setCoords] = useState({ lat: 40.7128, lon: -74.006 }); // default: NYC
  const [realTimeData, setRealTimeData] = useState({
    windSpeed: 0,
    precipitation: 0,
    lastUpdate: null,
    alertsSent: 1247,
    activeAlerts: 3,
    responseTime: 3.2,
    sensorStatus: 142,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState("sensors");

  // 🛰 Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Location permission denied. Using default (NYC).", err);
        }
      );
    }
  }, []);

  // 🌦 Fetch weather data
  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    setError(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=wind_speed_10m,precipitation`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      const data = await response.json();
      const { current } = data;

      setRealTimeData((prev) => ({
        ...prev,
        windSpeed: current.wind_speed_10m,
        precipitation: current.precipitation,
        lastUpdate: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [coords]);

  // Auto refresh every 30s
  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 30000);
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-semibold text-gray-800">
                Coastal Threat Alert System
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    realTimeData.activeAlerts > 0
                      ? "bg-orange-400"
                      : "bg-green-400"
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {realTimeData.activeAlerts > 0
                    ? "Active Alerts"
                    : "System Normal"}
                </span>
              </div>
              <button
                onClick={fetchWeatherData}
                disabled={isRefreshing}
                className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-1">
                <AlertTriangle className="h-4 w-4" />
                Active Threats
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {realTimeData.activeAlerts}
              </div>
              <div className="text-xs text-gray-500 mt-1">+2</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-1">
                <Bell className="h-4 w-4" />
                Alerts Sent
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {realTimeData.alertsSent.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">+124</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-1">
                <Zap className="h-4 w-4" />
                Response Time
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {realTimeData.responseTime} min
              </div>
              <div className="text-xs text-gray-500 mt-1">-0.5</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-1">
                <Radio className="h-4 w-4" />
                Sensors Active
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {realTimeData.sensorStatus}/150
              </div>
              <div className="text-xs text-gray-500 mt-1">94.7%</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Map */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[600px]">
              <div className="p-4 border-b border-gray-100 flex justify-between">
                <h2 className="text-lg font-medium text-gray-800">
                  Live Monitoring Map
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Cloud className="h-4 w-4" />
                  Satellite Feed
                </div>
              </div>

              <div className="flex h-[calc(100%-60px)]">
                {/* Layer controls */}
                <div className="w-44 bg-gray-50 p-4 border-r border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Layers
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: "currents", label: "Currents" },
                      { id: "sensors", label: "Sensors" },
                      { id: "zones", label: "Alert Zones" },
                    ].map((layer) => (
                      <label
                        key={layer.id}
                        className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                      >
                        <input
                          type="radio"
                          name="layer"
                          value={layer.id}
                          checked={selectedLayer === layer.id}
                          onChange={(e) => setSelectedLayer(e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-600">
                          {layer.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Map area */}
                <div className="flex-1 relative p-2">
                  <div className="h-full w-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                    Live Map Placeholder <br />
                    <span className="text-xs">
                      ({coords.lat.toFixed(2)}, {coords.lon.toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Environmental Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Environmental Metrics
              </h3>
              {loading && !error && (
                <div className="text-center text-gray-500">Loading data...</div>
              )}
              {error && (
                <div className="text-center text-red-500">Error: {error}</div>
              )}
              {!loading && !error && (
                <>
                  {/* Wind Speed */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Wind Speed</span>
                      <Wind className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-gray-800">
                        {Math.round(realTimeData.windSpeed)} km/h
                      </span>
                      <span className="text-sm text-gray-500">NE</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(realTimeData.windSpeed, 100)}%`,
                          background:
                            realTimeData.windSpeed > 60
                              ? "#ef4444"
                              : realTimeData.windSpeed > 40
                              ? "#f59e0b"
                              : "#10b981",
                        }}
                      />
                    </div>
                  </div>

                  {/* Precipitation */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Current Precipitation
                      </span>
                      <CloudRain className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-semibold text-gray-800 mb-2">
                      {realTimeData.precipitation} mm
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Hourly Rain:</span>
                        <span className="ml-1 text-gray-700">
                          {realTimeData.precipitation > 0 ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Last update:</span>
                        <span className="ml-1 text-gray-700">
                          {realTimeData.lastUpdate
                            ? new Date(realTimeData.lastUpdate).toLocaleTimeString()
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* AI Predictions */}
            <div className="bg-blue-50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  AI Threat Prediction
                </h3>
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Storm Surge Risk
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      65%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Erosion Probability
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      25%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
