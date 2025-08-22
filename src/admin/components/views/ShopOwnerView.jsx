import React from 'react';
import { Mail, Phone, MessageCircle, User } from 'lucide-react';

const ShopOwnerView = ({ owner }) => {
  if (!owner) return <div>No shop owner data available</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={owner.image || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'}
          alt={owner.shopOwnerName || owner.name}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{owner.shopOwnerName || owner.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            <span>User ID: {owner.user_id}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{owner.businessMail || owner.businessEmail}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{owner.contactNumber}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">NIC:</span>
              <p className="text-gray-900">{owner.shopOwnerNic}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerView;