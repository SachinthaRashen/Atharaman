import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { getLocations } from '../../../services/api';

const HotelForm = ({ hotel, onSave, onCancel, selectedOwner }) => {
  const [formData, setFormData] = useState({
    hotelName: hotel?.hotelName || '',
    hotelAddress: hotel?.hotelAddress || '',
    businessMail: hotel?.businessMail || '',
    contactNumber: hotel?.contactNumber || '',
    whatsappNumber: hotel?.whatsappNumber || '',
    description: hotel?.description || '',
    locations: hotel?.locations ? hotel.locations : [],
    user_id: hotel?.user_id || selectedOwner?.user_id || '',
    hotel_owner_id: hotel?.hotel_owner_id || selectedOwner?.id || '',
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(() => {
    if (!hotel?.hotelImage) return [];

    // If it's already an array (from backend casting)
    if (Array.isArray(hotel.hotelImage)) {
      return hotel.hotelImage.map(img => `http://localhost:8000/storage/${img}`);
    }
    return [];
  });

  const [availableLocations, setAvailableLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Fetch locations from API
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      const response = await getLocations();
      // Extract location names from the response
      const locationNames = response.data.map(location => location.name || location.locationName);
      setAvailableLocations(locationNames);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    // Filter only valid image files
    const validImageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)
    );
    
    const newImages = [...images, ...validImageFiles];
    setImages(newImages);
    
    // Create preview URLs only for valid images
    const newPreviews = validImageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    // Revoke the object URL to prevent memory leaks
    if (newPreviews[index].startsWith('blob:')) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('hotelName', formData.hotelName);
    formDataObj.append('hotelAddress', formData.hotelAddress);
    formDataObj.append('businessMail', formData.businessMail);
    formDataObj.append('contactNumber', formData.contactNumber);
    formDataObj.append('whatsappNumber', formData.whatsappNumber);
    formDataObj.append('description', formData.description);
    formDataObj.append('user_id', formData.user_id);
    formDataObj.append('hotel_owner_id', formData.hotel_owner_id);
    
    // Only append locations if they exist
    if (formData.locations && formData.locations.length > 0) {
      formData.locations.forEach(loc => {
        formDataObj.append('locations[]', loc);
      });
    }

    // Only append images if they exist and are valid
    if (images.length > 0) {
      images.forEach(image => {
        if (image instanceof File && image.type.startsWith('image/')) {
          formDataObj.append('hotelImage[]', image);
        }
      });
    } else if (hotel && imagePreviews.some(p => p.includes('storage'))) {
      // For editing: if no new images but existing ones, tell backend to keep them
      formDataObj.append('keepExistingImages', 'true');
    }
    
    onSave(formDataObj);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hotel Name *
        </label>
        <input
          type="text"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hotel Images
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <input
          type="text"
          name="hotelAddress"
          value={formData.hotelAddress}
          onChange={handleInputChange}
          required
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
            Contact Number *
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
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
          Related Locations
        </label>
        {loadingLocations ? (
          <div className="text-gray-500">Loading locations...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableLocations.map(location => (
              <label key={location} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.locations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="mr-2"
                />
                {location}
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
          Save
        </button>
      </div>
    </form>
  );
};

export default HotelForm;