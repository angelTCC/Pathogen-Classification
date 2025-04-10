// PredictionContext.js
import React, { createContext, useContext, useState } from 'react';

const PredictionContext = createContext();

export const usePrediction = () => useContext(PredictionContext);

export const PredictionProvider = ({ children }) => {
  const [prediction, setPrediction] = useState(null);

  return (
    <PredictionContext.Provider value={{ prediction, setPrediction }}>
      {children}
    </PredictionContext.Provider>
  );
};

// Custom hook to consume the meals data in any child component
export const usePredictionContext = () => React.useContext(PredictionContext);

// Exporting MealsProvider to be used in other parts of the app, usually at a high level in the app tree
export default PredictionProvider;
