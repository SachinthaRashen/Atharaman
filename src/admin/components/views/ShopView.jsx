import React from 'react';
import { Store, MapPin, Phone } from 'lucide-react';

const ShopView = ({ shop }) => {
  if (!shop) return <div>No shop data available</div>;

  // Handle locations data safely
  const getLocations = () => {
    if (!shop.locations) return [];
    
    if (Array.isArray(shop.locations)) {
      return shop.locations;
    }
    
    if (typeof shop.locations === 'string') {
      try {
        return JSON.parse(shop.locations);
      } catch (e) {
        console.error('Error parsing locations:', e);
        return shop.locations.split(',') || [];
      }
    }
    
    return [];
  };

  // Handle shop images data safely
  const getShopImages = () => {
    if (!shop.shopImage) return [];
    
    if (Array.isArray(shop.shopImage)) {
      return shop.shopImage;
    }
    
    if (typeof shop.shopImage === 'string') {
      try {
        return JSON.parse(shop.shopImage);
      } catch (e) {
        console.error('Error parsing shop images:', e);
        return [shop.shopImage];
      }
    }
    
    return [];
  };

  const locations = getLocations();
  const shopImages = getShopImages();

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        {shopImages.length > 0 ? (
          <img
            src={`http://localhost:8000/storage/${shopImages[0]}`}
            alt={shop.shopName}
            className="w-32 h-32 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{shop.shopName}</h3>
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
              <span className="text-gray-700">{shop.shopAddress}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">No Number Yet</span>
            </div>
          </div>
        </div>
      </div>

      {locations.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Related Locations
          </h4>
          <div className="flex flex-wrap gap-2">
            {locations.map((location, index) => (
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