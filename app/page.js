"use client";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Waves,
  Wind,
  Droplet,
  Activity,
  Bell,
  Shield,
  Users,
  AlertCircle,
  RefreshCw,
  Zap,
  Radio,
  Cloud,
  Layers,
  TrendingUp,
} from "lucide-react";
// Add this import
import MapVisualization from "@/components/MapVisualization";

export default function Dashboard() {
  const [realTimeData, setRealTimeData] = useState({
    seaLevel: 2.47,
    windSpeed: 48,
    waterQuality: "Good",
    activeAlerts: 3,
    alertsSent: 1247,
    responseTime: 3.2,
    sensorStatus: 142,
    lastUpdate: new Date(),
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState("sensors");
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        seaLevel: prev.seaLevel + (Math.random() - 0.5) * 0.05,
        windSpeed: Math.max(
          10,
          Math.min(80, prev.windSpeed + (Math.random() - 0.5) * 3)
        ),
        lastUpdate: new Date(),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header with Stats */}
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
                onClick={handleRefresh}
                className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Key Metrics */}
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Map Section */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[600px]">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-800">
                    Live Monitoring Map
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Cloud className="h-4 w-4" />
                    Satellite Feed
                  </div>
                </div>
              </div>

              <div className="flex h-[calc(100%-60px)]">
                {/* Layer Controls */}
                <div className="w-44 bg-gray-50 p-4 border-r border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Layers
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

                {/* Map Area with rounded corners */}
                <div className="flex-1 relative p-2">
                  <div className="h-full w-full rounded-lg overflow-hidden">
                    <MapVisualization
                      selectedAlert={selectedAlert}
                      selectedLayer={selectedLayer}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Environmental Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Environmental Metrics
              </h3>

              {/* Sea Level */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Sea Level</span>
                  <Waves className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-gray-800">
                    {realTimeData.seaLevel.toFixed(2)}m
                  </span>
                  <span className="text-sm text-green-600">+0.3m</span>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Tide Status: Rising</span>
                  <span>Next High: 14:30</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Wind Speed</span>
                  <Wind className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-gray-800">
                    {realTimeData.windSpeed.toFixed(2)} km/h
                  </span>
                  <span className="text-sm text-gray-500">NE</span>
                </div>
                <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(realTimeData.windSpeed * 1.25, 100)}%`,
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

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Water Quality Index
                  </span>
                  <Droplet className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-3xl font-semibold text-gray-800 mb-2">
                  {realTimeData.waterQuality}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">pH Level:</span>
                    <span className="ml-1 text-gray-700">7.8</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Turbidity:</span>
                    <span className="ml-1 text-gray-700">Low</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Pollution:</span>
                    <span className="ml-1 text-green-600">None detected</span>
                  </div>
                </div>
              </div>
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

        {/* Bottom Row */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          {/* Sensor Network */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Sensor Network
              </h4>
              <Radio className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-800">
              {realTimeData.sensorStatus}/150
            </p>
            <p className="text-xs text-gray-500 mb-3">94.7% operational</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Tide Gauges</span>
                <span className="text-gray-700">48/50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Weather Stations</span>
                <span className="text-gray-700">47/50</span>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Response Time
              </h4>
              <Zap className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-800">
              {realTimeData.responseTime} min
            </p>
            <p className="text-xs text-gray-500 mb-3">Average today</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">SMS Alerts</span>
                <span className="text-green-600">1.2 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">App Push</span>
                <span className="text-green-600">0.8 min</span>
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="bg-orange-50 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Risk Level</h4>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-2xl font-semibold text-orange-700">Moderate</p>
            <p className="text-xs text-gray-600 mb-2">Storm approaching</p>
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <div className="h-1.5 w-1.5 bg-orange-400 rounded-full animate-pulse"></div>
              6-8 hours ETA
            </div>
          </div>

          {/* Community Impact */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Community Impact
              </h4>
              <Users className="h-4 w-4 text-gray-600" />
            </div>
            <p className="text-2xl font-semibold text-gray-800">42,500</p>
            <p className="text-xs text-gray-500 mb-2">People in alert zones</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                12 High
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                28 Med
              </span>
            </div>
          </div>
        </div>

        {/* Activity Feed and Blue Carbon Protection */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Recent Activity
              </h3>
              <span className="text-xs text-gray-500">Live updates</span>
            </div>
            <div className="space-y-3">
              {[
                {
                  time: "2m ago",
                  event: "High tide alert issued for Zone A",
                  icon: Waves,
                  color: "text-orange-500",
                },
                {
                  time: "5m ago",
                  event: "Anomaly detected by Sensor #47",
                  icon: AlertCircle,
                  color: "text-red-500",
                },
                {
                  time: "12m ago",
                  event: "1,247 SMS alerts sent successfully",
                  icon: Bell,
                  color: "text-green-500",
                },
                {
                  time: "15m ago",
                  event: "Water quality monitoring completed",
                  icon: Droplet,
                  color: "text-blue-500",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <activity.icon
                    className={`h-4 w-4 ${activity.color} flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 truncate">
                      {activity.event}
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blue Carbon Protection */}
          <div className="bg-green-50 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Blue Carbon Protection
              </h3>
              <Shield className="h-4 w-4 text-green-600" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Mangroves</p>
                <p className="text-lg font-semibold text-gray-800">98.5%</p>
                <p className="text-xs text-gray-500">Protected</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Seagrass</p>
                <p className="text-lg font-semibold text-gray-800">87.2%</p>
                <p className="text-xs text-gray-500">Healthy</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Salt Marsh</p>
                <p className="text-lg font-semibold text-gray-800">92.8%</p>
                <p className="text-xs text-gray-500">Monitored</p>
              </div>
            </div>
            <div className="border-t border-green-100 pt-3">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-xs text-gray-600">Carbon Sequestration</p>
                  <p className="font-semibold text-gray-800">
                    2,450 tons CO₂/yr
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Threats Detected</p>
                  <p className="font-semibold text-orange-600">3 risks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Response Teams */}
        <div className="bg-white rounded-xl shadow-sm p-5 mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Emergency Response Teams
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                name: "Disaster Management",
                status: "Standby",
                teams: 12,
                icon: Shield,
                statusColor: "bg-gray-100 text-gray-700",
              },
              {
                name: "Coast Guard",
                status: "Active",
                teams: 8,
                icon: Waves,
                statusColor: "bg-blue-100 text-blue-700",
              },
              {
                name: "Environmental NGOs",
                status: "Monitoring",
                teams: 15,
                icon: Droplet,
                statusColor: "bg-green-100 text-green-700",
              },
              {
                name: "Civil Defense",
                status: "Alert",
                teams: 20,
                icon: Users,
                statusColor: "bg-orange-100 text-orange-700",
              },
            ].map((team, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <team.icon className="h-4 w-4 text-gray-500" />
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${team.statusColor}`}
                  >
                    {team.status}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-800">
                  {team.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {team.teams} teams ready
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-100 rounded-xl p-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Quick Actions
              </h3>
              <p className="text-xs text-gray-500">Emergency protocols</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Issue Alert
              </button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notify Teams
              </button>
              <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Deploy Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
