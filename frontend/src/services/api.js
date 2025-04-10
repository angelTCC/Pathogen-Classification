const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const ModelPrediction = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to fetch");

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to process image" };
  }
};
