import React from 'react';
import { MapPin, Star, DollarSign, Fuel, UserCheck } from 'lucide-react';
import { getVehicleImageUrls, getMainVehicleImage } from '../../../helpers/ImageHelpers';

export const VehicleCard = ({ vehicle, onClick }) => {
  const imageUrls = getVehicleImageUrls(vehicle);
  const mainImage = getMainVehicleImage(vehicle);

  return (
    <div
      onClick={() => onClick(vehicle)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage}
          alt={vehicle.vehicleName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/default-vehicle.jpg";
          }}
        />
        {vehicle?.rating && (
          <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="size-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{vehicle.rating}</span>
          </div>
        )}
        {vehicle?.pricePerDay && (
          <div className="absolute bottom-2 right-2 bg-emerald-600 text-white rounded-lg px-2 py-1">
            <div className="flex items-center gap-1">
              <DollarSign className="size-4" />
              <span className="text-sm font-medium">{vehicle.pricePerDay}/day</span>
            </div>
          </div>
        )}
        {vehicle?.withDriver && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white rounded-lg px-2 py-1">
            <div className="flex items-center gap-1">
              <UserCheck className="size-4" />
              <span className="text-xs">Driver Inc.</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {vehicle?.vehicleName || "Unnamed Vehicle"}
          </h3>
          {vehicle?.vehicleType && (
            <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {vehicle.vehicleType}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-3 line-clamp-2">
          {vehicle?.description || "No description available."}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <MapPin className="size-4" />
            <span>{vehicle?.locations?.join(", ") || "Location N/A"}</span>
          </div>
          {vehicle?.mileagePerDay && (
            <div className="flex items-center gap-1">
              <Fuel className="size-4" />
              <span>{vehicle.mileagePerDay}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-500">
          Owner: {vehicle?.ownerName || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
