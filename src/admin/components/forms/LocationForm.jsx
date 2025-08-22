import React, { useState, useEffect } from 'react';
import { MapPin, X, Upload } from 'lucide-react';

const LocationForm = ({ location, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    locationName: location?.locationName || '',
    province: location?.province || '',
    shortDescription: location?.shortDescription || '',
    longDescription: location?.longDescription || '',
    latitude: location?.latitude || '',
    longitude: location?.longitude || ''
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(location?.locationImage || []);
  
  const provinces = ['Central', 'Eastern', 'North Central', 'Northern', 'North Western', 'Sabaragamuwa', 'Southern', 'Uva', 'Western'];

  useEffect(() => {
    if (location) {
      setExistingImages(location.locationImage || []);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const removeNewImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData object for file uploads
    const formDataObj = new FormData();
    formDataObj.append('locationName', formData.locationName);
    formDataObj.append('province', formData.province);
    formDataObj.append('shortDescription', formData.shortDescription);
    formDataObj.append('longDescription', formData.longDescription);
    formDataObj.append('latitude', formData.latitude);
    formDataObj.append('longitude', formData.longitude);
    
    // Append new images
    images.forEach((img) => {
      formDataObj.append('locationImage[]', img);
    });

    // If editing and some existing images were removed
    if (location && existingImages.length < location.locationImage.length) {
      formDataObj.append('remove_images', 'true');
    }

    onSave(formDataObj);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Name *
          </label>
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter location name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Province *
          </label>
          <select
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Province</option>
            {provinces.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude *
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter latitude"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude *
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter longitude"
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        
        {/* Existing Images (for edit mode) */}
        {existingImages.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {existingImages.map((img, index) => (
                <div key={`existing-${index}`} className="relative h-40 border border-gray-300 rounded-lg flex items-center justify-center">
                  <img 
                    src={`http://localhost:8000/storage/${img}`}
                    alt={`Existing ${index}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* New Image Uploads */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">New Images:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img, index) => (
              <div key={`new-${index}`} className="relative h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <img 
                  src={URL.createObjectURL(img)} 
                  alt={`New ${index}`}
                  className="h-full w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            ))}
            
            {/* Upload Button */}
            <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <label htmlFor="fileInput" className="flex flex-col items-center cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Add Images</span>
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
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description *
        </label>
        <input
          type="text"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the location"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Long Description *
        </label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleInputChange}
          required
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Detailed description of the location"
        />
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
          Save
        </button>
      </div>
    </form>
  );
};

export default LocationForm;