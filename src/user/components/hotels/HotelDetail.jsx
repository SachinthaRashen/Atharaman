import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, DollarSign, User, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

export const HotelDetail = ({ hotel, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img 
              src={hotel.images[currentImageIndex]} 
              alt={hotel.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {hotel.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white/90 rounded-full p-2 transition-all"
                >
                  <ChevronLeft className="size-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white/90 rounded-full p-2 transition-all"
                >
                  <ChevronRight className="size-5 text-gray-700" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {hotel.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`size-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            <button
              onClick={onBack}
              className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
            >
              <ArrowLeft className="size-5 text-gray-700" />
            </button>
            
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Star className="size-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-lg">{hotel.rating}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
              {hotel.pricePerNight && (
                <div className="text-right">
                  <div className="flex items-center text-2xl font-bold text-emerald-600">
                    <DollarSign className="size-6" />
                    <span>{hotel.pricePerNight}</span>
                  </div>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="size-5 text-emerald-600" />
              <span>{hotel.location}</span>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {(hotel.ownerName || hotel.ownerContact) && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Owner Information</h2>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {hotel.ownerName && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="size-5 text-emerald-600" />
                        <span>{hotel.ownerName}</span>
                      </div>
                    )}
                    {hotel.ownerContact && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="size-5 text-emerald-600" />
                        <a href={`mailto:${hotel.ownerContact}`} className="hover:text-emerald-600 transition-colors">
                          {hotel.ownerContact}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t">
              <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HotelDetail;