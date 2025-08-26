import React, { useState, useEffect } from 'react';
import { Building, ChevronDown, ChevronUp, Plus, Edit3, Trash2, MapPin, User, Mail, Phone, CreditCard, X, Upload } from 'lucide-react';
import {
  getMyShopOwner,
  updateMyShopOwner,
  deleteMyShopOwner,
  getMyShops,
  createMyShop,
  updateMyShop,
  deleteMyShop,
  getLocations,
} from '../../../services/api';

const ShopOwnerProfile = ({ isExpanded, onToggleExpand, userId }) => {
  const [shopOwner, setShopOwner] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditOwnerForm, setShowEditOwnerForm] = useState(false);
  const [showShopForm, setShowShopForm] = useState(false);
  const [editingShop, setEditingShop] = useState(null);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  
  const [ownerFormData, setOwnerFormData] = useState({
    shopOwnerName: '',
    shopOwnerNic: '',
    businessMail: '',
    contactNumber: ''
  });

  const [shopFormData, setShopFormData] = useState({
    shopName: '',
    shopAddress: '',
    description: '',
    locations: []
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch data only when expanded
  useEffect(() => {
    if (isExpanded && userId) {
      fetchShopOwnerData();
      fetchLocations();
    }
  }, [isExpanded, userId]);

  const fetchShopOwnerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const ownerResponse = await getMyShopOwner();
      setShopOwner(ownerResponse.data);
      setOwnerFormData({
        shopOwnerName: ownerResponse.data.shopOwnerName,
        shopOwnerNic: ownerResponse.data.shopOwnerNic,
        businessMail: ownerResponse.data.businessMail,
        contactNumber: ownerResponse.data.contactNumber
      });
      
      const shopsResponse = await getMyShops();
      setShops(shopsResponse.data);
    } catch (err) {
      console.error('Error fetching shop owner data:', err);
      setError('Failed to load shop owner data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      const response = await getLocations();
      const locationNames = response.data.map(location => location.name || location.locationName);
      setAvailableLocations(locationNames);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleUpdateOwner = async () => {
    try {
      const response = await updateMyShopOwner(ownerFormData);
      setShopOwner(response.data.shopOwner);
      setShowEditOwnerForm(false);
      alert('Shop owner details updated successfully!');
    } catch (err) {
      console.error('Error updating shop owner:', err);
      setError('Failed to update shop owner details.');
    }
  };

  const handleDeleteOwner = async () => {
    if (window.confirm('Are you sure you want to delete your shop owner profile? This will also remove all associated shops.')) {
      try {
        await deleteMyShopOwner();
        alert('Shop owner deleted successfully!');
        window.location.reload();
      } catch (err) {
        console.error('Error deleting shop owner:', err);
        setError('Failed to delete shop owner.');
      }
    }
  };

  const handleSaveShop = async () => {
    try {
      const formData = new FormData();
      formData.append('shopName', shopFormData.shopName);
      formData.append('shopAddress', shopFormData.shopAddress);
      formData.append('description', shopFormData.description);
      
      // Only append locations if they exist
      if (shopFormData.locations && shopFormData.locations.length > 0) {
        shopFormData.locations.forEach(loc => {
          formData.append('locations[]', loc);
        });
      }

      // Append images if they exist
      images.forEach(image => {
        if (image instanceof File && image.type.startsWith('image/')) {
          formData.append('shopImage[]', image);
        }
      });

      let response;
      if (editingShop) {
        response = await updateMyShop(editingShop.id, formData);
        setShops(shops.map(shop => shop.id === editingShop.id ? response.data.shop : shop));
      } else {
        response = await createMyShop(formData);
        setShops([...shops, response.data.shop]);
      }
      
      setShowShopForm(false);
      setEditingShop(null);
      resetShopForm();
      alert(editingShop ? 'Shop updated successfully!' : 'Shop created successfully!');
    } catch (err) {
      console.error('Error saving shop:', err);
      setError('Failed to save shop. Please try again.');
    }
  };

  const handleDeleteShop = async (shopId) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      try {
        await deleteMyShop(shopId);
        setShops(shops.filter(shop => shop.id !== shopId));
        alert('Shop deleted successfully!');
      } catch (err) {
        console.error('Error deleting shop:', err);
        setError('Failed to delete shop.');
      }
    }
  };

  const startEditShop = (shop) => {
    setEditingShop(shop);
    setShopFormData({
      shopName: shop.shopName,
      shopAddress: shop.shopAddress,
      description: shop.description || '',
      locations: shop.locations || []
    });
    setImagePreviews(shop.shopImage ? shop.shopImage.map(img => `http://localhost:8000/storage/${img}`) : []);
    setImages([]);
    setShowShopForm(true);
  };

  const resetShopForm = () => {
    setShopFormData({
      shopName: '',
      shopAddress: '',
      description: '',
      locations: []
    });
    setImages([]);
    setImagePreviews([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    const validImageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)
    );
    
    const newImages = [...images, ...validImageFiles];
    setImages(newImages);
    
    const newPreviews = validImageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    if (newPreviews[index].startsWith('blob:')) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleLocationChange = (location) => {
    setShopFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* Header Section - Always Visible */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-3 mr-4">
              <Building className="size-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Shop Owner Dashboard</h3>
              <p className="text-blue-100">Manage your shop properties</p>
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

      {/* Content Section - Only visible when expanded */}
      {isExpanded && (
        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">Loading shop owner data...</div>
          ) : shopOwner ? (
            <>
              {/* Shop Owner Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-semibold text-gray-800">Shop Owner Details</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowEditOwnerForm(!showEditOwnerForm)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors text-sm"
                    >
                      <Edit3 className="size-4" />
                      Edit Details
                    </button>
                    <button
                      onClick={handleDeleteOwner}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors text-sm"
                    >
                      <Trash2 className="size-4" />
                      Delete Owner
                    </button>
                  </div>
                </div>
                
                {showEditOwnerForm ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Shop Owner Name
                        </label>
                        <input
                          type="text"
                          value={ownerFormData.shopOwnerName}
                          onChange={(e) => setOwnerFormData({...ownerFormData, shopOwnerName: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NIC Number
                        </label>
                        <input
                          type="text"
                          value={ownerFormData.shopOwnerNic}
                          onChange={(e) => setOwnerFormData({...ownerFormData, shopOwnerNic: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business Email
                        </label>
                        <input
                          type="email"
                          value={ownerFormData.businessMail}
                          onChange={(e) => setOwnerFormData({...ownerFormData, businessMail: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          value={ownerFormData.contactNumber}
                          onChange={(e) => setOwnerFormData({...ownerFormData, contactNumber: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleUpdateOwner}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Update Details
                      </button>
                      <button
                        onClick={() => setShowEditOwnerForm(false)}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <User className="size-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{shopOwner.shopOwnerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="size-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">NIC</p>
                        <p className="font-medium">{shopOwner.shopOwnerNic}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="size-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Business Email</p>
                        <p className="font-medium">{shopOwner.businessMail}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="size-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Contact Number</p>
                        <p className="font-medium">{shopOwner.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shop Form */}
              {showShopForm && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h5 className="text-lg font-semibold mb-4">
                    {editingShop ? 'Edit Shop' : 'Add New Shop'}
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shop Name *
                      </label>
                      <input
                        type="text"
                        value={shopFormData.shopName}
                        onChange={(e) => setShopFormData({...shopFormData, shopName: e.target.value})}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shop Images
                      </label>
                      <div className="flex flex-wrap gap-4 mb-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative h-32 w-32">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            >
                              <X className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <label 
                          htmlFor="fileInput"
                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-40"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="text-sm">Upload Images</span>
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          onChange={handleImageChange}
                          accept="image/*"
                          multiple
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={shopFormData.description}
                        onChange={(e) => setShopFormData({...shopFormData, description: e.target.value})}
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        value={shopFormData.shopAddress}
                        onChange={(e) => setShopFormData({...shopFormData, shopAddress: e.target.value})}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Related Locations
                      </label>
                      {loadingLocations ? (
                        <div className="text-gray-500">Loading locations...</div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {availableLocations.map(location => (
                            <label key={location} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={shopFormData.locations.includes(location)}
                                onChange={() => handleLocationChange(location)}
                                className="mr-2"
                              />
                              {location}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSaveShop}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {editingShop ? 'Update Shop' : 'Add Shop'}
                      </button>
                      <button
                        onClick={() => {
                          setShowShopForm(false);
                          setEditingShop(null);
                          resetShopForm();
                        }}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Shops Section */}
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-semibold text-gray-800">My Shops ({shops.length})</h4>
                <button
                  onClick={() => setShowShopForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                  <Plus className="size-5" />
                  Add Shop
                </button>
              </div>

              {shops.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Building className="size-12 mx-auto mb-4 text-gray-400" />
                  <p>No shops found. Add your first shop to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shops.map((shop) => (
                    <div key={shop.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      {shop.shopImage && shop.shopImage.length > 0 ? (
                        <img
                          src={`http://localhost:8000/storage/${shop.shopImage[0]}`}
                          alt={shop.shopName}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Building className="size-12 text-gray-400" />
                        </div>
                      )}
                      <div className="p-4">
                        <h5 className="font-semibold text-lg text-gray-800 mb-2">{shop.shopName}</h5>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="size-4 mr-1" />
                          <span className="text-sm">{shop.shopAddress}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{shop.description}</p>
                        {shop.locations && shop.locations.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-500">Locations:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {shop.locations.map((location, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {location}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditShop(shop)}
                            className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm transition-colors"
                          >
                            <Edit3 className="size-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteShop(shop.id)}
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
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Building className="size-12 mx-auto mb-4 text-gray-400" />
              <p>No shop owner data available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopOwnerProfile;