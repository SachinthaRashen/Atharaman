import React from 'react';
import { Star, Phone } from 'lucide-react';
import { getGuideImageUrls, getMainGuideImage } from '../../../helpers/ImageHelpers';
import { useNavigate } from 'react-router-dom';

export const GuideCard = ({ guide, rating, animationDelay = 0, isClickable = true }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (isClickable) {
      navigate(`/guides/${guide.id}`);
    }
  };

  const imageUrls = getGuideImageUrls(guide);
  const mainImage = getMainGuideImage(guide);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isClickable ? 'cursor-pointer' : 'cursor-default'
      }`}
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={mainImage}
          alt={guide.guideName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = "/default-guide.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

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
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {guide.guideName}
        </h3>

        <div className={"flex items-center text-gray-600 mb-3"}>
          <Phone size={16} className="mr-2 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{guide.personalNumber}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {guide.description}
        </p>
      </div>

      {/* Hover Effect Overlay - Only show if clickable */}
      {isClickable && (
        <div className={"absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"}></div>
      )}
    </div>
  );
};

export default GuideCard;