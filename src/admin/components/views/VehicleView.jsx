import React from 'react';
import { Car, MapPin, Phone, Users, DollarSign, TypeIcon, Clock, Fuel, ShipWheel } from 'lucide-react';

const VehicleView = ({ vehicle }) => {
  if (!vehicle) return <div>No vehicle data available</div>;

  // Handle locations data safely
  const getLocations = () => {
    if (!vehicle.locations) return [];
    
    if (Array.isArray(vehicle.locations)) {
      return vehicle.locations;
    }
    
    if (typeof vehicle.locations === 'string') {
      try {
        return JSON.parse(vehicle.locations);
      } catch (e) {
        console.error('Error parsing locations:', e);
        return vehicle.locations.split(',') || [];
      }
    }
    
    return [];
  };

  // Handle vehicle images data safely
  const getVehicleImages = () => {
    if (!vehicle.vehicleImage) return [];
    
    if (Array.isArray(vehicle.vehicleImage)) {
      return vehicle.vehicleImage;
    }
    
    if (typeof vehicle.vehicleImage === 'string') {
      try {
        return JSON.parse(vehicle.vehicleImage);
      } catch (e) {
        console.error('Error parsing vehicle images:', e);
        return [vehicle.vehicleImage];
      }
    }
    
    return [];
  };

  const locations = getLocations();
  const vehicleImages = getVehicleImages();

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        {vehicleImages.length > 0 ? (
          <img
            src={`http://localhost:8000/storage/${vehicleImages[0]}`}
            alt={vehicle.vehicleName}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.vehicleName}</h3>
          <p className="text-gray-600 mb-4">{vehicle.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Car className="w-4 h-4 mr-1" />
            <span>Vehicle</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Information</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <TypeIcon className="w-4 h-4 mr-3 text-gray-400 mt-1" />
              <span className="text-gray-700">{vehicle.vehicleType}</span>
            </div>
            <div className="flex items-center">
              <Car className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{vehicle.vehicleNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Per Day Rates</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">Rs. {vehicle.pricePerDay}/day</span>
            </div>
            <div>
              <Clock className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{vehicle.mileagePerDay}km/day</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Fuel className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{vehicle.fuelType}</span>
            </div>
            <div>
              <ShipWheel className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{vehicle.withDriver}</span>
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

export default VehicleView;