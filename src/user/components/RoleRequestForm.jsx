import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, FileText, MapPin, Languages, Image, MessageCircle, Check } from 'lucide-react';
import { getLocations } from '../../services/api';

const RoleRequestForm = ({ role, userData, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    // Common fields
    name: userData.name,
    email: userData.email,
    // Role-specific fields with defaults
    nic: '',
    contactNumber: '',
    personalNumber: '',
    whatsappNumber: '',
    description: '',
    languages: ['English'],
    locations: [],
    guideImage: null
  });

  const [availableLocations, setAvailableLocations] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const availableLanguages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Japanese', 'Chinese'];

  useEffect(() => {
    if (role === 'guide' || role === 'vehicle_owner') {
      fetchLocations();
    }
  }, [role]);

  const fetchLocations = async () => {
    setLocationLoading(true);
    setLocationError('');
    try {
      const response = await getLocations();
      
      if (Array.isArray(response.data)) {
        setAvailableLocations(response.data);
      } else {
        console.error('Unexpected API response structure for locations:', response.data);
        setLocationError('Unexpected data format from server');
        setAvailableLocations([]);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
      setLocationError('Failed to load locations. Please try again.');
      setAvailableLocations([]);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleLocationChange = (locationName) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(locationName)
        ? prev.locations.filter(l => l !== locationName)
        : [...prev.locations, locationName]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Languages Checkbox Component
  const LanguagesCheckbox = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Languages *</label>
      <div className="grid grid-cols-2 gap-2">
        {availableLanguages.map(language => (
          <label key={language} className="flex items-center">
            <input
              type="checkbox"
              checked={formData.languages.includes(language)}
              onChange={() => handleLanguageChange(language)}
              className="mr-2"
            />
            {language}
          </label>
        ))}
      </div>
    </div>
  );

  // Locations Checkbox Component
  const LocationsCheckbox = () => {
    if (locationLoading) {
      return <div className="text-gray-500 text-sm">Loading locations...</div>;
    }
    
    if (locationError) {
      return <div className="text-red-500 text-sm">{locationError}</div>;
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Locations *</label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
          {availableLocations.map(location => (
            <label key={location.id} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.locations.includes(location.locationName)}
                onChange={() => handleLocationChange(location.locationName)}
                className="mr-2"
              />
              {location.locationName}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderGuideForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Guide Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFormData(prev => ({ ...prev, guideImage: file.name }));
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Upload your profile picture</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number *</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="199012345678V"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Personal Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="+94771234567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
        <input
          type="tel"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="+94771234567"
        />
      </div>

      <LanguagesCheckbox />
      <LocationsCheckbox />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Describe your experience and expertise as a guide..."
        />
      </div>
    </>
  );

  const renderBusinessOwnerForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number *</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="199012345678V"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="+94771234567"
          />
        </div>
      </div>
    </>
  );

  const renderVehicleOwnerForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number *</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="199012345678V"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Personal Number *</label>
          <input
            type="tel"
            name="personalNumber"
            value={formData.personalNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="+94771234567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <MessageCircle className="inline w-4 h-4 mr-1" />
          WhatsApp Number *
        </label>
        <input
          type="tel"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="+94771234567"
        />
        <p className="text-xs text-gray-500 mt-1">For business communications</p>
      </div>

      <LocationsCheckbox />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FileText className="inline w-4 h-4 mr-1" />
          Business Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Describe your vehicle rental services, types of vehicles available, and your experience..."
        />
        <p className="text-xs text-gray-500 mt-1">Tell us about your vehicle rental business</p>
      </div>
    </>
  );

  const getRoleTitle = () => {
    switch (role) {
      case 'guide': return 'Guide Registration';
      case 'hotel_owner': return 'Hotel Owner Registration';
      case 'shop_owner': return 'Shop Owner Registration';
      case 'vehicle_owner': return 'Vehicle Owner Registration';
      default: return 'Role Registration';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{getRoleTitle()}</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {role === 'guide' && renderGuideForm()}
          {(role === 'hotel_owner' || role === 'shop_owner') && renderBusinessOwnerForm()}
          {role === 'vehicle_owner' && renderVehicleOwnerForm()}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleRequestForm;