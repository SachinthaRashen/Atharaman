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
export const getUsers = () => api.get('/users');
// Admin Registration & Management
export const registerAdmin = (adminData) => {
  return api.post('/admin/users', adminData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateUser = (id, userData) => {
  return api.put(`/admin/users/${id}`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

// Password reset endpoints
export const sendResetLink = (emailData) => api.post('/forgot-password', emailData);
export const resetPassword = (resetData) => api.post('/reset-password', resetData);

// Locations API endpoints
export const getLocations = () => api.get('/locations');
export const getLocationById = (id) => api.get(`/locations/${id}`);
export const getLocationsByProvince = (province) => api.get(`/locations/province/${province}`);
export const createLocation = (formData) => {
  return api.post('/locations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateLocation = (id, formData) => {
  return api.put(`/locations/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteLocation = (id) => api.delete(`/locations/${id}`);

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
export const getShopsByOwner = (ownerId) => api.get(`/shop-owners/${ownerId}/shops`);
export const getShopsByLocation = (location) => api.get(`/shops/location/${location}`);
export const createShop = (formData) => {
  return api.post('/shops', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateShop = (id, formData) => {
  return api.put(`/shops/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteShop = (id) => api.delete(`/shops/${id}`);

// Hotel Owners API endpoints
export const getHotelOwners = () => api.get('/hotel-owners');
export const getHotelOwnerById = (id) => api.get(`/hotel-owners/${id}`);
export const createHotelOwner = (formData) => api.post('/hotel-owners', formData);
export const updateHotelOwner = (id, formData) => api.put(`/hotel-owners/${id}`, formData);
export const deleteHotelOwner = (id) => api.delete(`/hotel-owners/${id}`);
// Hotels API endpoints
export const getHotels = () => api.get('/hotels');
export const getHotelById = (id) => api.get(`/hotels/${id}`);
export const getHotelsByOwner = (ownerId) => api.get(`/hotel-owners/${ownerId}/hotels`);
export const getHotelsByLocation = (location) => api.get(`/hotels/location/${location}`);
export const createHotel = (formData) => {
  return api.post('/hotels', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateHotel = (id, formData) => {
  return api.put(`/hotels/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteHotel = (id) => api.delete(`/hotels/${id}`);

// Vehicle Owners API endpoints
export const getVehicleOwners = () => api.get('/vehicle-owners');
export const getVehicleOwnerById = (id) => api.get(`/vehicle-owners/${id}`);
export const getVehicleOwnersByLocation = (location) => api.get(`/vehicle-owners/location/${location}`);
export const createVehicleOwner = (formData) => api.post('/vehicle-owners', formData);
export const updateVehicleOwner = (id, formData) => api.put(`/vehicle-owners/${id}`, formData);
export const deleteVehicleOwner = (id) => api.delete(`/vehicle-owners/${id}`);
// Vehicles API endpoints
export const getVehicles = () => api.get('/vehicles');
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
export const getVehiclesByOwner = (ownerId) => api.get(`/vehicle-owners/${ownerId}/vehicles`);
export const getVehiclesByLocation = (location) => api.get(`/vehicles/location/${location}`);
export const createVehicle = (formData) => {
  return api.post('/vehicles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateVehicle = (id, formData) => {
  return api.put(`/vehicles/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

// Role request API endpoints
export const requestRole = (roleData) => api.post('/role-request', roleData);
export const getRoleRequests = () => api.get('/user/role-requests');
export const getAdminRoleRequests = () => api.get('/admin/role-requests');
export const approveRoleRequest = (id) => api.post(`/admin/role-requests/${id}/approve`);
export const rejectRoleRequest = (id) => api.post(`/admin/role-requests/${id}/reject`);

export default api;