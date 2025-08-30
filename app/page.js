'use client'
import { useState } from 'react'
import AlertStatusPanel from '@/components/AlertStatusPanel'
import MapVisualization from '@/components/MapVisualization'
import DataWidget from '@/components/DataWidget'

export default function Dashboard() {
  const [selectedAlert, setSelectedAlert] = useState(null)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <span className="text-sm text-gray-600">Last updated: 2 min ago</span>
          <button className="px-4 py-2 bg-info text-white rounded-lg hover:bg-blue-700 transition">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Alert Status Panel */}
      <AlertStatusPanel onAlertSelect={setSelectedAlert} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Visualization - Takes 2 columns */}
        <div className="xl:col-span-2">
          <MapVisualization selectedAlert={selectedAlert} />
        </div>

        {/* Data Widgets - Right Column */}
        <div className="space-y-6">
          <DataWidget
            title="Tide Level"
            value="2.4m"
            change="+0.3m"
            trend="up"
            type="gauge"
          />
          <DataWidget
            title="Wind Speed"
            value="45 km/h"
            change="+12 km/h"
            trend="up"
            type="chart"
          />
          <DataWidget
            title="Water Quality"
            value="Good"
            change="Stable"
            trend="stable"
            type="status"
          />
        </div>
      </div>

      {/* Additional Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="widget-card">
          <h3 className="text-lg font-semibold mb-2">Active Sensors</h3>
          <p className="text-3xl font-bold text-success">142/150</p>
          <p className="text-sm text-gray-600">94.7% operational</p>
        </div>
        <div className="widget-card">
          <h3 className="text-lg font-semibold mb-2">Alert Response Time</h3>
          <p className="text-3xl font-bold text-info">3.2 min</p>
          <p className="text-sm text-gray-600">Average today</p>
        </div>
        <div className="widget-card">
          <h3 className="text-lg font-semibold mb-2">Risk Level</h3>
          <p className="text-3xl font-bold text-warning">Moderate</p>
          <p className="text-sm text-gray-600">Storm approaching</p>
        </div>
        <div className="widget-card">
          <h3 className="text-lg font-semibold mb-2">Community Alerts</h3>
          <p className="text-3xl font-bold">1,247</p>
          <p className="text-sm text-gray-600">Sent today</p>
        </div>
      </div>
    </div>
  )
}