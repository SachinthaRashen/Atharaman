import React from 'react';
import { MapPin, Globe } from 'lucide-react';

const LocationView = ({ location }) => {
  if (!location) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={location.mainImage}
          alt={location.name}
          className="w-48 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{location.name}</h3>
          <p className="text-gray-600 mb-4">{location.shortDescription}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Globe className="w-4 h-4 mr-1" />
            <span>{location.province} Province</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
        <p className="text-gray-700 leading-relaxed">{location.longDescription}</p>
      </div>

      {location.coordinates && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Location Coordinates
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Latitude:</span>
                <p className="text-gray-900">{location.coordinates.lat}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Longitude:</span>
                <p className="text-gray-900">{location.coordinates.lng}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationView;