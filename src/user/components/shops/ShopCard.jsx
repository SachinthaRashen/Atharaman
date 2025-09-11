import React from 'react';
import { MapPin, Star, Package } from 'lucide-react';
import { getShopImageUrls, getMainShopImage } from '../../../helpers/ImageHelpers';

export const ShopCard = ({ shop, onClick }) => {
  const imageUrls = getShopImageUrls(shop);
  const mainImage = getMainShopImage(shop);

  return (
    <div
      onClick={() => onClick(shop)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200">
        <img 
          src={mainImage}
          alt={shop.shopName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/default-shop.jpg";
          }}
        />
        <div className="flex items-center justify-center h-full">
          <Package className="size-16 text-emerald-600 group-hover:scale-110 transition-transform" />
        </div>
        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="size-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{shop.rating}</span>
        </div>
        {/* <div className="absolute bottom-2 right-2 bg-emerald-600 text-white rounded-lg px-2 py-1">
          <span className="text-sm font-medium">{shop.items.length} items</span>
        </div> */}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{shop.shopName}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{shop.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="size-4" />
            <span>{shop.locations.join(', ') }</span>
          </div>
          <span>by {shop.ownerName}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;