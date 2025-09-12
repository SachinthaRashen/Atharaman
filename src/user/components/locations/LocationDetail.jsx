import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight, Star, Mountain} from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import styles from '../../styles/LocationDetails.module.css';
import Navbar from '../Navbar';
import {
  getReviewsByEntity,
  getRelatedData
} from '../../../services/api';
import ReviewSection from '../ReviewSection';
import { GuideCard } from '../guides/GuideCard';
import GuideDetail from '../guides/GuideDetail';
import { ShopCard } from '../shops/ShopCard';
import ShopDetail from '../shops/ShopDetail';
import { HotelCard } from '../hotels/HotelCard';
import HotelDetail from '../hotels/HotelDetail';
import { VehicleCard } from '../vehicles/VehicleCard';
import VehicleDetail from '../vehicles/VehicleDetail';

const LocationDetail = ({ location, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guides, setGuides] = useState([]);
  const [shops, setShops] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationReviews = async () => {
      if (location?.id) {
        try {
          setReviewsLoading(true);
          const response = await getReviewsByEntity('location', location.id);
          setReviews(response.data);

          if (response.data.length > 0) {
            const totalRating = response.data.reduce((sum, review) => sum + review.rating, 0);
            setAverageRating(totalRating / response.data.length);
          }
        } catch (error) {
          console.error('Error fetching location reviews:', error);
        } finally {
          setReviewsLoading(false);
        }
      }
    };

    fetchLocationReviews();
  }, [location]);

  // Fetch all related data in a single API call
  useEffect(() => {
    const fetchRelatedData = async () => {
      if (location?.id) {
        try {
          setLoading(true);
          const response = await getRelatedData(location.id);
          
          if (response.data.success) {
            setGuides(response.data.data.guides || []);
            setShops(response.data.data.shops || []);
            setHotels(response.data.data.hotels || []);
            setVehicles(response.data.data.vehicles || []);
          }
        } catch (error) {
          console.error('Error fetching related data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRelatedData();
  }, [location]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/locations');
    }
  };

  const nextImage = () => {
    if (location?.locationImage?.length) {
      setCurrentImageIndex((prev) => 
        prev === location.locationImage.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (location?.locationImage?.length) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? location.locationImage.length - 1 : prev - 1
      );
    }
  };

  const handleGuideClick = (guide) => {
    setSelectedGuide(guide);
  };

  const handleGuideBack = () => {
    setSelectedGuide(null);
  };

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const handleShopBack = () => {
    setSelectedShop(null);
  };

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleHotelBack = () => {
    setSelectedHotel(null);
  };

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleVehicleBack = () => {
    setSelectedVehicle(null);
  };

  if (selectedGuide) {
    return <GuideDetail guide={selectedGuide} onBack={handleGuideBack} />;
  }

  if (selectedShop) {
    return <ShopDetail shop={selectedShop} onBack={handleShopBack} />;
  }

  if (selectedHotel) {
    return <HotelDetail hotel={selectedHotel} onBack={handleHotelBack} />;
  }

  if (selectedVehicle) {
    return <VehicleDetail vehicle={selectedVehicle} onBack={handleVehicleBack} />;
  }

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading location details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 pt-16 ${styles.locationDetails}`}>
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <div className="relative w-full h-full">
              {location.locationImage && location.locationImage.length > 0 ? (
                <img
                  src={`http://localhost:8000/storage/${location.locationImage[currentImageIndex]}`}
                  alt={location.locationName}
                  className={`w-full h-full object-cover transition-all duration-500 ${styles.heroImage}`}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Image Navigation */}
              {location.locationImage && location.locationImage.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 hover:bg-white/30 transition-all ${styles.imageNavButton}`}
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 hover:bg-white/30 transition-all ${styles.imageNavButton}`}
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {location.locationImage && location.locationImage.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {location.locationImage.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Location Title Overlay */}
            <div className={`absolute bottom-8 left-8 text-white ${styles.animateSlideInUp}`}>
              <h1 className="text-4xl font-bold mb-2">{location.locationName}</h1>
              <div className="flex items-center space-x-2 text-lg">
                <Mountain size={20} />
                <span>{location.locationType}</span>
              </div>
              <div className="flex items-center space-x-2 text-lg">
                <MapPin size={20} />
                <span>{location.province}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${styles.animateSlideInLeft}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Location</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {location.shortDescription}
                  </p>
                  <div className="prose prose-lg text-gray-700">
                    <p>{location.longDescription}</p>
                  </div>
                </div>

                {/* Map Section */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${styles.animateSlideInLeft} ${styles.animateStagger1}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Map</h2>
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive map will be integrated here</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Coordinates: {location.latitude}, {location.longitude}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guides Section */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${styles.animateSlideInLeft} ${styles.animateStagger2}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Guides</h2>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : guides.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {guides.map(guide => (
                        <GuideCard 
                          key={guide.id} 
                          guide={guide} 
                          onClick={handleGuideClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No guides available for this location.</p>
                  )}
                </div>

                {/* Hotels Section */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${styles.animateSlideInLeft} ${styles.animateStagger2}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Shops</h2>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : shops.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {shops.map(shop => (
                        <ShopCard
                          key={shop.id}
                          shop={shop}
                          onClick={handleShopClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No shops nearby for this location.</p>
                  )}
                </div>

                {/* Hotels Section */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${styles.animateSlideInLeft} ${styles.animateStagger2}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Hotels</h2>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : hotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hotels.map(hotel => (
                        <HotelCard
                          key={hotel.id}
                          hotel={hotel}
                          onClick={handleHotelClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No hotels nearby for this location.</p>
                  )}
                </div>

                {/* Vehicles Section */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${styles.animateSlideInLeft} ${styles.animateStagger2}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Vehicles</h2>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : vehicles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {vehicles.map(vehicle => (
                        <VehicleCard 
                          key={vehicle.id} 
                          vehicle={vehicle} 
                          onClick={handleVehicleClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No vehicles available for this location.</p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Weather Widget */}
                <div className={`${styles.animateSlideInRight}`}>
                  <WeatherWidget location={location} />
                </div>

                {/* Quick Info */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 ${styles.animateSlideInRight} ${styles.animateStagger1}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium capitalize">{location.locationType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Province</span>
                      <span className="font-medium capitalize">{location.province}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Latitude</span>
                      <span className="font-medium">{location.latitude}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Longitude</span>
                      <span className="font-medium">{location.longitude}</span>
                    </div>
                    {reviews.length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">({averageRating.toFixed(1)})</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              
              {/* Reviews Summary */}
              {reviews.length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-emerald-600">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="flex justify-center mt-1">
                        {renderStars(Math.round(averageRating))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter(review => review.rating === star).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 w-4">{star}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8 text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                !reviewsLoading && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                    <p className="text-gray-500">No reviews yet. Be the first to review this location!</p>
                  </div>
                )
              )}

              {/* ReviewSection Component */}
              <ReviewSection entityType="location" entityId={location?.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationDetail;