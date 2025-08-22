import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { getUsers, getLocations } from '../../../services/api';

const GuideForm = ({ guide, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    guideName: guide?.guideName || '',
    description: guide?.description || '',
    guideNic: guide?.guideNic || '',
    businessMail: guide?.businessMail || '',
    personalNumber: guide?.personalNumber || '',
    whatsappNumber: guide?.whatsappNumber || '',
    languages: guide?.languages ? guide.languages : [],
    locations: guide?.locations ? guide.locations : [],
    user_id: guide?.user_id || ''
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(() => {
    if (!guide?.guideImage) return [];

    if (Array.isArray(guide.guideImage)) {
      return guide.guideImage.map(img => `http://localhost:8000/storage/${img}`);
    }
    return [];
  });

  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationError, setLocationError] = useState('');

  const availableLanguages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Japanese', 'Chinese'];

  useEffect(() => {
    if (!isEditing) {
      fetchUsers();
    }
    fetchLocations();
  }, [isEditing]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getUsers();

      if (Array.isArray(response.data)) {
        setAvailableUsers(response.data);
      } else {
        console.error('Unexpected API response structure:', response.data);
        setError('Unexpected data format from server');
        setAvailableUsers([]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
      setAvailableUsers([]);
    } finally {
      setLoading(false);
    }
  };

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    // Create preview URLs for new files
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    // Update both states
    setImages(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const isServerImage = imagePreviews[index].includes('storage');
    
    if (isServerImage) {
      const imagePath = imagePreviews[index].replace('http://localhost:8000/storage/', '');
      setImagesToRemove(prev => [...prev, imagePath]);
    } else {
      URL.revokeObjectURL(imagePreviews[index]);
    }
    
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('guideName', formData.guideName);
    formDataObj.append('description', formData.description);
    formDataObj.append('guideNic', formData.guideNic);
    formDataObj.append('businessMail', formData.businessMail);
    formDataObj.append('personalNumber', formData.personalNumber);
    formDataObj.append('whatsappNumber', formData.whatsappNumber);
    
    if (!isEditing) {
      formDataObj.append('user_id', formData.user_id);
    }

    formData.languages.forEach(lang => {
      formDataObj.append('languages[]', lang);
    });
    
    // Only append locations if they exist
    if (formData.locations && formData.locations.length > 0) {
      formData.locations.forEach(locationName => {
        formDataObj.append('locations[]', locationName);
      });
    }
    
    // Append each image file
    images.forEach(image => {
      formDataObj.append('guideImage[]', image);
    });

    // Append images to remove (for server images)
    imagesToRemove.forEach(imagePath => {
      formDataObj.append('remove_images[]', imagePath);
    });

    onSave(formDataObj);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guide Name *
          </label>
          <input
            type="text"
            name="guideName"
            value={formData.guideName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NIC *
          </label>
          <input
            type="text"
            name="guideNic"
            value={formData.guideNic}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          User ID {isEditing ? '(Cannot be changed)' : '*'}
        </label>
        {isEditing ? (
          <input
            type="text"
            value={formData.user_id}
            readOnly
            disabled // Add this for extra protection
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        ) : (
          // Editable dropdown for add mode
          <>
            {loading ? (
              <div className="text-gray-500 text-sm">Loading users...</div>
            ) : error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <select
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select User</option>
                {Array.isArray(availableUsers) && availableUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} (ID: {user.id})
                  </option>
                ))}
              </select>
            )}
          </>
        )}
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        
        {/* Image Previews */}
        <div className="flex flex-wrap gap-4 mb-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative h-32 w-32">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="h-full w-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'; // Fallback image
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Upload Button */}
        <div className="flex flex-col">
          <label 
            htmlFor="fileInput"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-40"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span className="text-sm">Upload Images</span>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Email *
          </label>
          <input
            type="email"
            name="businessMail"
            value={formData.businessMail}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Number *
          </label>
          <input
            type="tel"
            name="personalNumber"
            value={formData.personalNumber}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number *
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableLanguages.map(language => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.languages.includes(language) || false}
                onChange={() => handleLanguageChange(language)}
                className="mr-2"
              />
              {language}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Related Locations
        </label>
        {locationLoading ? (
          <div className="text-gray-500 text-sm">Loading locations...</div>
        ) : locationError ? (
          <div className="text-red-500 text-sm">{locationError}</div>
        ) : availableLocations.length === 0 ? (
          <div className="text-gray-500 text-sm">No locations available</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableLocations.map(location => (
              <label key={location.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.locations.includes(location.locationName) || false}
                  onChange={() => handleLocationChange(location.locationName)}
                  className="mr-2"
                />
                {location.locationName}
              </label>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default GuideForm;