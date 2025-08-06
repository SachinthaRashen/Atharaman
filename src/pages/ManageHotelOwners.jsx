import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import HotelOwnerForm from '../components/forms/HotelOwnerForm';
import HotelForm from '../components/forms/HotelForm';
import HotelOwnerView from '../components/views/HotelOwnerView';
import HotelView from '../components/views/HotelView';

const ManageHotelOwners = () => {
  const [currentView, setCurrentView] = useState('owners');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  const [hotelOwners, setHotelOwners] = useState([
    {
      id: 1,
      name: 'Kumari Silva',
      description: 'Boutique hotel owner with 15 years experience',
      nic: '196789123V',
      businessEmail: 'kumari@hotels.lk',
      personalNumber: '+94723456789',
      whatsappNumber: '+94723456789',
      userId: 'user003',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
    }
  ]);

  const [hotels, setHotels] = useState([
    {
      id: 1,
      ownerId: 1,
      name: 'Paradise View Hotel',
      description: 'Luxury hotel with stunning mountain views',
      address: '456 Hill Road, Ella',
      contactNumber: '+94572345678',
      relatedLocations: ['Ella', 'Kandy'],
      mainImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      images: []
    }
  ]);

  const ownerColumns = [
    { key: 'name', label: 'Owner Name', sortable: true },
    { key: 'businessEmail', label: 'Email', sortable: true },
    { key: 'personalNumber', label: 'Phone', sortable: false },
  ];

  const hotelColumns = [
    { key: 'name', label: 'Hotel Name', sortable: true },
    { key: 'address', label: 'Address', sortable: false },
    { key: 'contactNumber', label: 'Contact', sortable: false },
  ];

  const handleOwnerRowClick = (owner) => {
    setSelectedOwner(owner);
    setCurrentView('hotels');
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
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      if (currentView === 'owners') {
        setHotelOwners(hotelOwners.filter(o => o.id !== item.id));
      } else {
        setHotels(hotels.filter(h => h.id !== item.id));
      }
    }
  };

  const handleSave = (itemData) => {
    if (currentView === 'owners') {
      if (modalType === 'add') {
        const newOwner = {
          ...itemData,
          id: Math.max(...hotelOwners.map(o => o.id)) + 1
        };
        setHotelOwners([...hotelOwners, newOwner]);
      } else if (modalType === 'edit') {
        setHotelOwners(hotelOwners.map(o => 
          o.id === selectedItem.id ? { ...o, ...itemData } : o
        ));
      }
    } else {
      if (modalType === 'add') {
        const newHotel = {
          ...itemData,
          id: Math.max(...hotels.map(h => h.id)) + 1,
          ownerId: selectedOwner.id
        };
        setHotels([...hotels, newHotel]);
      } else if (modalType === 'edit') {
        setHotels(hotels.map(h => 
          h.id === selectedItem.id ? { ...h, ...itemData } : h
        ));
      }
    }
    setShowModal(false);
  };

  const filteredHotels = selectedOwner ? hotels.filter(h => h.ownerId === selectedOwner.id) : [];

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
                Hotels - {selectedOwner?.name}
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
            <HotelOwnerView owner={selectedItem} />
          ) : (
            <HotelView hotel={selectedItem} />
          )
        ) : (
          currentView === 'owners' ? (
            <HotelOwnerForm
              owner={selectedItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          ) : (
            <HotelForm
              hotel={selectedItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          )
        )}
      </Modal>
    </div>
  );
};

export default ManageHotelOwners;