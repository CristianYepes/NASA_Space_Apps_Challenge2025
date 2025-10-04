import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const exoplanetService = {
  // Predict exoplanet from manual input
  predictSingle: async (data) => {
    try {
      const response = await api.post('/predict', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload CSV file and get batch predictions
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get model statistics and metrics
  getModelStats: async () => {
    try {
      const response = await api.get('/model-stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Retrain model with new data
  retrainModel: async (config) => {
    try {
      const response = await api.post('/retrain', config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update hyperparameters
  updateHyperparameters: async (params) => {
    try {
      const response = await api.post('/hyperparameters', params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get available datasets
  getDatasets: async () => {
    try {
      const response = await api.get('/datasets');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get prediction history
  getHistory: async () => {
    try {
      const response = await api.get('/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
