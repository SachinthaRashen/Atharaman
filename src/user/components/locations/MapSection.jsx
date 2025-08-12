import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const MapSection = ({ coordinates, locationName }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Location</h3>
            <p className="text-green-100">{locationName}</p>
          </div>
        </div>
      </div>

      <div className="relative h-80 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <p className="text-gray-700 font-medium mb-2">Interactive Map Coming Soon!</p>
          <p className="text-gray-600 text-sm">Coordinates: {coordinates.lat}, {coordinates.lng}</p>
        </div>

        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <Navigation className="w-4 h-4" />
            <span className="text-sm">Get Directions</span>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium">
            View on Maps
          </button>
        </div>
      </div>
    </div>
  );
};