import React from 'react';
import { MapPin, Globe, Image as ImageIcon } from 'lucide-react';

const LocationView = ({ location }) => {
  if (!location) return null;

  // Combine main image with other images
  const allImages = [
    location.mainImage,
    ...(location.images || [])
  ].filter(img => img); // Filter out any null/undefined images

  return (
    <div className="space-y-6">
      {/* Location Header with Main Image */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-48 flex-shrink-0">
          {location.mainImage ? (
            <img
              src={location.mainImage}
              alt={location.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{location.name}</h3>
          <p className="text-gray-600 mb-4">{location.shortDescription}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Globe className="w-4 h-4 mr-1" />
            <span>{location.province} Province</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {allImages.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allImages.map((img, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                {img ? (
                  <img
                    src={img}
                    alt={`${location.name} - ${index === 0 ? 'Main' : `Image ${index}`}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
        <p className="text-gray-700 leading-relaxed">{location.longDescription}</p>
      </div>

      {/* Coordinates */}
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