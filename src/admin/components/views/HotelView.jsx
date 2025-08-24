import React from 'react';
import { Building2, MapPin, Phone, MailIcon, MessageCircle } from 'lucide-react';

const HotelView = ({ hotel }) => {
  if (!hotel) return <div>No hotel data available</div>;

  // Handle locations data safely
  const getLocations = () => {
    if (!hotel.locations) return [];
    
    if (Array.isArray(hotel.locations)) {
      return hotel.locations;
    }
    
    if (typeof hotel.locations === 'string') {
      try {
        return JSON.parse(hotel.locations);
      } catch (e) {
        console.error('Error parsing locations:', e);
        return hotel.locations.split(',') || [];
      }
    }
    
    return [];
  };

  // Handle hotel images data safely
  const getHotelImages = () => {
    if (!hotel.hotelImage) return [];
    
    if (Array.isArray(hotel.hotelImage)) {
      return hotel.hotelImage;
    }
    
    if (typeof hotel.hotelImage === 'string') {
      try {
        return JSON.parse(hotel.hotelImage);
      } catch (e) {
        console.error('Error parsing hotel images:', e);
        return [hotel.hotelImage];
      }
    }
    
    return [];
  };

  const locations = getLocations();
  const hotelImages = getHotelImages();

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        {hotelImages.length > 0 ? (
          <img
            src={`http://localhost:8000/storage/${hotelImages[0]}`}
            alt={hotel.hotelName}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.hotelName}</h3>
          <p className="text-gray-600 mb-4">{hotel.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Building2 className="w-4 h-4 mr-1" />
            <span>Hotel</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Hotel Information</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-1" />
              <span className="text-gray-700">{hotel.hotelAddress}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{hotel.contactNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <MailIcon className="w-4 h-4 mr-3 text-gray-400 mt-1" />
              <span className="text-gray-700">{hotel.businessMail}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{hotel.whatsappNumber}</span>
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

export default HotelView;