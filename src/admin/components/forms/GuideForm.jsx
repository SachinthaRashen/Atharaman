import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const GuideForm = ({ guide, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    guideName: guide?.guideName || '',
    description: guide?.description || '',
    guideNic: guide?.guideNic || '',
    businessMail: guide?.businessMail || '',
    personalNumber: guide?.personalNumber || '',
    whatsappNumber: guide?.whatsappNumber || '',
    languages: guide?.languages ? JSON.parse(guide.languages) : [],
    locations: guide?.locations ? JSON.parse(guide.locations) : [],
    user_id: guide?.user_id || '',
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(() => {
    if (!guide?.guideImage) return [];
    
    try {
      const parsedImages = JSON.parse(guide.guideImage);
      return Array.isArray(parsedImages) 
        ? parsedImages.map(img => `http://localhost:8000/storage/${img}`)
        : [];
    } catch {
      return [];
    }
  });

  const availableLanguages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Japanese', 'Chinese'];
  const availableLocations = ['Sigiriya', 'Kandy', 'Colombo', 'Galle', 'Ella', 'Anuradhapura'];
  const availableUserIds = [1];

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
    
    const newImages = [...images, ...files];
    setImages(newImages);
    
    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    if (imagePreviews[index].includes('storage')) {
      // This is an existing image from server
      // We'll tell backend to remove it by not sending keep_image
      setKeepExistingImage(false);
    }
    setImages([]);
    setImagePreviews([]);
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
    formDataObj.append('user_id', formData.user_id);
    
    // Append arrays directly (not stringified)
    formData.languages.forEach(lang => {
      formDataObj.append('languages[]', lang);
    });
    
    formData.locations.forEach(loc => {
      formDataObj.append('locations[]', loc);
    });
    
    // Append each image file
    images.forEach(image => {
      formDataObj.append('guideImage[]', image);
    });

    // If editing and no new images selected, ensure existing images are preserved
    if (guide && images.length === 0 && imagePreviews.some(p => p.includes('storage'))) {
      formDataObj.append('keepExistingImages', 'true');
    }

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User ID *
          </label>
          <select
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select User ID</option>
            {availableUserIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
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
            required
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableLocations.map(location => (
            <label key={location} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.locations.includes(location) || false}
                onChange={() => handleLocationChange(location)}
                className="mr-2"
              />
              {location}
            </label>
          ))}
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

export default GuideForm;