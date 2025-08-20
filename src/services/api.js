import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor to include auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && !config.url.includes('/login') && !config.url.includes('/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (credentials) => api.post('/login', credentials);
export const getProfile = () => api.get('/user/profile');
export const logoutUser = () => api.post('/logout');
// Password reset endpoints
export const sendResetLink = (emailData) => api.post('/forgot-password', emailData);
export const resetPassword = (resetData) => api.post('/reset-password', resetData);

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

// Shop Owners API endpoints
export const getShopOwners = () => api.get('/shop-owners');
export const getShopOwnerById = (id) => api.get(`/shop-owners/${id}`);
export const createShopOwner = (formData) => api.post('/shop-owners', formData);
export const updateShopOwner = (id, formData) => api.put(`/shop-owners/${id}`, formData);
export const deleteShopOwner = (id) => api.delete(`/shop-owners/${id}`);
// Shops API endpoints
export const getShops = () => api.get('/shops');
export const getShopById = (id) => api.get(`/shops/${id}`);
export const getShopsByOwner = (ownerId) => api.get(`/shops?shop_owner_id=${ownerId}`);
export const getShopsByLocation = (location) => api.get(`/shops/location/${location}`);
export const createShop = (formData) => {
  const postData = {
    ...formData,
    locations: Array.isArray(data.relatedLocations) 
      ? JSON.stringify(data.relatedLocations) 
      : '[]'
  };
  return api.post('/shops', postData);
};
export const updateShop = (id, formData) => {
  const putData = {
    ...formData,
    locations: JSON.stringify(data.locations || [])
  };
  return api.put(`/shops/${id}`, putData);
};
export const deleteShop = (id) => api.delete(`/shops/${id}`);

export default api;