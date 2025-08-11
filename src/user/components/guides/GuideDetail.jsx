import React from 'react';
import { ArrowLeft, MapPin, Star, Clock, Mail } from 'lucide-react';

const GuideDetail = ({ guide, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img 
              src={guide.image} 
              alt={guide.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onBack}
              className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200"
            >
              <ArrowLeft className="size-5 text-gray-700" />
            </button>
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Star className="size-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-lg">{guide.rating}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{guide.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="size-5 text-emerald-600" />
                <span>{guide.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="size-5 text-emerald-600" />
                <span>{guide.experience} experience</span>
              </div>
              {guide.contact && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="size-5 text-emerald-600" />
                  <a href={`mailto:${guide.contact}`} className="hover:text-emerald-600 transition-colors">
                    {guide.contact}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{guide.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Biography</h2>
                <p className="text-gray-600 leading-relaxed">{guide.bio}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Guide
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuideDetail;