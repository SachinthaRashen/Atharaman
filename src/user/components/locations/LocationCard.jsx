import React from 'react';
import { MapPin, Star, Calendar } from 'lucide-react';
import styles from '../../styles/LocationsPage.module.css';

const LocationCard = ({ location, onClick, animationDelay = 0 }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${styles.locationCard} ${styles.animateSlideInCard}`}
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={location.image}
          alt={location.name}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${styles.cardImage}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 ${styles.categoryBadge}`}>
          {location.category}
        </div>

        {/* Rating Badge */}
        <div className={`absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 ${styles.ratingBadge}`}>
          <Star size={12} className="text-yellow-400 fill-current" />
          <span className="text-xs font-semibold text-gray-700">{location.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold text-gray-900 mb-2 line-clamp-1 ${styles.cardTitle}`}>
          {location.name}
        </h3>
        
        <div className={`flex items-center text-gray-600 mb-3 ${styles.locationInfo}`}>
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location.location}</span>
        </div>

        <p className={`text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed ${styles.description}`}>
          {location.shortDescription}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center text-gray-500 text-xs ${styles.bestTime}`}>
            <Calendar size={14} className="mr-1" />
            <span>{location.bestTime}</span>
          </div>
          
          <div className={`px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full ${styles.difficultyBadge}`}>
            {location.difficulty}
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 ${styles.hoverOverlay}`}></div>
    </div>
  );
};

export default LocationCard;