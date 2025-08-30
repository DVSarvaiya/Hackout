'use client'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts'

export default function DataWidget({ title, value, change, trend, type }) {
  // Sample data for chart
  const data = [
    { value: 30 },
    { value: 35 },
    { value: 32 },
    { value: 40 },
    { value: 38 },
    { value: 45 },
    { value: 42 },
  ]

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-danger" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-success" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-danger'
      case 'down':
        return 'text-success'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="widget-card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {getTrendIcon()}
      </div>

      {type === 'gauge' && (
        <div className="relative h-32">
          {/* Gauge visualization placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold">{value}</p>
              <p className={`text-sm ${getTrendColor()}`}>{change}</p>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              fill="none"
              stroke="#3182CE"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset="75"
              transform="rotate(-90 50% 50%)"
              className="transition-all duration-500"
            />
          </svg>
        </div>
      )}

      {type === 'chart' && (
        <div>
          <div className="mb-2">
            <p className="text-3xl font-bold">{value}</p>
            <p className={`text-sm ${getTrendColor()}`}>{change}</p>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3182CE"
                  strokeWidth={2}
                  dot={false}
                />
                <YAxis hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {type === 'status' && (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className={`text-sm ${getTrendColor()}`}>{change}</p>
            </div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              value === 'Good' ? 'bg-green-100' : 
              value === 'Moderate' ? 'bg-yellow-100' : 
              'bg-red-100'
            }`}>
              <div className={`w-8 h-8 rounded-full ${
                value === 'Good' ? 'bg-success' : 
                value === 'Moderate' ? 'bg-caution' : 
                'bg-danger'
              }`}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}