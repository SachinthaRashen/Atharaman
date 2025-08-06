import React, { useState } from 'react';

const VehicleForm = ({ vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    vehicleType: vehicle?.vehicleType || '',
    description: vehicle?.description || '',
    passengers: vehicle?.passengers || 1,
    contactNumber: vehicle?.contactNumber || '',
    pricePerDay: vehicle?.pricePerDay || 0,
    mileagePerDay: vehicle?.mileagePerDay || 0,
    withDriver: vehicle?.withDriver || false,
    withoutDriver: vehicle?.withoutDriver || false,
    relatedLocations: vehicle?.relatedLocations || [],
    mainImage: vehicle?.mainImage || '',
    images: vehicle?.images || []
  });

  const vehicleTypes = ['Car', 'Van', 'Bus', 'Motorbike', 'Tuk-tuk', 'Jeep'];
  const availableLocations = ['Sigiriya', 'Kandy', 'Colombo', 'Galle', 'Ella', 'Anuradhapura'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type *
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Passengers *
          </label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Image URL *
        </label>
        <input
          type="url"
          name="mainImage"
          value={formData.mainImage}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Per Day (Rs.) *
          </label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mileage Per Day (km) *
          </label>
          <input
            type="number"
            name="mileagePerDay"
            value={formData.mileagePerDay}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Driver Options *
        </label>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="withDriver"
              checked={formData.withDriver}
              onChange={handleInputChange}
              className="mr-2"
            />
            With Driver
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="withoutDriver"
              checked={formData.withoutDriver}
              onChange={handleInputChange}
              className="mr-2"
            />
            Without Driver
          </label>
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

export default VehicleForm;