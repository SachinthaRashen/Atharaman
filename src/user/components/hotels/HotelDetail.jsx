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
import ReviewSection from '../ReviewSection';

const HotelDetail = ({ hotel, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    if (hotel?.hotel_owner_id) {
      fetch(`http://localhost:8000/api/hotelOwner/${hotel.hotel_owner_id}`)
        .then((res) => res.json())
        .then((data) => setOwner(data))
        .catch((error) => console.error('Error fetching hotel owner:', error));
    }
  }, [hotel?.hotel_owner_id]);

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

  return (
    <div className="min-h-dvh bg-gray-50 pt-16">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">

          {/* Images with navigation */}
          <div className="relative h-64 md:h-80">
            {images.length > 0 ? (
              <img 
                src={images[currentImageIndex]} 
                alt={hotel.hotelName || 'Hotel'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image Available
              </div>
            )}

            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white rounded-full p-2">
                  <ChevronLeft className="size-5 text-gray-700" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white rounded-full p-2">
                  <ChevronRight className="size-5 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`size-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}

            <button onClick={onBack} className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2">
              <ArrowLeft className="size-5 text-gray-700" />
            </button>

            {hotel.rating && (
              <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-lg">{hotel.rating}</span>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-start">
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

            {hotel.locations && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="size-5 text-emerald-600" />
                <span>{hotel.locations}</span>
              </div>
            )}

            {hotel.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </div>
            )}

            {hotel.amenities?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {hotel.amenities.map((amenity, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ Owner Info uses fetched owner if available */}
            {owner && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Owner Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  {owner.name && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="size-5 text-emerald-600" />
                      <span>{owner.name}</span>
                    </div>
                  )}
                  {owner.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="size-5 text-emerald-600" />
                      <a href={`tel:${owner.phone}`} className="hover:text-emerald-600 transition-colors">
                        {owner.phone}
                      </a>
                    </div>
                  )}
                  {owner.whatsapp && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaWhatsapp className="size-5 text-emerald-600" />
                      <span>{owner.whatsapp}</span>
                    </div>
                  )}
                  {owner.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="size-5 text-emerald-600" />
                      <a href={`mailto:${owner.email}`} className="hover:text-emerald-600 transition-colors">
                        {owner.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="pt-6 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
              <ReviewSection entityType="hotel" entityId={hotel.id} />
            </div>

            {/* Book Now */}
            <div className="pt-6 border-t">
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
