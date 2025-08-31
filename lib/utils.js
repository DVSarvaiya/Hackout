// Calculate distance between two points using Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
    // Validate inputs
    if (!lat1 || !lon1 || !lat2 || !lon2) {
        console.error('Invalid coordinates provided:', { lat1, lon1, lat2, lon2 });
        return Infinity; // Return large distance if invalid
    }
    
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    // Log calculation for debugging
    console.log(`Distance calculated: ${distance.toFixed(2)}km from (${lat1}, ${lon1}) to (${lat2}, ${lon2})`);
    
    return distance;
}

// Get current date and next day in required format
export function getDateRange() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return {
      start_date: today.toISOString().split('T')[0],
      end_date: tomorrow.toISOString().split('T')[0]
    };
}