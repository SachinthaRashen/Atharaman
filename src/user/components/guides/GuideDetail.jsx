import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Mail, Phone, ChevronLeft, ChevronRight, IdCardIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import styles from '../../styles/DetailPages.module.css';
import Navbar from '../Navbar';
import ReviewSection from '../ReviewSection';
import { getLocations } from '../../../services/api';
import { LocationCard } from '../locations/LocationCard';
import LocationDetail from '../locations/LocationDetail';

const GuideDetail = ({ guide, onBack }) => {
  const reviews = guide.reviews || guide.reviews?.data || [];
  const averageRating = guide.reviews_avg_rating ? parseFloat(guide.reviews_avg_rating) : 0;
  const reviewCount = guide.reviews_count || reviews.length;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  // Normalize image data
  const getImages = () => {
    if (guide.images && guide.images.length > 0) {
      // Images array with image_path
      return guide.images.map(img => img.image_path);
    } else {
      return [];
    }
  };

  const images = getImages();

  useEffect(() => {
    const fetchGuideLocations = async () => {
      if (guide?.locations && guide.locations.length > 0) {
        try {
          setLoading(true);
          // Use existing index endpoint and filter client-side
          const response = await getLocations();
          const allLocations = response.data;
          // Filter locations based on guide's locations array
          const guideLocations = allLocations.filter(location => 
            guide.locations.includes(location.locationName)
          );
          setLocations(guideLocations);
        } catch (error) {
          console.error('Error fetching locations:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchGuideLocations();
  }, [guide]);

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
    const numericRating = typeof rating === 'number' ? rating : parseFloat(rating) || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < Math.round(numericRating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/guides');
    }
  };

  const nextImage = () => {
    if (guide?.guideImage?.length) {
      setCurrentImageIndex((prev) => 
        prev === guide.guideImage.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (guide?.guideImage?.length) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? guide.guideImage.length - 1 : prev - 1
      );
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleLocationBack = () => {
    setSelectedLocation(null);
  };

  if (selectedLocation) {
    return <LocationDetail location={selectedLocation} onBack={handleLocationBack} />;
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guide details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 pt-16 ${styles.entityDetails}`}>
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-128 overflow-hidden">
            <div className="relative w-full h-full">
              {images.length > 0 ? (
                <img
                  src={`http://localhost:8000/storage/${images[currentImageIndex]}`}
                  alt={guide.guideName}
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
              {images.length > 1 && (
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
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
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

            {/* Guide Title Overlay */}
            <div className={`absolute bottom-8 left-8 text-white ${styles.animateSlideInUp}`}>
              <h1 className="text-4xl font-bold mb-2">{guide.guideName}</h1>
            </div>
          </div>
          
          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${styles.animateSlideInLeft}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Guide</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {guide.description}
                  </p>
                  
                  {/* Languages */}
                  {guide.languages && guide.languages.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">Languages</h2>
                      <div className="flex flex-wrap gap-2">
                        {guide.languages.map((language, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Locations */}
                  {guide.locations && guide.locations.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">Specialized Locations</h2>
                      <div className="flex flex-wrap gap-2">
                        {guide.locations.map((location, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Info */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 ${styles.animateSlideInRight} ${styles.animateStagger1}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    {guide.guideNic && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <IdCardIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span>{guide.guideNic}</span>
                      </div>
                    )}
                    {guide.personalNumber && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span>{guide.personalNumber}</span>
                      </div>
                    )}
                    {guide.businessMail && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <a 
                          href={`mailto:${guide.businessMail}`} 
                          className="hover:text-emerald-600 transition-colors break-all"
                        >
                          {guide.businessMail}
                        </a>
                      </div>
                    )}
                    {guide.whatsappNumber && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaWhatsapp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span>{guide.whatsappNumber}</span>
                      </div>
                    )}
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
                          <span className="text-sm text-gray-600 ml-1">({averageRating ? averageRating.toFixed(1) : '0.0'})</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            {(guide.businessMail || guide.personalNumber) && (
              <div className="mt-8 pt-5 border-t mb-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact This Guide</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  {guide.businessMail && (
                    <a 
                      href={`mailto:${guide.businessMail}`} 
                      className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Send Email
                    </a>
                  )}
                  {guide.personalNumber && (
                    <a 
                      href={`tel:${guide.personalNumber}`} 
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Call Now
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Related Locations Section */}
            <div className="mb-5">
              <div className="pt-5 border-t">
                <h2 className="text-2xl font-bold text-gray-900 mb-5">Specialized Locations</h2>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : locations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sort locations by rating (highest first) */}
                    {locations
                      .sort((a, b) => {
                        const ratingA = a.reviews_avg_rating || 0;
                        const ratingB = b.reviews_avg_rating || 0;
                        return ratingB - ratingA;
                      })
                      .map(location => (
                        <LocationCard
                          key={location.id}
                          location={location}
                          rating={location.reviews_avg_rating || 0}
                          reviewCount={location.reviews_count || 0}
                          // Make location cards read-only (non-clickable)
                          isClickable={false}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No locations available for this guide.</p>
                    {guide.locations && guide.locations.length > 0 && (
                      <p className="text-sm text-gray-400 mt-2">
                        The guide specializes in: {guide.locations.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 pt-5 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              
              {/* Reviews Summary */}
              {reviewCount > 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-emerald-600">
                        {averageRating ? averageRating.toFixed(1) : '0.0'}
                      </div>
                      <div className="flex justify-center mt-1">
                        {renderStars(Math.round(averageRating))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {reviewCount} review{reviewCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter(review => review.rating === star).length;
                        const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
                        
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
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                  <p className="text-gray-500">No reviews yet. Be the first to review this guide!</p>
                </div>
              )}

              {/* ReviewSection Component */}
              <ReviewSection entityType="guide" entityId={guide?.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuideDetail;