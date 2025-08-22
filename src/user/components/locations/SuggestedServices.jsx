import React from 'react';
import { Star, DollarSign, MapPin, User, Building, Car } from 'lucide-react';
import styles from '../../styles/SuggestedServices.module.css';

export const SuggestedServices = ({ guides, shops, hotels, vehicles, locationName }) => {
  const ServiceCard = ({ item, type, index }) => {
    const getIcon = () => {
      switch (type) {
        case 'guide': return <User size={20} />;
        case 'shop': return <Building size={20} />;
        case 'hotel': return <Building size={20} />;
        case 'vehicle': return <Car size={20} />;
        default: return null;
      }
    };

    const getTitle = () => {
      switch (type) {
        case 'guide': return item.name;
        case 'shop': return item.shopName;
        case 'hotel': return item.name;
        case 'vehicle': return item.vehicleName;
        default: return '';
      }
    };

    const getSubtitle = () => {
      switch (type) {
        case 'guide': return `Expert Guide`;
        case 'shop': return `Adventure Gear`;
        case 'hotel': return `Accommodation`;
        case 'vehicle': return `Owner: ${item.ownerName}`;
        default: return '';
      }
    };

    const getImage = () => {
      switch (type) {
        case 'guide': return item.photo;
        case 'shop': return item.logo;
        case 'hotel': return item.image;
        case 'vehicle': return item.photo;
        default: return '';
      }
    };

    return (
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${styles.serviceCard} ${styles.animateSlideInCard}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative overflow-hidden h-40">
          <img
            src={getImage()}
            alt={getTitle()}
            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${styles.cardImage}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Type Badge */}
          <div className={`absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 ${styles.typeBadge}`}>
            {getIcon()}
            <span className="capitalize">{type}</span>
          </div>

          {/* Rating Badge */}
          <div className={`absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 ${styles.ratingBadge}`}>
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-xs font-semibold text-gray-700">
              {type === 'vehicle' ? '4.8' : '4.9'}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h4 className={`font-semibold text-gray-900 mb-1 line-clamp-1 ${styles.cardTitle}`}>
            {getTitle()}
          </h4>
          <p className={`text-sm text-gray-600 mb-2 ${styles.cardSubtitle}`}>
            {getSubtitle()}
          </p>
          
          <div className="flex items-center justify-between">
            <div className={`flex items-center text-gray-500 text-xs ${styles.locationInfo}`}>
              <MapPin size={12} className="mr-1" />
              <span>{item.location}</span>
            </div>
            
            {type === 'vehicle' && (
              <div className={`flex items-center text-green-600 font-semibold text-sm ${styles.price}`}>
                <DollarSign size={14} className="mr-1" />
                <span>${item.pricePerDay}/day</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 ${styles.hoverOverlay}`}></div>
      </div>
    );
  };

  const ServiceSection = ({ title, items, type, icon }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className={`mb-12 ${styles.serviceSection}`}>
        <div className={`flex items-center space-x-3 mb-6 ${styles.animateSlideInLeft}`}>
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ServiceCard
              key={item.id}
              item={item}
              type={type}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.suggestedServices}`}>
      <div className={`text-center mb-12 ${styles.animateFadeInUp}`}>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Recommended Services Near {locationName}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover top-rated guides, shops, hotels, and vehicles to make your adventure perfect
        </p>
      </div>

      <ServiceSection
        title="Expert Guides"
        items={guides}
        type="guide"
        icon={<User size={20} />}
      />

      <ServiceSection
        title="Adventure Shops"
        items={shops}
        type="shop"
        icon={<Building size={20} />}
      />

      <ServiceSection
        title="Nearby Hotels"
        items={hotels}
        type="hotel"
        icon={<Building size={20} />}
      />

      <ServiceSection
        title="Available Vehicles"
        items={vehicles}
        type="vehicle"
        icon={<Car size={20} />}
      />
    </div>
  );
};

export default SuggestedServices;