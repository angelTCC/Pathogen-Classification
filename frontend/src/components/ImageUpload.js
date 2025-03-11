import React, { useState } from "react";
import { uploadImage } from "../services/api";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    const result = await uploadImage(file);
    setPrediction(result);
    setLoading(false);
  };

  return (
    <div>
      <h2>Pathogen Classification</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Predict"}
      </button>

      {prediction && (
        <div>
          <h3>Result:</h3>
          <p>Prediction: {prediction.prediction}</p>
          <p>Confidence: {Math.round(prediction.confidence * 100)}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
