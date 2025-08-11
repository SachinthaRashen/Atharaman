import React, { useState } from 'react';
import { Building, ChevronDown, ChevronUp, Plus, Edit3, Trash2, MapPin, Star } from 'lucide-react';

const HotelOwnerProfile = ({ isExpanded, onToggleExpand, userId }) => {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Mountain View Lodge",
      location: "Yosemite National Park",
      description: "Cozy lodge with stunning mountain views and modern amenities",
      images: ["https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"],
      rating: 4.8,
      pricePerNight: 180
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    pricePerNight: 0
  });

  const handleAddHotel = () => {
    if (formData.name && formData.location) {
      const newHotel = {
        id: Date.now(),
        ...formData,
        images: ["https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"],
        rating: 0
      };
      setHotels([...hotels, newHotel]);
      setFormData({ name: '', location: '', description: '', pricePerNight: 0 });
      setShowAddForm(false);
    }
  };

  const handleUpdateHotel = () => {
    if (editingHotel && formData.name && formData.location) {
      const updatedHotel = { ...editingHotel, ...formData };
      setHotels(hotels.map(h => h.id === editingHotel.id ? updatedHotel : h));
      setEditingHotel(null);
      setFormData({ name: '', location: '', description: '', pricePerNight: 0 });
    }
  };

  const handleDeleteHotel = (id) => {
    setHotels(hotels.filter(h => h.id !== id));
  };

  const startEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight
    });
    setShowAddForm(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-3 mr-4">
              <Building className="size-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Hotel Owner Dashboard</h3>
              <p className="text-blue-100">Manage your accommodation properties</p>
            </div>
          </div>
          <button
            onClick={onToggleExpand}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="size-6 text-white" />
            ) : (
              <ChevronDown className="size-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-800">My Hotels ({hotels.length})</h4>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="size-5" />
              Add Hotel
            </button>
          </div>

          {showAddForm && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h5 className="text-lg font-semibold mb-4">
                {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Hotel Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Price per Night ($)"
                  value={formData.pricePerNight}
                  onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-1"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={editingHotel ? handleUpdateHotel : handleAddHotel}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingHotel ? 'Update Hotel' : 'Add Hotel'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingHotel(null);
                    setFormData({ name: '', location: '', description: '', pricePerNight: 0 });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h5 className="font-semibold text-lg text-gray-800 mb-2">{hotel.name}</h5>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="size-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{hotel.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="size-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{hotel.rating || 'New'}</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">${hotel.pricePerNight}/night</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(hotel)}
                      className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <Edit3 className="size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHotel(hotel.id)}
                      className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelOwnerProfile;