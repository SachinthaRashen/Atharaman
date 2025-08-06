import React from 'react';
import { Car, MapPin, Phone, Users, DollarSign } from 'lucide-react';

const VehicleView = ({ vehicle }) => {
  if (!vehicle) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={vehicle.mainImage || 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg'}
          alt={`${vehicle.vehicleType}`}
          className="w-48 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.vehicleType}</h3>
          <p className="text-gray-600 mb-4">{vehicle.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Car className="w-4 h-4 mr-1" />
            <span>Vehicle</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Details</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{vehicle.passengers} passengers</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{vehicle.contactNumber}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">Rs. {vehicle.pricePerDay}/day</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Mileage per day:</span>
              <p className="text-gray-900">{vehicle.mileagePerDay} km</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Driver options:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {vehicle.withDriver && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    With Driver
                  </span>
                )}
                {vehicle.withoutDriver && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    Without Driver
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {vehicle.relatedLocations && vehicle.relatedLocations.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Related Locations
          </h4>
          <div className="flex flex-wrap gap-2">
            {vehicle.relatedLocations.map((location, index) => (
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

export default VehicleView;