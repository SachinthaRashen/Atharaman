import React from 'react';
import { Mail, Phone, MessageCircle, Languages, MapPin, User, IdCardIcon, Image as ImageIcon } from 'lucide-react';

const GuideView = ({ guide }) => {
  if (!guide) return <div>No guide data available</div>;

  // Get all images from the relationship
  const allImages = guide.images || [];

  // Extract languages and locations from guide object
  const languages = guide.languages || [];
  const locations = guide.locations || [];

  return (
    <div className="space-y-6">
      {/* Guide Header */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-48 flex-shrink-0">
          {allImages.length > 0 ? (
            <img
              src={`http://localhost:8000/storage/${allImages[0].image_path}`}
              alt={allImages[0].alt_text}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{guide.guideName}</h3>
          <p className="text-gray-600 mb-4">{guide.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            <span>User ID: {guide.user_id}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <IdCardIcon className="w-4 h-4 mr-1" />
            <span>{guide.guideNic}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {allImages.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allImages.map((img) => (
              <div key={img.id} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={`http://localhost:8000/storage/${img.image_path}`}
                  alt={img.alt_text}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{guide.businessMail}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{guide.personalNumber}</span>
            </div>
            {guide.whatsappNumber && (
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-gray-700">{guide.whatsappNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {languages.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Languages className="w-5 h-5 mr-2" />
            Languages Spoken
          </h4>
          <div className="flex flex-wrap gap-2">
            {languages.map((language, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      )}

      {locations.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Related Locations
          </h4>
          <div className="flex flex-wrap gap-2">
            {locations.map((location, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {location}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideView;