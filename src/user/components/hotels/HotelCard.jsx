import React from 'react';
import { MapPin, Star, DollarSign, Phone } from 'lucide-react';
import { getHotelImageUrls, getMainHotelImage } from '../../../helpers/ImageHelpers';

export const HotelCard = ({ hotel, onClick }) => {
  const imageUrls = getHotelImageUrls(hotel);
  const mainImage = getMainHotelImage(hotel);

  return (
    <div 
      onClick={() => onClick(hotel)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Hotel Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={mainImage}
          alt={hotel.hotelName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/default-hotel.jpg";
          }}
        />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="size-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{hotel.rating}</span>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.hotelName}</h3>
        {/* <p className="text-gray-600 mb-3 line-clamp-2">{hotel.description}</p>
         */}
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <MapPin className="size-4" />
          <span>{hotel.locations}</span>
        </div>

        {/* Contact */}
        {hotel.contactNumber && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
            <Phone className="size-4" />
            <span>{hotel.contactNumber}</span>
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mt-2">
          {hotel.amenities?.slice(0, 3).map((amenity, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities?.length > 3 && (
            <span className="text-xs text-gray-500">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price */}
        {hotel.price && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-3">
            <DollarSign className="size-4 text-emerald-600" />
            <span>Starting from ${hotel.price} per night</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;