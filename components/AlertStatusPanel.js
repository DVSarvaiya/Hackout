'use client'
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { useState } from 'react'

export default function AlertStatusPanel({ onAlertSelect }) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Storm Surge Warning',
      location: 'Zone A - North Beach',
      time: '5 min ago',
      description: 'Expected surge of 3-4 meters',
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Tide Alert',
      location: 'Harbor District',
      time: '15 min ago',
      description: 'Tide levels rising rapidly',
      icon: AlertCircle,
    },
    {
      id: 3,
      type: 'info',
      title: 'Sensor Maintenance',
      location: 'Station B-12',
      time: '1 hour ago',
      description: 'Scheduled maintenance in progress',
      icon: Info,
    },
  ])

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const getAlertClasses = (type) => {
    switch (type) {
      case 'critical':
        return 'alert-critical border-l-4'
      case 'warning':
        return 'alert-warning border-l-4'
      case 'info':
        return 'alert-info border-l-4'
      default:
        return 'bg-gray-50 border-gray-500 text-gray-700 border-l-4'
    }
  }

  return (
    <div className="widget-card">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Active Alerts</h2>
        <span className="text-sm text-gray-600">{alerts.length} active</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${getAlertClasses(alert.type)}`}
              onClick={() => onAlertSelect(alert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-sm mt-1">{alert.location}</p>
                    <p className="text-xs mt-1 opacity-75">{alert.description}</p>
                    <p className="text-xs mt-2 opacity-60">{alert.time}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    dismissAlert(alert.id)
                  }}
                  className="p-1 hover:bg-gray-200 rounded transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Info className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No active alerts</p>
        </div>
      )}
    </div>
  )
}