import React from 'react';
import { Shield, ChevronDown, ChevronUp, Award, MapPin, Users, Star } from 'lucide-react';

const GuideProfile = ({ isExpanded, onToggleExpand }) => {
  const guideStats = {
    toursCompleted: 127,
    rating: 4.9,
    experience: "5+ years",
    specialties: ["Mountain Hiking", "Wildlife Photography", "Survival Skills", "Rock Climbing"]
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-3 mr-4">
              <Shield className="size-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Certified Guide</h3>
              <p className="text-green-100">Professional outdoor guide services</p>
            </div>
          </div>
          <button
            onClick={onToggleExpand}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="size-6 text-white" />
            ) : (
              <ChevronDown className="size-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full size-16 flex items-center justify-center mx-auto mb-3">
                <Users className="size-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{guideStats.toursCompleted}</div>
              <div className="text-sm text-gray-600">Tours Completed</div>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full size-16 flex items-center justify-center mx-auto mb-3">
                <Star className="size-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{guideStats.rating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full size-16 flex items-center justify-center mx-auto mb-3">
                <Award className="size-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{guideStats.experience}</div>
              <div className="text-sm text-gray-600">Experience</div>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full size-16 flex items-center justify-center mx-auto mb-3">
                <MapPin className="size-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">15+</div>
              <div className="text-sm text-gray-600">Locations</div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {guideStats.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">Guide Badge Verified ✓</h4>
            <p className="text-sm text-green-700">
              This user has been verified as a professional camping guide with all necessary certifications and experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideProfile;