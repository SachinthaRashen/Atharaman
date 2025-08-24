import React, { useState, useEffect } from 'react';
import { getUsers } from '../../../services/api';

const HotelOwnerForm = ({ owner, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    hotelOwnerName: owner?.hotelOwnerName || '',
    hotelOwnerNic: owner?.hotelOwnerNic || '',
    businessMail: owner?.businessMail || '',
    contactNumber: owner?.contactNumber || '',
    user_id: owner?.user_id || ''
  });

  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEditing) {
      fetchUsers();
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
            Hotel Owner Name *
          </label>
          <input
            type="text"
            name="hotelOwnerName"
            value={formData.hotelOwnerName}
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
            name="hotelOwnerNic"
            value={formData.hotelOwnerNic}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
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
          User ID {isEditing ? '(Cannot be changed)' : '*'}
        </label>
        {isEditing ? (
          // Display-only field for edit mode
          <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
            {formData.user_id}
          </div>
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

export default HotelOwnerForm;