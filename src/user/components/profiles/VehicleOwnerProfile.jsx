import React, { useState } from 'react';
import { Car, ChevronDown, ChevronUp, Plus, Edit3, Trash2, MapPin, Fuel, User, DollarSign } from 'lucide-react';

const VehicleOwnerProfile = ({ isExpanded, onToggleExpand, userId }) => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Toyota 4Runner Off-Road",
      pricePerDay: 85,
      mileagePerDay: "200 miles included",
      withDriver: true,
      description: "Perfect for mountain adventures with 4WD capability",
      locations: ["Downtown", "Airport"],
      images: ["https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg"]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    pricePerDay: 0,
    mileagePerDay: '',
    withDriver: false,
    description: '',
    locations: ''
  });

  const handleAddVehicle = () => {
    if (formData.name && formData.pricePerDay > 0) {
      const newVehicle = {
        id: Date.now(),
        name: formData.name,
        pricePerDay: formData.pricePerDay,
        mileagePerDay: formData.mileagePerDay,
        withDriver: formData.withDriver,
        description: formData.description,
        locations: formData.locations.split(',').map(l => l.trim()),
        images: ["https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg"]
      };
      setVehicles([...vehicles, newVehicle]);
      setFormData({ name: '', pricePerDay: 0, mileagePerDay: '', withDriver: false, description: '', locations: '' });
      setShowAddForm(false);
    }
  };

  const handleUpdateVehicle = () => {
    if (editingVehicle && formData.name && formData.pricePerDay > 0) {
      const updatedVehicle = {
        ...editingVehicle,
        name: formData.name,
        pricePerDay: formData.pricePerDay,
        mileagePerDay: formData.mileagePerDay,
        withDriver: formData.withDriver,
        description: formData.description,
        locations: formData.locations.split(',').map(l => l.trim())
      };
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? updatedVehicle : v));
      setEditingVehicle(null);
      setFormData({ name: '', pricePerDay: 0, mileagePerDay: '', withDriver: false, description: '', locations: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const startEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      pricePerDay: vehicle.pricePerDay,
      mileagePerDay: vehicle.mileagePerDay,
      withDriver: vehicle.withDriver,
      description: vehicle.description,
      locations: vehicle.locations.join(', ')
    });
    setShowAddForm(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-3">
              <Car className="size-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Vehicle Owner Dashboard</h3>
              <p className="text-orange-100">Manage your rental vehicle fleet</p>
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
            <h4 className="text-xl font-semibold text-gray-800">My Vehicles ({vehicles.length})</h4>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="size-5" />
              Add Vehicle
            </button>
          </div>

          {showAddForm && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h5 className="text-lg font-semibold mb-4">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Vehicle Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="number"
                  placeholder="Price per Day ($)"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Mileage per Day"
                  value={formData.mileagePerDay}
                  onChange={(e) => setFormData({ ...formData, mileagePerDay: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Available Locations (comma separated)"
                  value={formData.locations}
                  onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <textarea
                  placeholder="Vehicle Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 md:col-span-2"
                  rows={3}
                />
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.withDriver}
                      onChange={(e) => setFormData({ ...formData, withDriver: e.target.checked })}
                      className="size-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Driver available with vehicle</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingVehicle(null);
                    setFormData({ name: '', pricePerDay: 0, mileagePerDay: '', withDriver: false, description: '', locations: '' });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h5 className="font-semibold text-lg text-gray-800 mb-2">{vehicle.name}</h5>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="size-4 mr-1" />
                    <span className="text-sm">{vehicle.locations.join(', ')}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{vehicle.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="size-4 text-orange-500 mr-1" />
                        <span className="text-sm font-medium">Price per day</span>
                      </div>
                      <span className="text-lg font-bold text-orange-600">${vehicle.pricePerDay}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Fuel className="size-4 text-gray-500 mr-1" />
                        <span className="text-sm">Mileage</span>
                      </div>
                      <span className="text-sm text-gray-600">{vehicle.mileagePerDay}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="size-4 text-blue-500 mr-1" />
                        <span className="text-sm">Driver</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        vehicle.withDriver 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {vehicle.withDriver ? 'Available' : 'Self-drive only'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(vehicle)}
                      className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <Edit3 className="size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
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

export default VehicleOwnerProfile;