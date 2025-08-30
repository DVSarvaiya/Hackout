'use client'
import { useState } from 'react'
import AlertCard from '@/components/AlertCard'
import { Filter, Download, Bell } from 'lucide-react'

export default function AlertsPage() {
  const [alerts] = useState([
    {
      id: 'ALT-001',
      priority: 'high',
      type: 'Storm Surge',
      title: 'Severe Storm Surge Warning',
      location: 'North Coastal Zone A',
      timestamp: '14:23',
      duration: '6 hours',
      description: 'A severe storm surge is expected to impact the northern coastal areas. Expected surge height of 3-4 meters above normal tide levels.',
    },
    {
      id: 'ALT-002',
      priority: 'medium',
      type: 'Pollution',
      title: 'Algal Bloom Detection',
      location: 'Harbor Bay Area',
      timestamp: '13:45',
      duration: '48 hours',
      description: 'Significant algal bloom detected in the harbor area. Water quality index has dropped below safe levels for marine life.',
    },
    {
      id: 'ALT-003',
      priority: 'low',
      type: 'Equipment',
      title: 'Sensor Maintenance Required',
      location: 'Station B-12',
      timestamp: '12:30',
      duration: '2 hours',
      description: 'Routine maintenance required for tide monitoring sensor. Temporary data gaps expected.',
    },
  ])

  const [filterPriority, setFilterPriority] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const handleAcknowledge = (alertId) => {
    console.log('Acknowledged alert:', alertId)
  }

  const handleShare = (alertId) => {
    console.log('Sharing alert:', alertId)
  }

  const handleViewDetails = (alertId) => {
    console.log('Viewing details for alert:', alertId)
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filterPriority !== 'all' && alert.priority !== filterPriority) return false
    if (filterType !== 'all' && alert.type !== filterType) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900">Alert Management Center</h1>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <button className="px-4 py-2 bg-info text-white rounded-lg hover:bg-blue-700 transition flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Subscribe
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="widget-card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-info"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-info"
          >
            <option value="all">All Types</option>
            <option value="Storm Surge">Storm Surge</option>
            <option value="Pollution">Pollution</option>
            <option value="Equipment">Equipment</option>
          </select>

          <div className="ml-auto text-sm text-gray-600">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onAcknowledge={handleAcknowledge}
            onShare={handleShare}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="widget-card text-center py-12">
          <p className="text-gray-500">No alerts match your filter criteria</p>
        </div>
      )}
    </div>
  )
}