'use client'

export default function TeamPage() {
  const teamPartners = [
    {
      id: 1,
      name: "Ocean Guardians",
      type: "Environmental NGO",
      status: "active",
      description: "Protecting marine biodiversity.",
    },
    {
      id: 2,
      name: "Coastal City Government",
      type: "Government",
      status: "active",
      description: "Managing coastal city infrastructure and policies.",
    },
    {
      id: 3,
      name: "Disaster Response Unit",
      type: "Disaster Management Agency",
      status: "inactive",
      description: "Responding to emergencies and natural disasters.",
    },
    {
      id: 4,
      name: "Green Earth Foundation",
      type: "Environmental NGO",
      status: "inactive",
      description: "Environmental advocacy and education.",
    },
    {
      id: 5,
      name: "Blue Horizon Alliance",
      type: "Environmental NGO",
      status: "active",
      description: "Collaborating for ocean conservation.",
    },
    {
      id: 6,
      name: "National Coastal Agency",
      type: "Government",
      status: "active",
      description: "Overseeing coastal zone management nationwide.",
    },
    {
      id: 7,
      name: "Rapid Response Team",
      type: "Disaster Management Agency",
      status: "active",
      description: "Swift disaster relief and coordination.",
    },
    {
      id: 8,
      name: "EcoWatchers",
      type: "Environmental NGO",
      status: "inactive",
      description: "Monitoring environmental changes and reporting.",
    },
    {
      id: 9,
      name: "City Harbor Authority",
      type: "Government",
      status: "active",
      description: "Managing harbor operations and safety.",
    },
    {
      id: 10,
      name: "Climate Action Network",
      type: "Environmental NGO",
      status: "active",
      description: "Driving climate change mitigation efforts.",
    },
    {
      id: 11,
      name: "Harbor Safety Commission",
      type: "Government",
      status: "inactive",
      description: "Ensuring safety protocols at the harbor.",
    },
    {
      id: 12,
      name: "Coastal Watchers",
      type: "Environmental NGO",
      status: "active",
      description: "Community based coastal protection initiatives.",
    }
  ]

  return (
    <main className="p-8 max-w-6xl mx-auto min-h-screen bg-white">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Teams and Partners
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamPartners.map((partner) => {
          const isActive = partner.status === 'active'
          return (
            <div
              key={partner.id}
              className={`relative rounded-xl p-6 shadow-md bg-white transition-transform transform hover:scale-105 cursor-pointer border border-gray-200`}
            >
              {/* Status Badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4
                  ${isActive ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}
                `}
              >
                {partner.status}
              </div>

              {/* Partner Name */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{partner.name}</h2>

              {/* Type Badge */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium tracking-wide mb-4
                  ${
                    partner.type.toLowerCase().includes('ngo')
                      ? 'bg-purple-200 text-purple-800'
                      : partner.type.toLowerCase().includes('government')
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }
                `}
              >
                {partner.type}
              </span>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{partner.description}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}
