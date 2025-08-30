'use client'
import { useState } from 'react'
import { Maximize2, Layers, Navigation, ZoomIn, ZoomOut } from 'lucide-react'

export default function MapVisualization({ selectedAlert }) {
  const [selectedLayer, setSelectedLayer] = useState('all')
  const [zoomLevel, setZoomLevel] = useState(10)

  const layers = [
    { id: 'all', label: 'All Layers' },
    { id: 'weather', label: 'Weather' },
    { id: 'currents', label: 'Currents' },
    { id: 'sensors', label: 'Sensors' },
    { id: 'alerts', label: 'Alert Zones' },
  ]

  return (
    <div className="widget-card h-[500px] relative overflow-hidden">
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
        <div className="bg-white rounded-lg shadow-md p-2">
          <h3 className="font-semibold text-sm px-2">Coastal Monitoring Map</h3>
        </div>
        
        <div className="flex space-x-2">
          <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Map Container (Placeholder) */}
      <div className="h-full bg-blue-50 relative">
        {/* This would be replaced with actual map implementation like Mapbox */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Map Visualization Placeholder</p>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2">
          <button
            onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 20))}
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition">
            <Navigation className="h-4 w-4" />
          </button>
        </div>

        {/* Layer Control */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white rounded-lg shadow-md p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Layers className="h-4 w-4" />
              <span className="text-sm font-medium">Layers</span>
            </div>
            <div className="space-y-1">
              {layers.map((layer) => (
                <label key={layer.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="layer"
                    value={layer.id}
                    checked={selectedLayer === layer.id}
                    onChange={(e) => setSelectedLayer(e.target.value)}
                    className="text-info"
                  />
                  <span className="text-xs">{layer.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Alert Popup */}
        {selectedAlert && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 max-w-sm">
            <h4 className="font-semibold">{selectedAlert.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{selectedAlert.location}</p>
            <p className="text-sm mt-2">{selectedAlert.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}