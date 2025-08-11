import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import VehicleOwnerForm from '../components/forms/VehicleOwnerForm';
import VehicleForm from '../components/forms/VehicleForm';
import VehicleOwnerView from '../components/views/VehicleOwnerView';
import VehicleView from '../components/views/VehicleView';

const ManageVehicleOwners = () => {
  const [currentView, setCurrentView] = useState('owners');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  const [vehicleOwners, setVehicleOwners] = useState([
    {
      id: 1,
      name: 'Kamal Jayasinghe',
      description: 'Professional transport service provider',
      nic: '198567432V',
      businessEmail: 'kamal@transport.lk',
      personalNumber: '+94734567890',
      whatsappNumber: '+94734567890',
      userId: 'user004',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'
    }
  ]);

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      ownerId: 1,
      vehicleType: 'Car',
      description: 'Comfortable Toyota Prius for city tours',
      passengers: 4,
      contactNumber: '+94734567890',
      pricePerDay: 8500,
      mileagePerDay: 150,
      withDriver: true,
      withoutDriver: false,
      relatedLocations: ['Colombo', 'Kandy'],
      mainImage: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg',
      images: []
    }
  ]);

  const ownerColumns = [
    { key: 'name', label: 'Owner Name', sortable: true },
    { key: 'businessEmail', label: 'Email', sortable: true },
    { key: 'personalNumber', label: 'Phone', sortable: false },
  ];

  const vehicleColumns = [
    { key: 'vehicleType', label: 'Type', sortable: true },
    { key: 'passengers', label: 'Passengers', sortable: true },
    { key: 'pricePerDay', label: 'Price/Day', sortable: true, render: (value) => `Rs. ${value}` },
    { key: 'contactNumber', label: 'Contact', sortable: false },
  ];

  const handleOwnerRowClick = (owner) => {
    setSelectedOwner(owner);
    setCurrentView('vehicles');
  };

  const handleBackToOwners = () => {
    setCurrentView('owners');
    setSelectedOwner(null);
  };

  const handleAdd = () => {
    setModalType('add');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleView = (item) => {
    setModalType('view');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalType('edit');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete this ${currentView === 'owners' ? 'owner' : 'vehicle'}?`)) {
      if (currentView === 'owners') {
        setVehicleOwners(vehicleOwners.filter(o => o.id !== item.id));
      } else {
        setVehicles(vehicles.filter(v => v.id !== item.id));
      }
    }
  };

  const handleSave = (itemData) => {
    if (currentView === 'owners') {
      if (modalType === 'add') {
        const newOwner = {
          ...itemData,
          id: Math.max(...vehicleOwners.map(o => o.id)) + 1
        };
        setVehicleOwners([...vehicleOwners, newOwner]);
      } else if (modalType === 'edit') {
        setVehicleOwners(vehicleOwners.map(o => 
          o.id === selectedItem.id ? { ...o, ...itemData } : o
        ));
      }
    } else {
      if (modalType === 'add') {
        const newVehicle = {
          ...itemData,
          id: Math.max(...vehicles.map(v => v.id)) + 1,
          ownerId: selectedOwner.id
        };
        setVehicles([...vehicles, newVehicle]);
      } else if (modalType === 'edit') {
        setVehicles(vehicles.map(v => 
          v.id === selectedItem.id ? { ...v, ...itemData } : v
        ));
      }
    }
    setShowModal(false);
  };

  const filteredVehicles = selectedOwner ? vehicles.filter(v => v.ownerId === selectedOwner.id) : [];

  return (
    <div className="mt-16">
      {currentView === 'owners' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vehicle Owners List</h1>
              <p className="text-gray-600 mt-1">Manage all vehicle owners in the system</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add New
            </button>
          </div>

          <DataTable
            data={vehicleOwners}
            columns={ownerColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRowClick={handleOwnerRowClick}
            clickableRows={true}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <button
                onClick={handleBackToOwners}
                className="text-blue-600 hover:text-blue-800 mb-2 flex items-center"
              >
                ← Back to Vehicle Owners
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Vehicles - {selectedOwner?.name}
              </h1>
              <p className="text-gray-600 mt-1">Manage vehicles for this owner</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add New Vehicle
            </button>
          </div>

          <DataTable
            data={filteredVehicles}
            columns={vehicleColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalType === 'add' ? 
            (currentView === 'owners' ? 'Add New Vehicle Owner' : 'Add New Vehicle') :
          modalType === 'edit' ? 
            (currentView === 'owners' ? 'Edit Vehicle Owner' : 'Edit Vehicle') : 
            (currentView === 'owners' ? 'Vehicle Owner Details' : 'Vehicle Details')
        }
        size={modalType === 'view' ? 'large' : 'medium'}
      >
        {modalType === 'view' ? (
          currentView === 'owners' ? (
            <VehicleOwnerView owner={selectedItem} />
          ) : (
            <VehicleView vehicle={selectedItem} />
          )
        ) : (
          currentView === 'owners' ? (
            <VehicleOwnerForm
              owner={selectedItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          ) : (
            <VehicleForm
              vehicle={selectedItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          )
        )}
      </Modal>
    </div>
  );
};

export default ManageVehicleOwners;