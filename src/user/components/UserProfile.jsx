import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, Shield, Calendar } from 'lucide-react';
import RequestButtons from './RequestButtons';
import GuideProfile from './profiles/GuideProfile';
import HotelOwnerProfile from './profiles/HotelOwnerProfile';
import ShopOwnerProfile from './profiles/ShopOwnerProfile';
import VehicleOwnerProfile from './profiles/VehicleOwnerProfile';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    userData: {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      phone: "+1 (555) 123-4567",
      location: "Mountain View, CA",
      joinDate: "2023",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    approvedRoles: ['guide'], // Start with guide approved for demo
    pendingRequests: []
  });

  const [expandedSections, setExpandedSections] = useState({});

  const handleRoleRequest = (role) => {
    if (!profile.pendingRequests.includes(role) && !profile.approvedRoles.includes(role)) {
      setProfile(prev => ({
        ...prev,
        pendingRequests: [...prev.pendingRequests, role]
      }));

      // Simulate admin approval after 2 seconds for demo
      setTimeout(() => {
        setProfile(prev => ({
          ...prev,
          approvedRoles: [...prev.approvedRoles, role],
          pendingRequests: prev.pendingRequests.filter(r => r !== role)
        }));
      }, 2000);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 h-32 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        <div className="relative px-6 sm:px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16">
            <img
              src={profile.userData.avatar}
              alt={profile.userData.name}
              className="size-32 rounded-full border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-6"
              loading="lazy"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.userData.name}</h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-600 text-sm sm:text-base">
                <div className="flex items-center">
                  <Mail className="size-4 mr-2" />
                  <span className="truncate max-w-[180px] sm:max-w-none">{profile.userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="size-4 mr-2" />
                  {profile.userData.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="size-4 mr-2" />
                  {profile.userData.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="size-4 mr-2" />
                  Member since {profile.userData.joinDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Buttons */}
      <RequestButtons
        onRoleRequest={handleRoleRequest}
        approvedRoles={profile.approvedRoles}
        pendingRequests={profile.pendingRequests}
      />

      {/* Approved Role Sections */}
      <div className="space-y-6">
        {profile.approvedRoles.includes('guide') && (
          <GuideProfile
            isExpanded={expandedSections.guide}
            onToggleExpand={() => toggleSection('guide')}
          />
        )}

        {profile.approvedRoles.includes('hotel-owner') && (
          <HotelOwnerProfile
            isExpanded={expandedSections.hotelOwner}
            onToggleExpand={() => toggleSection('hotelOwner')}
            userId={profile.userData.id}
          />
        )}

        {profile.approvedRoles.includes('shop-owner') && (
          <ShopOwnerProfile
            isExpanded={expandedSections.shopOwner}
            onToggleExpand={() => toggleSection('shopOwner')}
            userId={profile.userData.id}
          />
        )}

        {profile.approvedRoles.includes('vehicle-owner') && (
          <VehicleOwnerProfile
            isExpanded={expandedSections.vehicleOwner}
            onToggleExpand={() => toggleSection('vehicleOwner')}
            userId={profile.userData.id}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;