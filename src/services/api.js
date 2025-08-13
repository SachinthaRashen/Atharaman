import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Guides API endpoints
export const getGuides = () => api.get('/guides');
export const getGuideById = (id) => api.get(`/guides/${id}`);
export const getGuidesByLocation = (location) => api.get(`/guides/location/${location}`);
export const createGuide = (formData) => api.post('/guides', formData);
export const updateGuide = (id, formData) => api.post(`/guides/${id}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteGuide = (id) => api.delete(`/guides/${id}`);

export default api;