import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, DollarSign } from 'lucide-react';
import VehicleDetail from './vehicles/VehicleDetail';
import ShopDetail from './shops/ShopDetail';
import HotelDetail from './hotels/HotelDetail';
import GuideDetail from './guides/GuideDetail';

const ProductSection = ({ id, title, data, type, onSeeMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailType, setDetailType] = useState(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + 3 >= data.length ? 0 : prevIndex + 3
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= data.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? Math.max(0, Math.floor((data.length - 1) / 3) * 3) : prevIndex - 3
    );
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setDetailType(type);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setDetailType(null);
  };

  const handleSeeMore = () => {
    if (onSeeMore) {
      // If a callback is provided, use it
      onSeeMore(type);
    } else {
      // Default behavior: scroll to the dedicated section
      const sectionId = `${type}-section`;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Render appropriate detail component based on type
  if (selectedItem) {
    switch (detailType) {
      case 'vehicle':
        return <VehicleDetail vehicle={selectedItem} onBack={handleBack} />;
      case 'shop':
        return <ShopDetail shop={selectedItem} onBack={handleBack} />;
      case 'hotel':
        return <HotelDetail hotel={selectedItem} onBack={handleBack} />;
      case 'guide':
        return <GuideDetail guide={selectedItem} onBack={handleBack} />;
      default:
        return null;
    }
  }

  const renderCard = (item, index) => {
    const cardClass = "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in";
    
    switch (type) {
      case 'location':
        return (
          <div key={item.id} className={cardClass} style={{ animationDelay: `${index * 100}ms` }}>
            <img 
              src={item.image} 
              alt={item.locationName} 
              className="w-full h-48 object-cover" 
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.locationName}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="size-4 mr-2" />
                <span>{item.province}</span>
              </div>
            </div>
          </div>
        );

      case 'guide':
        return (
          <div key={item.id} className={cardClass} onClick={() => handleCardClick(item)} style={{ animationDelay: `${index * 100}ms` }}>
            <div className="relative overflow-hidden">
              <img 
                src={item.photo} 
                alt={item.guideName} 
                className="w-full h-48 object-cover" 
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.guideName}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="size-4 mr-2" />
                <span>{item.locations}</span>
              </div>
            </div>
          </div>
        );

      case 'shop':
        return (
          <div key={item.id} className={cardClass} onClick={() => handleCardClick(item)} style={{ animationDelay: `${index * 100}ms` }}>
            <div className="relative overflow-hidden">
              <img 
                src={item.logo} 
                alt={item.shopName} 
                className="w-full h-48 object-cover" 
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.shopName}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="size-4 mr-2" />
                <span>{item.locations}</span>
              </div>
            </div>
          </div>
        );

      case 'hotel':
        return (
          <div key={item.id} className={cardClass} onClick={() => handleCardClick(item)} style={{ animationDelay: `${index * 100}ms` }}>
            <div className="relative overflow-hidden group">
              <img 
                src={item.image} 
                alt={item.hotelName} 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 animate-flip-in">{item.hotelName}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="size-4 mr-2" />
                <span>{item.locations}</span>
              </div>
            </div>
          </div>
        );

      case 'vehicle':
        return (
          <div key={item.id} className={cardClass} onClick={() => handleCardClick(item)} style={{ animationDelay: `${index * 100}ms` }}>
            <img 
              src={item.photo} 
              alt={item.vehicleName} 
              className="w-full h-48 object-cover" 
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.vehicleName}</h3>
              <p className="text-gray-600 mb-2">Owner: {item.vehicle_owner?.vehicleOwnerName}</p>
              <div className="flex items-center text-green-600 font-semibold">
                <DollarSign className="size-4 mr-1" />
                <span>${item.pricePerDay}/day</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (data.length === 0) return null;

  return (
    <section id={id} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="size-6 text-gray-600" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.slice(currentIndex, currentIndex + 3).map((item, index) => renderCard(item, index))}
          </div>
        </div>

        {/* See More Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleSeeMore}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
          >
            See More {title}
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(data.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`size-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index
                  ? 'bg-orange-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;