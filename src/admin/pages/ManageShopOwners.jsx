import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import ShopOwnerForm from '../components/forms/ShopOwnerForm';
import ShopForm from '../components/forms/ShopForm';
import ShopOwnerView from '../components/views/ShopOwnerView';
import ShopView from '../components/views/ShopView';

const ManageShopOwners = () => {
  const [currentView, setCurrentView] = useState('owners'); // 'owners' or 'shops'
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  const [shopOwners, setShopOwners] = useState([
    {
      id: 1,
      name: 'Sunil Fernando',
      description: 'Traditional craft shop owner',
      nic: '197234567V',
      businessEmail: 'sunil@crafts.lk',
      personalNumber: '+94712345678',
      whatsappNumber: '+94712345678',
      userId: 'user002',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
    }
  ]);

  const [shops, setShops] = useState([
    {
      id: 1,
      ownerId: 1,
      name: 'Traditional Crafts Emporium',
      description: 'Authentic Sri Lankan handicrafts and souvenirs',
      address: '123 Main Street, Kandy',
      contactNumber: '+94812345678',
      relatedLocations: ['Kandy', 'Sigiriya'],
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'
    }
  ]);

  const ownerColumns = [
    { key: 'name', label: 'Owner Name', sortable: true },
    { key: 'businessEmail', label: 'Email', sortable: true },
    { key: 'personalNumber', label: 'Phone', sortable: false },
  ];

  const shopColumns = [
    { key: 'name', label: 'Shop Name', sortable: true },
    { key: 'address', label: 'Address', sortable: false },
    { key: 'contactNumber', label: 'Contact', sortable: false },
  ];

  const handleOwnerRowClick = (owner) => {
    setSelectedOwner(owner);
    setCurrentView('shops');
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
    const itemName = currentView === 'owners' ? item.name : item.name;
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      if (currentView === 'owners') {
        setShopOwners(shopOwners.filter(o => o.id !== item.id));
      } else {
        setShops(shops.filter(s => s.id !== item.id));
      }
    }
  };

  const handleSave = (itemData) => {
    if (currentView === 'owners') {
      if (modalType === 'add') {
        const newOwner = {
          ...itemData,
          id: Math.max(...shopOwners.map(o => o.id)) + 1
        };
        setShopOwners([...shopOwners, newOwner]);
      } else if (modalType === 'edit') {
        setShopOwners(shopOwners.map(o => 
          o.id === selectedItem.id ? { ...o, ...itemData } : o
        ));
      }
    } else {
      if (modalType === 'add') {
        const newShop = {
          ...itemData,
          id: Math.max(...shops.map(s => s.id)) + 1,
          ownerId: selectedOwner.id
        };
        setShops([...shops, newShop]);
      } else if (modalType === 'edit') {
        setShops(shops.map(s => 
          s.id === selectedItem.id ? { ...s, ...itemData } : s
        ));
      }
    }
    setShowModal(false);
  };

  const filteredShops = selectedOwner ? shops.filter(s => s.ownerId === selectedOwner.id) : [];

  return (
    <div className="mt-16">
      {currentView === 'owners' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shop Owners List</h1>
              <p className="text-gray-600 mt-1">Manage all shop owners in the system</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add New
            </button>
          </div>

          <DataTable
            data={shopOwners}
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
                ← Back to Shop Owners
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Shops - {selectedOwner?.name}
              </h1>
              <p className="text-gray-600 mt-1">Manage shops for this owner</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add New Shop
            </button>
          </div>

          <DataTable
            data={filteredShops}
            columns={shopColumns}
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
            (currentView === 'owners' ? 'Add New Shop Owner' : 'Add New Shop') :
          modalType === 'edit' ? 
            (currentView === 'owners' ? 'Edit Shop Owner' : 'Edit Shop') : 
            (currentView === 'owners' ? 'Shop Owner Details' : 'Shop Details')
        }
        size={modalType === 'view' ? 'large' : 'medium'}
      >
        {modalType === 'view' ? (
          currentView === 'owners' ? (
            <ShopOwnerView owner={selectedItem} />
          ) : (
            <ShopView shop={selectedItem} />
          )
        ) : (
          currentView === 'owners' ? (
            <ShopOwnerForm
              owner={selectedItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          ) : (
            <ShopForm
              shop={selectedItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          )
        )}
      </Modal>
    </div>
  );
};

export default ManageShopOwners;