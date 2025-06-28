import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const apiService = {
  // Initialize canvas
  initCanvas: async (width, height) => {
    const response = await apiClient.post('/canvas/init', { width, height });
    return response.data;
  },

  // Add rectangle
  addRectangle: async ({ x, y, width, height, color }) => {
    const response = await apiClient.post('/canvas/rectangle', {
      x, y, width, height, color
    });
    return response.data;
  },

  // Add circle
  addCircle: async ({ x, y, radius, color }) => {
    const response = await apiClient.post('/canvas/circle', {
      x, y, radius, color
    });
    return response.data;
  },

  // Add text
  addText: async ({ x, y, text, font, color }) => {
    const response = await apiClient.post('/canvas/text', {
      x, y, text, font, color
    });
    return response.data;
  },

  // Add image via URL
  addImageUrl: async ({ x, y, width, height, imageUrl }) => {
    const response = await apiClient.post('/canvas/image', {
      x, y, width, height, imageUrl
    });
    return response.data;
  },

  // Add image via file upload
  addImageFile: async ({ x, y, width, height, file }) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('x', x);
    formData.append('y', y);
    formData.append('width', width);
    formData.append('height', height);

    const response = await apiClient.post('/canvas/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Export to PDF
  exportToPDF: async () => {
    const response = await apiClient.get('/export/pdf', {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Add request interceptor for error handling
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiService;