import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

// Request interceptor
{/*api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});*/}

// Response interceptor
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
export const createGuide = (formData) => {
  return api.post('/guides', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateGuide = (id, formData) => {
  return api.put(`/guides/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteGuide = (id) => api.delete(`/guides/${id}`);

export default api;