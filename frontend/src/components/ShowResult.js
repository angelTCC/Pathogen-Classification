import React from 'react';
import { usePredictionContext } from '../providers/PredictionProvider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsDisplay = () => {
  const { prediction } = usePredictionContext();

  // Assuming prediction contains two arrays: one for predictions and one for confidence values
  const { prediction: predictions, confidence: confidences } = prediction || {};

  // Prepare the data for the chart
  const data = predictions?.map((pred, index) => ({
    name: pred,
    confidence: confidences ? confidences[index] * 100 : 0, // Convert to percentage
  })) || [];

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding:'10px', border:'2px solid #ccc', borderRadius:'15px'}}>
      {predictions && confidences ? (
        <>
          <h3>Prediction Results</h3>

          {/* Responsive Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="confidence" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p>No prediction available.</p>
      )}
    </div>
  );
};

export default ResultsDisplay;
