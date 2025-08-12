import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';

export const LocationCard = ({ location }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate(`/location/${location.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
    >
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <img
          src={location.mainImage}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium text-gray-800">{location.rating}</span>
        </div>
        
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {location.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {location.name}
          </h3>
          <ArrowRight className="w-5 h-5 text-gray-400 transform translate-x-0 group-hover:translate-x-1 group-hover:text-blue-500 transition-all duration-300" />
        </div>

        <div className="flex items-center space-x-2 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location.location}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {location.shortDescription}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-300"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
};