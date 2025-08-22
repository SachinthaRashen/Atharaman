import React, { useState, useEffect } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import ShopOwnerForm from '../components/forms/ShopOwnerForm';
import ShopForm from '../components/forms/ShopForm';
import ShopOwnerView from '../components/views/ShopOwnerView';
import ShopView from '../components/views/ShopView';
import {
  getShopOwners,
  getShopOwnerById,
  createShopOwner,
  updateShopOwner,
  deleteShopOwner,
  getShopsByOwner,
  getShopById,
  createShop,
  updateShop,
  deleteShop
} from '../../services/api';

const ManageShopOwners = () => {
  const [currentView, setCurrentView] = useState('owners'); // 'owners' or 'shops'
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedShopOwner, setSelectedShopOwner] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [shopOwners, setShopOwners] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch shop owners on component mount
  useEffect(() => {
    fetchShopOwners();
  }, []);

  const fetchShopOwners = async () => {
    setLoading(true);
    try {
      const response = await getShopOwners();
      setShopOwners(response.data);
    } catch (error) {
      console.error('Error fetching shop owners:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch shops when selected owner changes
  useEffect(() => {
    if (selectedOwner) {
      fetchShopsByOwner(selectedOwner.id);
    }
  }, [selectedOwner]);

  const fetchShopsByOwner = async (ownerId) => {
    setLoading(true);
    try {
      const response = await getShopsByOwner(ownerId);
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOwnerRowClick = (owner) => {
    setSelectedOwner(owner);
    setCurrentView('shops');
  };

  const handleBackToOwners = () => {
    setCurrentView('owners');
    setSelectedOwner(null);
    setSelectedShop(null);
  };

  const handleAdd = () => {
    setModalType('add');
    setSelectedShopOwner(null);
    setSelectedShop(null);
    setShowModal(true);
  };

  const handleView = async (item) => {
    try {
      if (currentView === 'owners') {
        const response = await getShopOwnerById(item.id);
        setModalType('view');
        setSelectedShopOwner(response.data);
        setShowModal(true);
      } else {
        const response = await getShopById(item.id);
        setModalType('view');
        setSelectedShop(response.data);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };

  const handleEdit = (item) => {
    setModalType('edit');
    if (currentView === 'owners') {
      setSelectedShopOwner(item);
      setSelectedShop(null);
    } else {
      setSelectedShop(item);
      setSelectedShopOwner(null);
    }
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    const itemName = currentView === 'owners' ? item.shopOwnerName : item.shopName;
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      try {
        if (currentView === 'owners') {
          await deleteShopOwner(item.id);
          setShopOwners(shopOwners.filter(o => o.id !== item.id));
        } else {
          await deleteShop(item.id);
          setShops(shops.filter(s => s.id !== item.id));
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
          const response = await createShopOwner(formData);
          setShopOwners([...shopOwners, response.data.shopOwner]);
        } else if (modalType === 'edit') {
          const response = await updateShopOwner(selectedShopOwner.id, formData);
          console.log('Update response:', response.data);
          setShopOwners(shopOwners.map(owner => 
            owner.id === selectedShopOwner.id ? response.data.shopOwner : owner
          ));
        }
        setShowModal(false);
      } else {
        // For shops - formData is now a FormData object
        const response = modalType === 'add'
          ? await createShop(formData)
          : await updateShop(selectedShop.id, formData);
        
        setShops(prev => modalType === 'add'
          ? [...prev, response.data.shop]
          : prev.map(s => s.id === response.data.shop.id ? {
              ...response.data.shop,
              locations: Array.isArray(response.data.shop.locations)
                ? response.data.shop.locations
                : []
            } : s)
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
    { key: 'shopOwnerName', label: 'Owner Name', sortable: true },
    { key: 'businessMail', label: 'Email', sortable: true },
    { key: 'contactNumber', label: 'Phone', sortable: true },
  ];

  const shopColumns = [
    { key: 'shopName', label: 'Shop Name', sortable: true },
    { key: 'shopAddress', label: 'Address', sortable: true },
    { key: 'contactNumber', label: 'Contact', sortable: true },
  ];

  const filteredShops = selectedOwner ? shops : [];

  if (loading) return <div>Loading...</div>;

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
                Shops - {selectedOwner?.shopOwnerName || selectedOwner?.name}
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
            <ShopOwnerView owner={selectedShopOwner} />
          ) : (
            <ShopView shop={selectedShop} />
          )
        ) : (
          currentView === 'owners' ? (
            <ShopOwnerForm
              owner={selectedShopOwner}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
              isEditing={modalType === 'edit'}
            />
          ) : (
            <ShopForm
              shop={selectedShop}
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

export default ManageShopOwners;