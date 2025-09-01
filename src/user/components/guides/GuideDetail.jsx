import React from 'react';
import { ArrowLeft, MapPin, Star, Clock, Mail, Phone, PhoneCallIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Navbar from '../Navbar';


const GuideDetail = ({ guide, onBack }) => {

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
              <ArrowLeft className="size-5 text-gray-700" />
            </button>

            {/* Rating */}
            {guide?.rating && (
              <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-lg">{guide.rating}</span>
                </div>
              </div>
            )}
          </div>

          {/* Guide Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {guide?.guideName || "Unnamed Guide"}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {guide?.locations && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="size-5 text-emerald-600" />
                  <span>{guide.locations.join(", ")}</span>
                </div>
              )}

              {guide?.personalNumber && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="size-5 text-emerald-600" />
                  <span>{guide.personalNumber}</span>
                </div>
              )}

              {guide?.businessMail && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="size-5 text-emerald-600" />
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
                  <FaWhatsapp className="size-5 text-emerald-600" />
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuideDetail;
