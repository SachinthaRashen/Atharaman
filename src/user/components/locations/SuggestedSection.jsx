import React, { useState, useEffect } from 'react';
import { Star, MapPin, User, ShoppingBag, Car, Building, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const typeIcons = {
  guide: User,
  shop: ShoppingBag,
  vehicle: Car,
  hotel: Building
};

const typeColors = {
  guide: 'from-emerald-500 to-teal-600',
  shop: 'from-purple-500 to-indigo-600',
  vehicle: 'from-orange-500 to-red-600',
  hotel: 'from-pink-500 to-rose-600'
};

const typeTitles = {
  guide: 'All Guides',
  shop: 'All Shops',
  vehicle: 'All Vehicles',
  hotel: 'All Hotels'
};

export const SuggestedSection = ({ title, items, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const Icon = typeIcons[type];
  const colorGradient = typeColors[type];
  const seeAllTitle = typeTitles[type];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, items.length - 3);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    const maxIndex = Math.max(0, items.length - 3);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    const maxIndex = Math.max(0, items.length - 3);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setIsAutoPlaying(false);
  };

  const visibleItems = showMore ? items : items.slice(currentIndex, currentIndex + 3);

  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 bg-gradient-to-r ${colorGradient} rounded-xl text-white`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>

        <div className="flex items-center space-x-3">
          {/* See More/Less Button */}
          <button
            onClick={toggleShowMore}
            className={`flex items-center space-x-2 bg-gradient-to-r ${colorGradient} text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
          >
            <Eye className="w-4 h-4" />
            <span>{showMore ? 'Show Less' : 'See More'}</span>
          </button>

          {/* See All Button */}
          <button className="flex items-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
            <span>{seeAllTitle}</span>
          </button>

          {/* Navigation buttons (only show when not showing all) */}
          {!showMore && items.length > 3 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`grid gap-6 transition-all duration-500 ${
        showMore 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium text-gray-800">{item.rating}</span>
              </div>
            </div>

            <div className="p-5">
              <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h4>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">Nearby</span>
                </div>
              </div>
            </div>

            <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${colorGradient} opacity-20 transition-all duration-300`}></div>
          </div>
        ))}
      </div>

      {/* Slide indicators (only show when not showing all) */}
      {!showMore && items.length > 3 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.max(1, items.length - 2) }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? `bg-gradient-to-r ${colorGradient} scale-125`
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};