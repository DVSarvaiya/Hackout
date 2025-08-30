'use client'
import { useState } from 'react'
import { FileText, Download, Eye, Calendar, Filter, Plus } from 'lucide-react'

export default function ReportsPage() {
  const [reports] = useState([
    {
      id: 1,
      title: 'Weekly Coastal Summary Report',
      type: 'Summary',
      date: '2024-01-15',
      status: 'completed',
      size: '2.4 MB',
    },
    {
      id: 2,
      title: 'Storm Impact Analysis - January 2024',
      type: 'Analysis',
      date: '2024-01-14',
      status: 'completed',
      size: '5.1 MB',
    },
    {
      id: 3,
      title: 'Sensor Network Performance Q1',
      type: 'Technical',
      date: '2024-01-10',
      status: 'processing',
      size: 'Generating...',
    },
    {
      id: 4,
      title: 'Emergency Response Times Report',
      type: 'Performance',
      date: '2024-01-08',
      status: 'completed',
      size: '1.8 MB',
    },
  ])

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
    } else if (status === 'processing') {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Processing</span>
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Documentation</h1>
        <button className="mt-4 sm:mt-0 px-4 py-2 bg-info text-white rounded-lg hover:bg-blue-700 transition flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Filters Bar */}
      <div className="widget-card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <span className="font-medium">Filter by:</span>
          </div>
          
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-info">
            <option>All Types</option>
            <option>Summary</option>
            <option>Analysis</option>
            <option>Technical</option>
            <option>Performance</option>
          </select>

          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-info"
            />
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="widget-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Report Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">{report.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{report.type}</td>
                  <td className="py-3 px-4 text-gray-600">{report.date}</td>
                  <td className="py-3 px-4">{getStatusBadge(report.status)}</td>
                  <td className="py-3 px-4 text-gray-600">{report.size}</td>
                  <td className="py-3 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-600 hover:text-info transition"
                        disabled={report.status === 'processing'}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-success transition"
                        disabled={report.status === 'processing'}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Templates */}
      <div className="widget-card">
        <h3 className="text-lg font-semibold mb-4">Quick Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-info hover:bg-blue-50 transition text-left">
            <h4 className="font-medium mb-1">Daily Summary</h4>
            <p className="text-sm text-gray-600">Generate daily coastal conditions report</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-info hover:bg-blue-50 transition text-left">
            <h4 className="font-medium mb-1">Alert Analysis</h4>
            <p className="text-sm text-gray-600">Analyze alert patterns and responses</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-info hover:bg-blue-50 transition text-left">
            <h4 className="font-medium mb-1">Compliance Report</h4>
            <p className="text-sm text-gray-600">Environmental compliance documentation</p>
          </button>
        </div>
      </div>
    </div>
  )
}