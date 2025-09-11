import React from 'react';
import { MapPin, Star, Calendar } from 'lucide-react';
import styles from '../../styles/LocationsPage.module.css';

const LocationCard = ({ location, rating, onClick, animationDelay = 0 }) => {
  // Function to determine category based on location name or description
  const getCategory = () => {
    const name = location.locationName?.toLowerCase() || '';
    const description = location.shortDescription?.toLowerCase() || '';
    
    if (name.includes('mountain') || description.includes('mountain')) return 'mountain';
    if (name.includes('beach') || description.includes('beach')) return 'beach';
    if (name.includes('forest') || description.includes('forest')) return 'forest';
    if (name.includes('desert') || description.includes('desert')) return 'desert';
    if (name.includes('lake') || description.includes('lake')) return 'lake';
    
    return 'other';
  };

  const category = getCategory();
  
  // Get first image or placeholder
  const imageUrl = location.locationImage && location.locationImage.length > 0 
    ? `http://localhost:8000/storage/${location.locationImage[0]}`
    : '/placeholder-image.jpg';

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${styles.locationCard} ${styles.animateSlideInCard}`}
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={location.locationName || "Location"}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${styles.cardImage}`}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 ${styles.categoryBadge}`}>
          {category}
        </div>

        {/* Rating Badge - Only show if rating exists */}
        {rating > 0 && (
          <div className="absolute top-4 right-4 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full flex items-center">
            <Star size={14} className="text-yellow-400 fill-current mr-1" />
            <span className="text-xs text-white font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold text-gray-900 mb-2 line-clamp-1 ${styles.cardTitle}`}>
          {location.locationName}
        </h3>
        
        <div className={`flex items-center text-gray-600 mb-3 ${styles.locationInfo}`}>
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location.province}</span>
        </div>

        <p className={`text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed ${styles.description}`}>
          {location.shortDescription}
        </p>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 ${styles.hoverOverlay}`}></div>
    </div>
  );
};

export default LocationCard;