import React, { useState, useEffect } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import VehicleOwnerForm from '../components/forms/VehicleOwnerForm';
import VehicleForm from '../components/forms/VehicleForm';
import VehicleOwnerView from '../components/views/VehicleOwnerView';
import VehicleView from '../components/views/VehicleView';
import {
  getVehicleOwners,
  getVehicleOwnerById,
  createVehicleOwner,
  updateVehicleOwner,
  deleteVehicleOwner,
  getVehiclesByOwner,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../../services/api';

const ManageVehicleOwners = () => {
  const [currentView, setCurrentView] = useState('owners');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedVehicleOwner, setSelectedVehicleOwner] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleOwners, setVehicleOwners] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch vehicle owners on component mount
  useEffect(() => {
    fetchVehicleOwners();
  }, []);

  const fetchVehicleOwners = async () => {
    setLoading(true);
    try {
      const response = await getVehicleOwners();
      setVehicleOwners(response.data);
    } catch (error) {
      console.error('Error fetching vehicle owners:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch vehicles when selected owner changes
  useEffect(() => {
    if (selectedOwner) {
      fetchVehiclesByOwner(selectedOwner.id);
    }
  }, [selectedOwner]);

  const fetchVehiclesByOwner = async (ownerId) => {
    setLoading(true);
    try {
      const response = await getVehiclesByOwner(ownerId);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOwnerRowClick = (owner) => {
    setSelectedOwner(owner);
    setCurrentView('vehicles');
  };

  const handleBackToOwners = () => {
    setCurrentView('owners');
    setSelectedOwner(null);
    setSelectedVehicle(null);
  };

  const handleAdd = () => {
    setModalType('add');
    setSelectedVehicleOwner(null)
    setSelectedVehicle(null);
    setShowModal(true);
  };

const handleView = async (item) => {
    try {
      if (currentView === 'owners') {
        const response = await getVehicleOwnerById(item.id);
        setModalType('view');
        setSelectedVehicleOwner(response.data);
        setShowModal(true);
      } else {
        const response = await getVehicleById(item.id);
        setModalType('view');
        setSelectedVehicle(response.data);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };

  const handleEdit = (item) => {
    setModalType('edit');
    if (currentView === 'owners') {
      setSelectedVehicleOwner(item);
      setSelectedVehicle(null);
    } else {
      setSelectedVehicle(item);
      setSelectedVehicleOwner(null);
    }
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    const itemName = currentView === 'owners' ? item.vehicleOwnerName : item.vehicleName;
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      try {
        if (currentView === 'owners') {
          await deleteVehicleOwner(item.id);
          setVehicleOwners(vehicleOwners.filter(o => o.id !== item.id));
        } else {
          await deleteVehicle(item.id);
          setVehicles(vehicles.filter(v => v.id !== item.id));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (currentView === 'owners') {   
        if (modalType === 'add') {
          const response = await createVehicleOwner(formData);
          setVehicleOwners([...vehicleOwners, response.data.vehicleOwner]);
        } else if (modalType === 'edit') {
          const response = await updateVehicleOwner(selectedVehicleOwner.id, formData);
          console.log('Update response:', response.data);
          setVehicleOwners(vehicleOwners.map(owner => 
            owner.id === selectedVehicleOwner.id ? response.data.vehicleOwner : owner
          ));
        }
        setShowModal(false);
      } else {
        // For vehicles - formData is now a FormData object
        const response = modalType === 'add'
          ? await createVehicle(formData)
          : await updateVehicle(selectedVehicle.id, formData);
        
        setVehicles(prev => modalType === 'add'
          ? [...prev, response.data.vehicle]
          : prev.map(v => v.id === response.data.vehicle.id ? {
              ...response.data.vehicle,
              locations: Array.isArray(response.data.vehicle.locations)
                ? response.data.vehicle.locations
                : []
            } : v)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving:', error);
      console.error('Error response:', error.response?.data);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const ownerColumns = [
    { key: 'vehicleOwnerName', label: 'Owner Name', sortable: true },
    { key: 'businessMail', label: 'Email', sortable: true },
    { key: 'personalNumber', label: 'Phone', sortable: true },
  ];

  const vehicleColumns = [
    { key: 'vehicleName', label: 'Make & Model', sortable: true },
    { key: 'vehicleType', label: 'Type', sortable: true },
    { key: 'vehicleNumber', label: 'Reg No', sortable: true },
    { key: 'fuelType', label: 'Fuel Type', sortable: true },
  ];

  const filteredVehicles = selectedOwner ? vehicles : [];

  if (loading) return <div>Loading...</div>;

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
                Vehicles - {selectedOwner?.vehicleOwnerName || selectedOwner?.name}
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
            <VehicleOwnerView owner={selectedVehicleOwner} />
          ) : (
            <VehicleView vehicle={selectedVehicle} />
          )
        ) : (
          currentView === 'owners' ? (
            <VehicleOwnerForm
              owner={selectedVehicleOwner}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
              isEditing={modalType === 'edit'}
            />
          ) : (
            <VehicleForm
              vehicle={selectedVehicle}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
              isEditing={modalType === 'edit'}
              selectedOwner={selectedOwner}
            />
          )
        )}
      </Modal>
    </div>
  );
};

export default ManageVehicleOwners;