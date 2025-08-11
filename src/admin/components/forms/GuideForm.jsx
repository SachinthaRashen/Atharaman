import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const GuideForm = ({ guide, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: guide?.name || '',
    description: guide?.description || '',
    nic: guide?.nic || '',
    businessEmail: guide?.businessEmail || '',
    personalNumber: guide?.personalNumber || '',
    whatsappNumber: guide?.whatsappNumber || '',
    languages: guide?.languages || [],
    userId: guide?.userId || '',
    relatedLocations: guide?.relatedLocations || [],
  });

  const [image, setImage] = useState(null);

  const availableLanguages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Japanese', 'Chinese'];
  const availableLocations = ['Sigiriya', 'Kandy', 'Colombo', 'Galle', 'Ella', 'Anuradhapura'];
  const availableUserIds = ['user001', 'user002', 'user003', 'user004', 'user005'];

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
      relatedLocations: prev.relatedLocations.includes(location)
        ? prev.relatedLocations.filter(l => l !== location)
        : [...prev.relatedLocations, location]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData object for file upload
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('nic', formData.nic);
    formDataObj.append('businessEmail', formData.businessEmail);
    formDataObj.append('personalNumber', formData.personalNumber);
    formDataObj.append('whatsappNumber', formData.whatsappNumber);
    formDataObj.append('languages', JSON.stringify(formData.languages));
    formDataObj.append('userId', formData.userId);
    formDataObj.append('relatedLocations', JSON.stringify(formData.relatedLocations));
    
    if (image) formDataObj.append('image', image);

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
            name="name"
            value={formData.name}
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
            name="nic"
            value={formData.nic}
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
        
        {/* Image Preview */}
        <div className="mb-4">
          <div className="relative h-40 w-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            {image ? (
              <>
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </>
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <Upload className="w-8 h-8 mb-1" />
                <span className="text-xs">Profile Image</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Upload Button */}
        <div className="flex flex-col">
          <label 
            htmlFor="fileInput"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-40"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span className="text-sm">Upload Image</span>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            accept="image/*"
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
            name="businessEmail"
            value={formData.businessEmail}
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
            name="userId"
            value={formData.userId}
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
                checked={formData.languages.includes(language)}
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
                checked={formData.relatedLocations.includes(location)}
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