"use client";

import React, { useEffect, useState } from 'react';

// The main App component that handles the UI and API call logic.
const App = () => {
  // State variables for storing the prediction, loading state, and any errors.
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the API call. It's defined here so it can be called from multiple places.
  const fetchPrediction = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    // The sample data must match the shape the server-side API is expecting:
    // a list of 72 floating-point numbers (1x24x3).
    const sampleData = Array(24 * 3).fill(0.5); 

    try {
      // Make a POST request to the /api/weather endpoint.
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The body must be a JSON string containing the 'data' key.
        body: JSON.stringify({ data: sampleData }),
      });
      
      // Check if the response was successful.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server returned an error: ${errorData.error || response.statusText}`);
      }

      // Parse the JSON response.
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error("Failed to fetch prediction:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Use a useEffect hook with an empty dependency array to fetch data on initial component load.
  useEffect(() => {
    fetchPrediction();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-teal-400">Weather Prediction</h1>
        <p className="text-gray-400 text-center mb-6">
          Click the button below to run the ONNX model and get a sample weather prediction.
        </p>
        
        <button
          onClick={fetchPrediction}
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>

        {/* Conditional rendering based on state */}
        {loading && (
          <div className="mt-6 text-center text-teal-400">
            Fetching data from the model...
          </div>
        )}

        {error && (
          <div className="mt-6 text-center text-red-500">
            Error: {error}
          </div>
        )}

        {prediction && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Prediction Results:</h2>
            <div className="bg-gray-700 p-4 rounded-xl text-sm break-all">
              <pre className="whitespace-pre-wrap">{JSON.stringify(prediction, null, 2)}</pre>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Note: This is a sample prediction from the dummy input data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
