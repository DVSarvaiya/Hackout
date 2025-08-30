'use client'
import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, Calendar, RefreshCw, Maximize2 } from 'lucide-react'

export default function DataAnalysisPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [dataType, setDataType] = useState('tide')

  // Sample data
  const tideData = [
    { time: '00:00', level: 2.1 },
    { time: '04:00', level: 2.8 },
    { time: '08:00', level: 3.2 },
    { time: '12:00', level: 2.5 },
    { time: '16:00', level: 2.9 },
    { time: '20:00', level: 3.5 },
    { time: '24:00', level: 2.3 },
  ]

  const windData = [
    { day: 'Mon', speed: 35, direction: 'NE' },
    { day: 'Tue', speed: 42, direction: 'E' },
    { day: 'Wed', speed: 38, direction: 'SE' },
    { day: 'Thu', speed: 45, direction: 'S' },
    { day: 'Fri', speed: 50, direction: 'SW' },
    { day: 'Sat', speed: 48, direction: 'W' },
    { day: 'Sun', speed: 40, direction: 'NW' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900">Data Analysis</h1>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {timeRange === '24h' ? 'Last 24 Hours' : 
             timeRange === '7d' ? 'Last 7 Days' : 
             timeRange === '30d' ? 'Last 30 Days' : 'Custom'}
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="px-4 py-2 bg-info text-white rounded-lg hover:bg-blue-700 transition flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Data Type Selector */}
      <div className="widget-card">
        <div className="flex flex-wrap gap-2">
          {['tide', 'wind', 'temperature', 'quality', 'current'].map((type) => (
            <button
              key={type}
              onClick={() => setDataType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                dataType === type
                  ? 'bg-info text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Data
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tide Level Chart */}
        <div className="widget-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Tide Levels</h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tideData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#3182CE" 
                  strokeWidth={2}
                  name="Tide Level (m)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind Speed Chart */}
        <div className="widget-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Wind Speed Analysis</h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={windData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="speed" 
                  fill="#FF8C00" 
                  name="Wind Speed (km/h)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="widget-card text-center">
          <h4 className="text-sm text-gray-600 mb-2">Average Tide Level</h4>
          <p className="text-2xl font-bold text-info">2.8m</p>
          <p className="text-xs text-gray-500 mt-1">↑ 0.3m from last week</p>
        </div>
        <div className="widget-card text-center">
          <h4 className="text-sm text-gray-600 mb-2">Max Wind Speed</h4>
          <p className="text-2xl font-bold text-warning">52 km/h</p>
          <p className="text-xs text-gray-500 mt-1">Recorded Tuesday</p>
        </div>
        <div className="widget-card text-center">
          <h4 className="text-sm text-gray-600 mb-2">Water Temperature</h4>
          <p className="text-2xl font-bold text-success">18°C</p>
          <p className="text-xs text-gray-500 mt-1">Within normal range</p>
        </div>
        <div className="widget-card text-center">
          <h4 className="text-sm text-gray-600 mb-2">Alert Frequency</h4>
          <p className="text-2xl font-bold text-danger">12</p>
          <p className="text-xs text-gray-500 mt-1">This week</p>
        </div>
      </div>

      {/* Predictive Analytics Section */}
      <div className="widget-card">
        <h3 className="text-lg font-semibold mb-4">Predictive Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900">Storm Probability</h4>
            <p className="text-2xl font-bold text-blue-700 mt-2">32%</p>
            <p className="text-sm text-blue-600 mt-1">Next 48 hours</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-medium text-orange-900">Tide Risk Level</h4>
            <p className="text-2xl font-bold text-orange-700 mt-2">Moderate</p>
            <p className="text-sm text-orange-600 mt-1">Rising trend detected</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900">System Confidence</h4>
            <p className="text-2xl font-bold text-green-700 mt-2">94%</p>
            <p className="text-sm text-green-600 mt-1">Based on 142 sensors</p>
          </div>
        </div>
      </div>
    </div>
  )
}