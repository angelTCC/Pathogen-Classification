import React, { useState } from "react";
import { ModelPrediction } from "../services/api";
import { usePredictionContext } from "../providers/PredictionProvider";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  /*const [prediction, setPrediction] = useState(null);*/
  const { setPrediction } = usePredictionContext();
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
    const result = await ModelPrediction(file);
    console.log("Raw response:", result);

    setPrediction(result);
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding:'10px', border:'2px solid #ccc', borderRadius:'15px'}}>
      <h2>Load img</h2>
        {/* Image Preview */}
        {file && (
          <div style={{ marginBottom: "5px", justifyContent: 'center', display: 'flex'}}>
            <img
              src={URL.createObjectURL(file)}
              alt="Selected"
              style={{ maxWidth: "50%", border: "1px solid #ccc", padding: "10px"}}
            />
          </div>
        )}

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Predict"}
      </button>
    </div>
  );
};

export default ImageUpload;
