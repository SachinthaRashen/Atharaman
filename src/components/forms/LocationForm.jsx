import React, { useState } from 'react';
import { MapPin, X, Upload } from 'lucide-react';

const LocationForm = ({ location, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: location?.name || '',
    province: location?.province || '',
    shortDescription: location?.shortDescription || '',
    longDescription: location?.longDescription || '',
    coordinates: location?.coordinates || { lat: 0, lng: 0 }
  });

  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([null, null, null, null]);
  
  const provinces = ['Central', 'Eastern', 'North Central', 'Northern', 'North Western', 'Sabaragamuwa', 'Southern', 'Uva', 'Western'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoordinateChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (index === -1) {
      setMainImage(file);
    } else {
      const updatedImages = [...extraImages];
      updatedImages[index] = file;
      setExtraImages(updatedImages);
    }
  };

  const removeImage = (index) => {
    if (index === -1) {
      setMainImage(null);
    } else {
      const updatedImages = [...extraImages];
      updatedImages[index] = null;
      setExtraImages(updatedImages);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare images array (filter out null values)
    const images = extraImages.filter(img => img !== null);
    
    // Create FormData object for file uploads
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('province', formData.province);
    formDataObj.append('shortDescription', formData.shortDescription);
    formDataObj.append('longDescription', formData.longDescription);
    formDataObj.append('coordinates', JSON.stringify(formData.coordinates));
    
    if (mainImage) formDataObj.append('mainImage', mainImage);
    images.forEach((img, index) => {
      formDataObj.append(`images`, img);
    });

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
            name="name"
            value={formData.name}
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

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        
        {/* Image Previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {[mainImage, ...extraImages].map((img, index) => (
            <div key={index} className="relative h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              {img ? (
                <>
                  <img 
                    src={URL.createObjectURL(img)} 
                    alt={`Preview ${index === 0 ? 'Main' : index}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index === 0 ? -1 : index - 1)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-700" />
                  </button>
                </>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Upload className="w-8 h-8 mb-1" />
                  <span className="text-xs">{index === 0 ? 'Main' : `Extra ${index}`}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Upload Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {['Main Image', 'Image 2', 'Image 3', 'Image 4', 'Image 5'].map((label, index) => (
            <div key={index} className="flex flex-col">
              <label 
                htmlFor={`fileInput-${index}`}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                <span className="text-sm">{label}</span>
              </label>
              <input
                type="file"
                id={`fileInput-${index}`}
                onChange={(e) => handleImageChange(index === 0 ? -1 : index - 1, e)}
                accept="image/*"
                className="hidden"
              />
            </div>
          ))}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="inline w-4 h-4 mr-1" />
          Location Coordinates
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={formData.coordinates.lat}
              onChange={(e) => handleCoordinateChange('lat', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="7.8731"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={formData.coordinates.lng}
              onChange={(e) => handleCoordinateChange('lng', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="80.7718"
            />
          </div>
        </div>
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