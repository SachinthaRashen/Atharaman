import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ChevronLeft, ChevronRight, Star, DollarSign } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import SuggestedServices from './SuggestedServices';
import { guides, shops, hotels, vehicles } from '../../data/travelData';
import styles from '../../styles/LocationDetails.module.css';
import Navbar from '../Navbar';
import { getReviewsByEntity } from '../../../services/api';
import ReviewSection from '../ReviewSection';


const LocationDetail = ({selectedLocation, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

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
  }, [location?.id]);

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

  // if (!location) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading location details...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => 
  //     prev === location.images.length - 1 ? 0 : prev + 1
  //   );
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex((prev) => 
  //     prev === 0 ? location.images.length - 1 : prev - 1
  //   );
  // };

  // Filter suggested services based on location
  const suggestedGuides = guides.filter(guide => 
    guide.location === selectedLocation.locationName
  ).slice(0, 3);

  const suggestedShops = shops.filter(shop => 
    shop.location === selectedLocation.locationName
  ).slice(0, 3);

  const suggestedHotels = hotels.filter(hotel => 
    hotel.location === selectedLocation.locationName
  ).slice(0, 3);

  const suggestedVehicles = vehicles.filter(vehicle => 
    vehicle.ownerName.includes(selectedLocation.locationName.split(',')[0])
  ).slice(0, 3);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 pt-16 ${styles.locationDetails}`}>
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src={selectedLocation.images[currentImageIndex]}
                alt={selectedLocation.locationName}
                className={`w-full h-full object-cover transition-all duration-500 ${styles.heroImage}`}
              />
              <button
                onClick={onBack}
                className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Image Navigation */}
              {selectedLocation.images.length > 1 && (
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
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedLocation.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Location Title Overlay */}
            <div className={`absolute bottom-8 left-8 text-white ${styles.animateSlideInUp}`}>
              <h1 className="text-4xl font-bold mb-2">{selectedLocation.name || "Location"}</h1>
              <div className="flex items-center space-x-2 text-lg">
                <MapPin size={20} />
                <span>{selectedLocation.province || "Unknown Location"}</span>
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
                    {selectedLocation.shortDescription}
                  </p>
                  <div className="prose prose-lg text-gray-700">
                    <p>{selectedLocation.longDescription}</p>
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
                        Coordinates: {selectedLocation.coordinates.lat}, {selectedLocation.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Weather Widget */}
                <div className={`${styles.animateSlideInRight}`}>
                  <WeatherWidget location={selectedLocation} />
                </div>

                {/* Quick Info */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 ${styles.animateSlideInRight} ${styles.animateStagger1}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium capitalize">{selectedLocation.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Best Time to Visit</span>
                      <span className="font-medium">{selectedLocation.bestTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Difficulty Level</span>
                      <span className="font-medium">{selectedLocation.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < location.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({selectedLocation.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Suggested Services */}
            <div className="mt-16">
              <SuggestedServices
                guides={suggestedGuides}
                shops={suggestedShops}
                hotels={suggestedHotels}
                vehicles={suggestedVehicles}
                locationName={selectedLocation.name}
              />
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
                  <ReviewSection entityType="location" entityId={selectedLocation?.id} />
                </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LocationDetail;