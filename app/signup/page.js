'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lat: '',
    long: ''
  });
  const [message, setMessage] = useState('');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [tempLocation, setTempLocation] = useState({ lat: '', long: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Open modal and get location when Sign Up button clicked
  const handleOpenLocationModal = (e) => {
    e.preventDefault(); // prevent form submit
    setLocationError('');
    setTempLocation({ lat: '', long: '' });

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTempLocation({
          lat: position.coords.latitude.toString(),
          long: position.coords.longitude.toString()
        });
        setLocationModalOpen(true);
      },
      () => {
        setLocationError('Unable to retrieve your location');
      }
    );
  };

  // User confirms location in modal, then submit form
  const handleLocationConfirm = async () => {
    // Update formData with obtained location
    const updatedFormData = { ...formData, lat: tempLocation.lat, long: tempLocation.long };
    setFormData(updatedFormData);

    // Insert data into Supabase profiles table
    const { error } = await supabase
      .from('profiles')
      .insert([
        {
          name: updatedFormData.name,
          phone: updatedFormData.phone,
          email: updatedFormData.email,
          lat: parseFloat(updatedFormData.lat),
          long: parseFloat(updatedFormData.long)
        }
      ]);

    if (error) {
      setMessage('Error saving data: ' + error.message);
    } else {
      setMessage('Signup successful!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        lat: '',
        long: ''
      });
    }

    setLocationModalOpen(false);
  };

  // Cancel modal
  const handleLocationCancel = () => {
    setLocationModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow relative">
      <h1 className="text-2xl mb-4">Signup</h1>
      {locationError && <p className="text-red-600 mb-4">{locationError}</p>}
      <form onSubmit={handleOpenLocationModal} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium mb-1">Mobile Number</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Sign Up</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}

      {/* Location Confirmation Modal */}
      {locationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Your Location</h2>
            <p className="mb-4">Latitude: {tempLocation.lat}</p>
            <p className="mb-6">Longitude: {tempLocation.long}</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleLocationCancel} className="px-4 py-2 border rounded hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={handleLocationConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
