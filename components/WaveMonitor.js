"use client";
import { useState } from "react";
import { COASTAL_POINTS } from "@/lib/coastal-points";

export default function WaveMonitor() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const checkWaveAlerts = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/check-wave-alerts", {
        method: "GET",
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to check wave alerts");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Coastal Wave Height Monitor
        </h2>
        
        <div className="mb-6">
          <button
            onClick={checkWaveAlerts}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Checking Wave Heights..." : "Check Wave Heights & Send Alerts"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-semibold">Scan Complete!</p>
              <p>Total alerts sent: {results.totalAlertsSent}</p>
              <p>Locations checked: {results.locationsChecked}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Wave Height Report:</h3>
              <div className="grid gap-3">
                {results.waveData?.map((location, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${
                      location.maxWaveHeight >= 2.5 
                        ? "bg-red-50 border-red-300" 
                        : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{location.name}</span>
                      <span className={`font-bold ${
                        location.maxWaveHeight >= 2.5 ? "text-red-600" : "text-gray-600"
                      }`}>
                        Max: {location.maxWaveHeight != null ? location.maxWaveHeight.toFixed(2) : '0.00'}m
                      </span>
                    </div>
                    {location.alertsSent > 0 && (
                      <p className="text-sm text-red-600 mt-1">
                        ⚠️ {location.alertsSent} alerts sent
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Monitored Locations:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-blue-700">
            {COASTAL_POINTS.map((point, index) => (
              <span key={index}>{point.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}