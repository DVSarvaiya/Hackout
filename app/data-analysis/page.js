'use client'
import { useState, useEffect } from 'react'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { Download, Calendar, RefreshCw, Maximize2 } from 'lucide-react'

export default function DataAnalysisPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [tideData, setTideData] = useState([])
  const [windData, setWindData] = useState([])
  const [tempData, setTempData] = useState([])

  const getDateRange = () => {
    const end = new Date()
    let start = new Date()
    if (timeRange === '24h') start.setDate(end.getDate() - 1)
    else if (timeRange === '7d') start.setDate(end.getDate() - 7)
    else if (timeRange === '30d') start.setDate(end.getDate() - 30)
    return {
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0]
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { start_date, end_date } = getDateRange()
      try {
        const tideRes = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=20&longitude=70&hourly=wave_height&start_date=${start_date}&end_date=${end_date}`
        )
        const tideJson = await tideRes.json()
        const tideHourly = tideJson.hourly?.time
          ? tideJson.hourly.time.map((time, idx) => ({
              time: new Date(time).toLocaleString('en-US', { hour: 'numeric', hour12: true }),
              level: tideJson.hourly.wave_height[idx]
            }))
          : []
        setTideData(tideHourly)

        const windRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=22.3&longitude=70.8&hourly=windspeed_10m,winddirection_10m&start_date=${start_date}&end_date=${end_date}`
        )
        const windJson = await windRes.json()
        const windHourly = windJson.hourly?.time
          ? windJson.hourly.time.map((time, idx) => ({
              day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
              speed: windJson.hourly.windspeed_10m[idx],
              direction: windJson.hourly.winddirection_10m[idx]
            }))
          : []
        setWindData(windHourly)

        const tempRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=22.3&longitude=70.8&hourly=temperature_2m&start_date=${start_date}&end_date=${end_date}`
        )
        const tempJson = await tempRes.json()
        const tempHourly = tempJson.hourly?.time
          ? tempJson.hourly.time.map((time, idx) => ({
              time: new Date(time).toLocaleString('en-US', { hour: 'numeric', hour12: true }),
              temp: tempJson.hourly.temperature_2m[idx]
            }))
          : []
        setTempData(tempHourly)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [timeRange])

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
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="px-4 py-2 bg-info text-white rounded-lg bg-blue-700 transition flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Chart Blocks */}
      <div className="flex flex-col gap-10">
        {/* Tide Levels */}
        <div className="widget-card w-[60rem] h-[35rem] mx-auto">
          <div className="bg-blue-100 px-4 py-2 rounded-t-md flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-800">Tide Data</h3>
          </div>
          <div className="h-[30rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tideData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="level" stroke="#3182CE" strokeWidth={2} name="Tide Level (m)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind */}
        <div className="widget-card w-[60rem] h-[35rem] mx-auto">
          <div className="bg-cyan-100 px-4 py-2 rounded-t-md flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-cyan-800">Wind Data</h3>
          </div>
          <div className="h-[30rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={windData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="speed" fill="#00B4D8" name="Wind Speed (km/h)" barSize={30} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature */}
        <div className="widget-card w-[60rem] h-[35rem] mx-auto">
          <div className="bg-orange-100 px-4 py-2 rounded-t-md flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-orange-800">Temperature Data</h3>
          </div>
          <div className="h-[30rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#FF4500" strokeWidth={2} name="Temperature (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
