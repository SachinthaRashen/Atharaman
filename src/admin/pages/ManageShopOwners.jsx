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
  const [shopOwners, setShopOwners] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch shop owners on component mount
  useEffect(() => {
    fetchShopOwners();
  }, []);

  // Fetch shops when selected owner changes
  useEffect(() => {
    if (selectedOwner) {
      fetchShopsByOwner(selectedOwner.id);
    }
  }, [selectedOwner]);

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
  };

  const handleAdd = () => {
    setModalType('add');
    setSelectedShopOwner(null);
    setShowModal(true);
  };

  const handleView = async (shopOwner) => {
    try {
      const response = await getShopOwnerById(shopOwner.id);
      setModalType('view');
      setSelectedShopOwner(response.data);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching shop owner details:', err);
    }
  };

  const handleEdit = (shopOwner) => {
    setModalType('edit');
    setSelectedShopOwner(shopOwner);
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    const itemName = currentView === 'owners' ? item.shopOwnerName : item.shopName;
    if (window.confirm(`Are you sure you want to delete "${item.itemName}"?`)) {
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
        // ... existing owner save logic ...
      } else {
        // For shops
        const shopData = {
          shopName: formData.shopName,
          shopAddress: formData.shopAddress,
          description: formData.description || '',
          locations: formData.relatedLocations || [], // Ensure array
          shop_owner_id: selectedOwner.id,
          user_id: selectedOwner.user_id
        };

        const response = await createShop(shopData);
        setShops([...shops, response.data.shop]);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving shop:', error.response?.data || error.message);
      // Add user-friendly error display here
    }
  };

  // Update column definitions to match backend fields
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