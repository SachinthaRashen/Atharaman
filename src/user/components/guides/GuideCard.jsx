import React from 'react';
import { MapPin, Star, Clock, Phone } from 'lucide-react';

export const GuideCard = ({ guide, onClick }) => {
  return (
    <div 
      onClick={() => onClick(guide)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={guide.guideImages} 
          alt={guide.guideName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="size-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{guide.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.guideName}</h3>
        {/* <p className="text-gray-600 mb-3 line-clamp-2">{guide.description}</p> */}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="size-4" />
            <span>{guide.locations}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="size-4" />
            <span>{guide.personalNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;