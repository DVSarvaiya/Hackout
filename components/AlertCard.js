'use client'
import { Clock, MapPin, Share2, Eye } from 'lucide-react'

export default function AlertCard({ alert, onAcknowledge, onShare, onViewDetails }) {
  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-danger bg-red-50'
      case 'medium':
        return 'border-warning bg-orange-50'
      case 'low':
        return 'border-info bg-blue-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger text-black'
      case 'medium':
        return 'bg-warning text-black'
      case 'low':
        return 'bg-info text-black'
      default:
        return 'bg-gray-500 text-black'
    }
  }

  return (
    <div className={`rounded-lg border-2 p-4 transition-all hover:shadow-lg ${getPriorityClasses(alert.priority)}`}>
      <div className="flex justify-between items-start mb-3 ">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityBadge(alert.priority)}`}>
            {alert.priority.toUpperCase()} PRIORITY
          </span>
          <span className="text-sm text-gray-600">{alert.type}</span>
        </div>
        <span className="text-xs text-gray-500">{alert.id}</span>
      </div>

      <h3 className="font-bold text-lg mb-2">{alert.title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {alert.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          {alert.timestamp} • Est. duration: {alert.duration}
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">{alert.description}</p>

      <div className="flex space-x-2">
        <button
          onClick={() => onAcknowledge(alert.id)}
          className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
        >
          Acknowledge
        </button>
        <button
          onClick={() => onShare(alert.id)}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onViewDetails(alert.id)}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}