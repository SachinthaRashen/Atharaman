import React from 'react';
import { Store, MapPin, Phone } from 'lucide-react';

const ShopView = ({ shop }) => {
  if (!shop) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={shop.image || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'}
          alt={shop.name}
          className="w-48 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h3>
          <p className="text-gray-600 mb-4">{shop.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Store className="w-4 h-4 mr-1" />
            <span>Shop</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Shop Information</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-1" />
              <span className="text-gray-700">{shop.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{shop.contactNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {shop.relatedLocations && shop.relatedLocations.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Related Locations
          </h4>
          <div className="flex flex-wrap gap-2">
            {shop.relatedLocations.map((location, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {location}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopView;