// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, MapPin, Star, Camera } from 'lucide-react';
// import { locations, generateWeatherData, suggestedItems } from '../../data/locations';
// import { WeatherSection } from './WeatherSection';
// import { SuggestedSection } from './SuggestedSection';
// import { MapSection } from './MapSection';


// export const LocationDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const location = locations.find(loc => loc.id === id);
  
//   if (!location) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Location not found</h1>
//           <button 
//             onClick={() => navigate(-1)}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Back to Locations
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const weatherData = generateWeatherData(14);
//   const suggestions = suggestedItems[location.id] || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Hero Section */}
//       <div className="relative h-screen overflow-hidden">
//         <img
//           src={location.mainImage}
//           alt={location.name}
//           className="w-full h-full object-cover"
//         />
        
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20 group"
//         >
//           <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
//         </button>

//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
//           <div className="container mx-auto max-w-4xl">
//             <div className="flex items-center space-x-4 mb-6">
//               <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
//                 {location.category}
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                 <span className="font-medium">{location.rating}</span>
//               </div>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//               {location.name}
//             </h1>
            
//             <div className="flex items-center space-x-3 text-xl mb-6">
//               <MapPin className="w-6 h-6" />
//               <span>{location.location}</span>
//             </div>
            
//             <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
//               {location.shortDescription}
//             </p>
//           </div>
//         </div>

//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="container mx-auto px-4 py-16">
//         {/* Description Section */}
//         <div className="mb-16">
//           <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
//             <div className="flex items-center space-x-3 mb-8">
//               <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
//                 <Camera className="w-6 h-6" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-800">About This Location</h2>
//             </div>
            
//             <p className="text-lg text-gray-700 leading-relaxed mb-8">
//               {location.longDescription}
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {location.images.map((image, index) => (
//                 <div
//                   key={index}
//                   className="relative overflow-hidden rounded-2xl shadow-lg group"
//                 >
//                   <img
//                     src={image}
//                     alt={`${location.name} ${index + 1}`}
//                     className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Weather and Map Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
//           <WeatherSection weatherData={weatherData} />
//           <MapSection coordinates={location.coordinates} locationName={location.name} />
//         </div>

//         {/* Suggested Sections */}
//         <div className="space-y-16">
//           <SuggestedSection
//             title="Recommended Guides"
//             items={suggestions.filter(item => item.type === 'guide')}
//             type="guide"
//           />
          
//           <SuggestedSection
//             title="Nearby Shops"
//             items={suggestions.filter(item => item.type === 'shop')}
//             type="shop"
//           />
          
//           <SuggestedSection
//             title="Vehicle Rentals"
//             items={suggestions.filter(item => item.type === 'vehicle')}
//             type="vehicle"
//           />
          
//           <SuggestedSection
//             title="Accommodations"
//             items={suggestions.filter(item => item.type === 'hotel')}
//             type="hotel"
//           />
//         </div>

//         {/* Call to action */}
//         <div className="text-center mt-16">
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
//             <h3 className="text-3xl font-bold mb-4">Ready for Your Sri Lankan Adventure?</h3>
//             <p className="text-xl text-blue-100 mb-8">
//               Start planning your unforgettable journey to {location.name}
//             </p>
//             <div className="flex items-center justify-center space-x-4">
//               <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
//                 Plan Your Trip
//               </button>
//               <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">
//                 Share Location
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ChevronLeft, ChevronRight, Star, DollarSign } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import SuggestedServices from './SuggestedServices';
import { locations } from '../../data/locationsData';
import { guides, shops, hotels, vehicles } from '../../data/travelData';
import styles from '../../styles/LocationDetails.module.css';

export const LocationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundLocation = locations.find(loc => loc.id === parseInt(id));
    setLocation(foundLocation);
  }, [id]);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === location.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? location.images.length - 1 : prev - 1
    );
  };

  // Filter suggested services based on location
  const suggestedGuides = guides.filter(guide => 
    guide.location === location.location
  ).slice(0, 3);

  const suggestedShops = shops.filter(shop => 
    shop.location === location.location
  ).slice(0, 3);

  const suggestedHotels = hotels.filter(hotel => 
    hotel.location === location.location
  ).slice(0, 3);

  const suggestedVehicles = vehicles.filter(vehicle => 
    vehicle.ownerName.includes(location.location.split(',')[0])
  ).slice(0, 3);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 ${styles.locationDetails}`}>
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/locations')}
            className={`flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors ${styles.animateSlideInLeft}`}
          >
            <ArrowLeft size={20} />
            <span>Back to Locations</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={location.images[currentImageIndex]}
            alt={location.name}
            className={`w-full h-full object-cover transition-all duration-500 ${styles.heroImage}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Image Navigation */}
          {location.images.length > 1 && (
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
            {location.images.map((_, index) => (
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
          <h1 className="text-4xl font-bold mb-2">{location.name}</h1>
          <div className="flex items-center space-x-2 text-lg">
            <MapPin size={20} />
            <span>{location.location}</span>
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
                    Coordinates: {location.coordinates.lat}, {location.coordinates.lng}
                  </p>
                </div>
              </div>
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
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium capitalize">{location.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Best Time to Visit</span>
                  <span className="font-medium">{location.bestTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Difficulty Level</span>
                  <span className="font-medium">{location.difficulty}</span>
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
                    <span className="text-sm text-gray-600 ml-1">({location.rating})</span>
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
            locationName={location.name}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;