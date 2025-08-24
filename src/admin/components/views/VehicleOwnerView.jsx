import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, User } from 'lucide-react';

const VehicleOwnerView = ({ owner }) => {
  if (!owner) return <div>No vehicle owner data available</div>;

  // Handle locations data safely
  const getLocations = () => {
    if (!owner.locations) return [];
    
    if (Array.isArray(owner.locations)) {
      return owner.locations;
    }
    
    if (typeof owner.locations === 'string') {
      try {
        return JSON.parse(owner.locations);
      } catch (e) {
        console.error('Error parsing locations:', e);
        return owner.locations.split(',') || [];
      }
    }
    
    return [];
  };

  const locations = getLocations();

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={owner.image || 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'}
          alt={owner.vehicleOwnerName}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{owner.vehicleOwnerName}</h3>
          <p className="text-gray-600 mb-4">{owner.description}</p>
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
              <span className="text-gray-700">{owner.businessMail}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{owner.personalNumber}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{owner.whatsappNumber}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">NIC:</span>
              <p className="text-gray-900">{owner.vehicleOwnerNic}</p>
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

export default VehicleOwnerView;