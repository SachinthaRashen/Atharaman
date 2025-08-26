import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  DollarSign, 
  User, 
  Mail, 
  ChevronLeft, 
  ChevronRight, 
  Phone
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

export const HotelDetail = ({ hotel, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    if (hotel && hotel.hotel_owner_id) {
      fetch(`http://localhost:8000/api/hotelOwner/${hotel.hotel_owner_id}`)
        .then((res) => res.json())
        .then((data) => setOwner(data))
        .catch((error) => console.error('Error fetching hotel owner:', error));
    }
  }, [hotel]);

  if (!hotel) return <div className="p-8 text-center">No hotel details available</div>;

  const images = hotel.images || [];

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64; // Match your navbar height
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    };

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Hotel Images */}
          <div className="relative h-64 md:h-80">
            {images.length > 0 ? (
              <img 
                src={images[currentImageIndex]} 
                alt={hotel.hotelName || 'Hotel'} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image Available
              </div>
            )}

            {images.length > 1 && (
              <>
                {/* Prev Button */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white/90 rounded-full p-2 transition-all"
                >
                  <ChevronLeft className="size-5 text-gray-700" />
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white/90 rounded-full p-2 transition-all"
                >
                  <ChevronRight className="size-5 text-gray-700" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`size-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Back Button */}
            <button
              onClick={onBack}
              className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
            >
              <ArrowLeft className="size-5 text-gray-700" />
            </button>

            {/* Rating */}
            {hotel.rating && (
              <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-lg">{hotel.rating}</span>
                </div>
              </div>
            )}
          </div>

          {/* Hotel Details */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{hotel.hotelName}</h1>
              {hotel.pricePerNight && (
                <div className="text-right">
                  <div className="flex items-center text-2xl font-bold text-emerald-600">
                    <DollarSign className="size-6" />
                    <span>{hotel.pricePerNight}</span>
                  </div>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
              )}
            </div>

            {/* Location */}
            {hotel.locations && (
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="size-5 text-emerald-600" />
                <span>{hotel.locations}</span>
              </div>
            )}

            {/* About */}
            {hotel.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </div>
            )}

            {/* Amenities */}
            {hotel.amenities?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Info */}
            {(hotel.hotelOwnerName || hotel.contactNumber || hotel.whatsappNumber || hotel.businessMail) && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Owner Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  {hotel.hotelOwnerName && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="size-5 text-emerald-600" />
                      <span>{hotel.hotelOwnerName}</span>
                    </div>
                  )}
                  {hotel.contactNumber && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="size-5 text-emerald-600" />
                      <a href={`mailto:${hotel.contactNumber}`} className="hover:text-emerald-600 transition-colors">
                        {hotel.contactNumber}
                      </a>
                    </div>
                  )}
                  {hotel.whatsappNumber && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaWhatsapp className="size-5 text-emerald-600" />
                      <span>{hotel.whatsappNumber}</span>
                    </div>
                  )}
                  {hotel.businessMail && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="size-5 text-emerald-600" />
                      <a href={`mailto:${hotel.businessMail}`} className="hover:text-emerald-600 transition-colors">
                        {hotel.businessMail}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Book Now */}
            <div className="mt-8 pt-6 border-t">
              <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HotelDetail;
