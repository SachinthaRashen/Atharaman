import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import LocationForm from '../components/forms/LocationForm';
import LocationView from '../components/views/LocationView';

const ManageLocations = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: 'Sigiriya Rock Fortress',
      shortDescription: 'Ancient rock fortress and palace ruins',
      province: 'Central',
      mainImage: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
      longDescription: 'Sigiriya is an ancient rock fortress located in the northern Matale District...',
      coordinates: { lat: 7.9568, lng: 80.7597 }
    },
    {
      id: 2,
      name: 'Temple of the Tooth',
      shortDescription: 'Sacred Buddhist temple in Kandy',
      province: 'Central',
      mainImage: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      longDescription: 'The Temple of the Sacred Tooth Relic is a Buddhist temple in Kandy...',
      coordinates: { lat: 7.2936, lng: 80.6350 }
    }
  ]);

  const columns = [
    { key: 'name', label: 'Location Name', sortable: true },
    { key: 'shortDescription', label: 'Description', sortable: false },
    { key: 'province', label: 'Province', sortable: true },
  ];

  const handleAdd = () => {
    setModalType('add');
    setSelectedLocation(null);
    setShowModal(true);
  };

  const handleView = (location) => {
    setModalType('view');
    setSelectedLocation(location);
    setShowModal(true);
  };

  const handleEdit = (location) => {
    setModalType('edit');
    setSelectedLocation(location);
    setShowModal(true);
  };

  const handleDelete = (location) => {
    if (window.confirm(`Are you sure you want to delete "${location.name}"?`)) {
      setLocations(locations.filter(l => l.id !== location.id));
    }
  };

  const handleSave = (locationData) => {
    if (modalType === 'add') {
      const newLocation = {
        ...locationData,
        id: Math.max(...locations.map(l => l.id)) + 1
      };
      setLocations([...locations, newLocation]);
    } else if (modalType === 'edit') {
      setLocations(locations.map(l => 
        l.id === selectedLocation.id ? { ...l, ...locationData } : l
      ));
    }
    setShowModal(false);
  };

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locations List</h1>
          <p className="text-gray-600 mt-1">Manage all tourist locations in the system</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Add New
        </button>
      </div>

      <DataTable
        data={locations}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalType === 'add' ? 'Add New Location' :
          modalType === 'edit' ? 'Edit Location' : 'Location Details'
        }
        size={modalType === 'view' ? 'large' : 'medium'}
      >
        {modalType === 'view' ? (
          <LocationView location={selectedLocation} />
        ) : (
          <LocationForm
            location={selectedLocation}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageLocations;