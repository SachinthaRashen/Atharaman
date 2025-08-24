import React, { useState, useEffect } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import HotelOwnerForm from '../components/forms/HotelOwnerForm';
import HotelForm from '../components/forms/HotelForm';
import HotelOwnerView from '../components/views/HotelOwnerView';
import HotelView from '../components/views/HotelView';
import {
  getHotelOwners,
  getHotelOwnerById,
  createHotelOwner,
  updateHotelOwner,
  deleteHotelOwner,
  getHotelsByOwner,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
} from '../../services/api'

const ManageHotelOwners = () => {
  const [currentView, setCurrentView] = useState('owners');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedHotelOwner, setSelectedHotelOwner] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelOwners, setHotelOwners] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

// Fetch hotel owners on component mount
  useEffect(() => {
    fetchHotelOwners();
  }, []);

  const fetchHotelOwners = async () => {
    setLoading(true);
    try {
      const response = await getHotelOwners();
      setHotelOwners(response.data);
    } catch (error) {
      console.error('Error fetching hotel owners:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hotels when selected owner changes
  useEffect(() => {
    if (selectedOwner) {
      fetchHotelsByOwner(selectedOwner.id);
    }
  }, [selectedOwner]);

  const fetchHotelsByOwner = async (ownerId) => {
    setLoading(true);
    try {
      const response = await getHotelsByOwner(ownerId);
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOwnerRowClick = (owner) => {
    setSelectedOwner(owner);
    setCurrentView('hotels');
  };

  const handleBackToOwners = () => {
    setCurrentView('owners');
    setSelectedOwner(null);
    setSelectedHotel(null);
  };

  const handleAdd = () => {
    setModalType('add');
    setSelectedHotelOwner(null);
    setSelectedHotel(null);
    setShowModal(true);
  };

  const handleView = async (item) => {
    try {
      if (currentView === 'owners') {
        const response = await getHotelOwnerById(item.id);
        setModalType('view');
        setSelectedHotelOwner(response.data);
        setShowModal(true);
      } else {
        const response = await getHotelById(item.id);
        setModalType('view');
        setSelectedHotel(response.data);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };

  const handleEdit = (item) => {
    setModalType('edit');
    if (currentView === 'owners') {
      setSelectedHotelOwner(item);
      setSelectedHotel(null);
    } else {
      setSelectedHotel(item);
      setSelectedHotelOwner(null);
    }
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    const itemName = currentView === 'owners' ? item.hotelOwnerName : item.hotelName;
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      try {
        if (currentView === 'owners') {
          await deleteHotelOwner(item.id);
          setHotelOwners(hotelOwners.filter(o => o.id !== item.id));
        } else {
          await deleteHotel(item.id);
          setHotels(hotels.filter(h => h.id !== item.id));
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
          const response = await createHotelOwner(formData);
          setHotelOwners([...hotelOwners, response.data.hotelOwner]);
        } else if (modalType === 'edit') {
          const response = await updateHotelOwner(selectedHotelOwner.id, formData);
          console.log('Update response:', response.data);
          setHotelOwners(hotelOwners.map(owner => 
            owner.id === selectedHotelOwner.id ? response.data.hotelOwner : owner
          ));
        }
        setShowModal(false);
      } else {
        // For hotels - formData is now a FormData object
        const response = modalType === 'add'
          ? await createHotel(formData)
          : await updateHotel(selectedHotel.id, formData);
        
        setHotels(prev => modalType === 'add'
          ? [...prev, response.data.hotel]
          : prev.map(h => h.id === response.data.hotel.id ? {
              ...response.data.hotel,
              locations: Array.isArray(response.data.hotel.locations)
                ? response.data.hotel.locations
                : []
            } : h)
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
    { key: 'hotelOwnerName', label: 'Owner Name', sortable: true },
    { key: 'businessMail', label: 'Email', sortable: true },
    { key: 'contactNumber', label: 'Phone', sortable: true },
  ];

  const hotelColumns = [
    { key: 'hotelName', label: 'Hotel Name', sortable: true },
    { key: 'hotelAddress', label: 'Address', sortable: true },
    { key: 'contactNumber', label: 'Phone', sortable: true },
  ];

  const filteredHotels = selectedOwner ? hotels : [];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-16">
      {currentView === 'owners' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hotel Owners List</h1>
              <p className="text-gray-600 mt-1">Manage all hotel owners in the system</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add New
            </button>
          </div>

          <DataTable
            data={hotelOwners}
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
                ← Back to Hotel Owners
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Hotels - {selectedOwner?.hotelOwnerName || selectedOwner?.name}
              </h1>
              <p className="text-gray-600 mt-1">Manage hotels for this owner</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add New Hotel
            </button>
          </div>

          <DataTable
            data={filteredHotels}
            columns={hotelColumns}
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
            (currentView === 'owners' ? 'Add New Hotel Owner' : 'Add New Hotel') :
          modalType === 'edit' ? 
            (currentView === 'owners' ? 'Edit Hotel Owner' : 'Edit Hotel') : 
            (currentView === 'owners' ? 'Hotel Owner Details' : 'Hotel Details')
        }
        size={modalType === 'view' ? 'large' : 'medium'}
      >
        {modalType === 'view' ? (
          currentView === 'owners' ? (
            <HotelOwnerView owner={selectedHotelOwner} />
          ) : (
            <HotelView hotel={selectedHotel} />
          )
        ) : (
          currentView === 'owners' ? (
            <HotelOwnerForm
              owner={selectedHotelOwner}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
              isEditing={modalType === 'edit'}
            />
          ) : (
            <HotelForm
              hotel={selectedHotel}
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

export default ManageHotelOwners;