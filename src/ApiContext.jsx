// src/ApiContext.js
import React, { createContext, useContext } from "react";

const ApiContext = createContext(); // Create a context

export const useApi = () => useContext(ApiContext); // Custom hook to use API

export const ApiProvider = ({ children }) => {
  const apiUrl = 'https://ballr-mern-ashish.onrender.com/api/v1'; // Your API URL
  return (
    <ApiContext.Provider value={apiUrl}>
      {children}
    </ApiContext.Provider>
  );
};
