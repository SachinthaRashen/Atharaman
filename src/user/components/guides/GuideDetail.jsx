import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Mail, Phone, PhoneCallIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Navbar from '../Navbar';
import ReviewSection from '../ReviewSection';
import { getReviewsByEntity } from '../../../services/api';

const GuideDetail = ({ guide, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);

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
    const fetchGuideReviews = async () => {
      if (guide?.id) {
        try {
          setReviewsLoading(true);
          const response = await getReviewsByEntity('guide', guide.id);
          setReviews(response.data);
          
          if (response.data.length > 0) {
            const totalRating = response.data.reduce((sum, review) => sum + review.rating, 0);
            setAverageRating(totalRating / response.data.length);
          }
        } catch (error) {
          console.error('Error fetching guide reviews:', error);
        } finally {
          setReviewsLoading(false);
        }
      }
    };

    fetchGuideReviews();
  }, [guide?.id]);

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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Guide Image + Back Button */}
          <div className="relative h-64 md:h-80">
            <img 
              src={guide?.guideImage ? `http://localhost:8000/${guide.guideImage}` : "/default.jpg"} 
              alt={guide?.guideName || "Guide"}
              className="w-full h-full object-cover"
            />
            
            <button
              onClick={onBack}
              className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Rating */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-lg">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'}
                </span>
                <span className="text-sm text-gray-500">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
          </div>

          {/* Guide Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {guide?.guideName || "Unnamed Guide"}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {guide?.locations && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>{guide.locations.join(", ")}</span>
                </div>
              )}

              {guide?.personalNumber && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span>{guide.personalNumber}</span>
                </div>
              )}

              {guide?.businessMail && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <a 
                    href={`mailto:${guide.businessMail}`} 
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {guide.businessMail}
                  </a>
                </div>
              )}

              {guide?.whatsappNumber && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FaWhatsapp className="w-5 h-5 text-emerald-600" />
                  <span>{guide.whatsappNumber}</span>
                </div>
              )}
            </div>

            {/* About Section */}
            {guide?.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{guide.description}</p>
              </div>
            )}

            {/* Biography Section */}
            {guide?.bio && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Biography</h2>
                <p className="text-gray-600 leading-relaxed">{guide.bio}</p>
              </div>
            )}

            {/* Contact Button */}
            {guide?.contact && (
              <div className="mt-8 pt-6 border-t">
                <a 
                  href={`mailto:${guide.contact}`} 
                  className="w-full md:w-auto block text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Guide
                </a>
              </div>
            )}

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
                    <p className="text-gray-500">No reviews yet. Be the first to review this guide!</p>
                  </div>
                )
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