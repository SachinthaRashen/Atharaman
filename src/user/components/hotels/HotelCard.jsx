import React from 'react';
import { MapPin, Star, DollarSign } from 'lucide-react';

export const HotelCard = ({ hotel, onClick }) => {
  return (
    <div 
      onClick={() => onClick(hotel)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="size-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{hotel.rating}</span>
        </div>
        {hotel.pricePerNight && (
          <div className="absolute bottom-2 right-2 bg-emerald-600 text-white rounded-lg px-2 py-1">
            <div className="flex items-center gap-1">
              <DollarSign className="size-4" />
              <span className="text-sm font-medium">{hotel.pricePerNight}/night</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{hotel.description}</p>
        
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="size-4" />
          <span>{hotel.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;