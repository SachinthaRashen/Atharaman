import React, { useState, useEffect } from 'react';
import { User, MapPin, Mail, Phone, Shield, Calendar } from 'lucide-react';
import RequestButtons from './RequestButtons';
import GuideProfile from './profiles/GuideProfile';
import HotelOwnerProfile from './profiles/HotelOwnerProfile';
import ShopOwnerProfile from './profiles/ShopOwnerProfile';
import VehicleOwnerProfile from './profiles/VehicleOwnerProfile';
import RoleRequestForm from './RoleRequestForm';
import { getProfile, requestRole, getRoleRequests } from '../../services/api';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    userData: {
      id: null,
      name: "",
      email: "",
      joinDate: "",
      avatar: ""
    },
    approvedRoles: [],
    pendingRequests: []
  });

  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Fetch user profile
      const profileResponse = await getProfile();
      const userData = profileResponse.data;
      
      // Fetch user's role requests
      const requestsResponse = await getRoleRequests();
      const roleRequests = requestsResponse.data;

      console.log('User data from API:', userData);
      console.log('User roles:', userData.roles);
      console.log('Role requests:', roleRequests);

      // Extract approved roles and pending requests
      const approvedRoles = userData.roles ? userData.roles.map(role => role.name) : [];
      const pendingRequests = roleRequests
        .filter(request => request.status === 'pending')
        .map(request => request.role.name);
      
      console.log('Approved roles:', approvedRoles);
      console.log('Pending requests:', pendingRequests);

      setProfile({
        userData: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          joinDate: new Date(userData.created_at).getFullYear().toString(),
          avatar: userData.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
        },
        approvedRoles,
        pendingRequests
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleRequestClick = (roleId) => {
    setSelectedRole(roleId);
    setShowRequestForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      // Debug: Log what we're about to send
      console.log('Form data:', formData);
      
      // Add to pending requests immediately for UX
      setProfile(prev => ({
        ...prev,
        pendingRequests: [...prev.pendingRequests, selectedRole]
      }));

      // Map frontend role IDs to backend role IDs
      const roleMap = {
        'guide': 2,
        'shop_owner': 3,
        'hotel_owner': 4,
        'vehicle_owner': 5
      };

      const backendRoleId = roleMap[selectedRole];
      
      if (!backendRoleId) {
        throw new Error(`Unknown role: ${selectedRole}`);
      }

      // Prepare the request data
      const requestData = {
        role_id: backendRoleId,
        extra_data: prepareExtraData(selectedRole, formData)
      };

      // Debug: Log the final request data
      console.log('Request data being sent:', JSON.stringify(requestData, null, 2));

      // Send request to backend
      await requestRole(requestData);
      
      console.log(`Role request for ${selectedRole} submitted successfully`);
      
      // Close the form and refetch data
      setShowRequestForm(false);
      setSelectedRole(null);
      fetchUserData();
      
    } catch (error) {
      console.error('Full error object:', error);
      
      // Check for validation errors
      if (error.response?.status === 422) {
        console.error('Validation errors:', error.response.data.errors);
        const validationErrors = error.response.data.errors;
        let errorMessage = 'Validation failed:\n';
        
        for (const field in validationErrors) {
          errorMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
        }
        
        alert(errorMessage);
      } else {
        console.error('Error response:', error.response?.data);
        alert(`Failed to request role: ${error.response?.data?.message || error.message}`);
      }
      
      // Remove from pending if request fails
      setProfile(prev => ({
        ...prev,
        pendingRequests: prev.pendingRequests.filter(r => r !== selectedRole)
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const prepareExtraData = (role, formData) => {
    switch (role) {
      case 'guide':
        return {
          guideName: formData.name.substring(0, 20),
          guideNic: formData.nic.substring(0, 12),
          businessMail: formData.email.substring(0, 100),
          personalNumber: formData.contactNumber.substring(0, 15),
          whatsappNumber: formData.whatsappNumber.substring(0, 15),
          guideImage: formData.guideImage ? [formData.guideImage] : ['default-image.jpg'],
          languages: formData.languages,
          locations: formData.locations,
          description: formData.description.substring(0, 500)
        };
      
      case 'hotel_owner':
        return {
          hotelOwnerName: formData.name.substring(0, 100),
          hotelOwnerNic: formData.nic.substring(0, 12),
          businessMail: formData.email.substring(0, 100),
          contactNumber: formData.contactNumber.substring(0, 15)
        };
      
      case 'shop_owner':
        return {
          shopOwnerName: formData.name.substring(0, 100),
          shopOwnerNic: formData.nic.substring(0, 12),
          businessMail: formData.email.substring(0, 100),
          contactNumber: formData.contactNumber.substring(0, 15)
        };
      
      case 'vehicle_owner':
        return {
          vehicleOwnerName: formData.name.substring(0, 100),
          vehicleOwnerNic: formData.nic.substring(0, 12),
          businessMail: formData.email.substring(0, 100),
          personalNumber: formData.personalNumber.substring(0, 15),
          whatsappNumber: formData.whatsappNumber.substring(0, 15),
          locations: formData.locations,
          description: formData.description.substring(0, 500)
        };
      
      default:
        return formData;
    }
  };

  const handleFormCancel = () => {
    setShowRequestForm(false);
    setSelectedRole(null);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

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
        onRoleRequest={handleRoleRequestClick}
        approvedRoles={profile.approvedRoles}
        pendingRequests={profile.pendingRequests}
      />

      {/* Approved Role Sections */}
      <div className="space-y-6">
        {profile.approvedRoles.includes('guide') && (
          <GuideProfile
            isExpanded={expandedSections.guide}
            onToggleExpand={() => toggleSection('guide')}
            userId={profile.userData.id}
          />
        )}

        {profile.approvedRoles.includes('hotel_owner') && (
          <HotelOwnerProfile
            isExpanded={expandedSections.hotelOwner}
            onToggleExpand={() => toggleSection('hotelOwner')}
            userId={profile.userData.id}
          />
        )}

        {profile.approvedRoles.includes('shop_owner') && (
          <ShopOwnerProfile
            isExpanded={expandedSections.shopOwner}
            onToggleExpand={() => toggleSection('shopOwner')}
            userId={profile.userData.id}
          />
        )}

        {profile.approvedRoles.includes('vehicle_owner') && (
          <VehicleOwnerProfile
            isExpanded={expandedSections.vehicleOwner}
            onToggleExpand={() => toggleSection('vehicleOwner')}
            userId={profile.userData.id}
          />
        )}
      </div>

      {/* Role Request Form Modal */}
      {showRequestForm && (
        <RoleRequestForm
          role={selectedRole}
          userData={profile.userData}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default UserProfile;