import React, { useState, useEffect } from 'react';
import { Shield, ChevronDown, ChevronUp, Award, MapPin, Users, Star, Languages, Edit3, Trash2, User, Mail, Phone, MessageCircle, X, Upload } from 'lucide-react';
import { getMyGuide, updateMyGuide, deleteMyGuide, getLocations } from '../../../services/api';

const GuideProfile = ({ isExpanded, onToggleExpand, userId }) => {
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditGuideForm, setShowEditGuideForm] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const [guideFormData, setGuideFormData] = useState({
    guideName: '',
    guideNic: '',
    businessMail: '',
    personalNumber: '',
    whatsappNumber: '',
    description: '',
    languages: [],
    locations: []
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const availableLanguages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Japanese', 'Chinese'];

  // Fetch data only when expanded
  useEffect(() => {
    if (isExpanded && userId) {
      fetchGuideData();
      fetchLocations();
    }
  }, [isExpanded, userId]);

  const fetchGuideData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMyGuide();
      setGuide(response.data);
      setGuideFormData({
        guideName: response.data.guideName || '',
        guideNic: response.data.guideNic || '',
        businessMail: response.data.businessMail || '',
        personalNumber: response.data.personalNumber || '',
        whatsappNumber: response.data.whatsappNumber || '',
        description: response.data.description || '',
        languages: response.data.languages || [],
        locations: response.data.locations || []
      });

      // Set image previews if there are existing images
      if (response.data.guideImage && response.data.guideImage.length > 0) {
        setImagePreviews(response.data.guideImage.map(img => `http://localhost:8000/storage/${img}`));
      }
    } catch (err) {
      console.error('Error fetching guide data:', err);
      setError('Failed to load guide data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      const response = await getLocations();
      const locationNames = response.data.map(location => location.name || location.locationName);
      setAvailableLocations(locationNames);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleUpdateGuide = async () => {
    try {
      const formData = new FormData();
      formData.append('guideName', guideFormData.guideName);
      formData.append('guideNic', guideFormData.guideNic);
      formData.append('businessMail', guideFormData.businessMail);
      formData.append('personalNumber', guideFormData.personalNumber);
      formData.append('whatsappNumber', guideFormData.whatsappNumber);
      formData.append('description', guideFormData.description);
      
      // Append languages if they exist
      if (guideFormData.languages && guideFormData.languages.length > 0) {
        guideFormData.languages.forEach(lang => {
          formData.append('languages[]', lang);
        });
      }
      
      // Append locations if they exist
      if (guideFormData.locations && guideFormData.locations.length > 0) {
        guideFormData.locations.forEach(loc => {
          formData.append('locations[]', loc);
        });
      }

      // Append images if they exist
      images.forEach(image => {
        if (image instanceof File && image.type.startsWith('image/')) {
          formData.append('guideImage[]', image);
        }
      });

      const response = await updateMyGuide(formData);
      setGuide(response.data.guide);
      setShowEditGuideForm(false);
      alert('Guide details updated successfully!');
    } catch (err) {
      console.error('Error updating guide:', err);
      setError('Failed to update guide details.');
    }
  };

  const handleDeleteGuide = async () => {
    if (window.confirm('Are you sure you want to delete your guide profile?')) {
      try {
        await deleteMyGuide();
        alert('Guide profile deleted successfully!');
        window.location.reload();
      } catch (err) {
        console.error('Error deleting guide:', err);
        setError('Failed to delete guide profile.');
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    const validImageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)
    );
    
    const newImages = [...images, ...validImageFiles];
    setImages(newImages);
    
    const newPreviews = validImageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    if (newPreviews[index].startsWith('blob:')) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleLanguageChange = (language) => {
    setGuideFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleLocationChange = (location) => {
    setGuideFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* Header Section - Always Visible */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-3 mr-4">
              <Shield className="size-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Guide Profile</h3>
              <p className="text-green-100">Manage your guide services</p>
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

      {/* Content Section - Only visible when expanded */}
      {isExpanded && (
        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">Loading guide data...</div>
          ) : guide ? (
            <>
              {/* Guide Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-semibold text-gray-800">Guide Details</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowEditGuideForm(!showEditGuideForm)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors text-sm"
                    >
                      <Edit3 className="size-4" />
                      Edit Details
                    </button>
                    <button
                      onClick={handleDeleteGuide}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors text-sm"
                    >
                      <Trash2 className="size-4" />
                      Delete Profile
                    </button>
                  </div>
                </div>
                
                {showEditGuideForm ? (
                  <div className="space-y-4">
                    {/* Guide Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Guide Images
                      </label>
                      <div className="flex flex-wrap gap-4 mb-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative h-32 w-32">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            >
                              <X className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <label 
                          htmlFor="fileInput"
                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-40"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="text-sm">Upload Images</span>
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          onChange={handleImageChange}
                          accept="image/*"
                          multiple
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Guide Name
                        </label>
                        <input
                          type="text"
                          value={guideFormData.guideName}
                          onChange={(e) => setGuideFormData({...guideFormData, guideName: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NIC Number
                        </label>
                        <input
                          type="text"
                          value={guideFormData.guideNic}
                          onChange={(e) => setGuideFormData({...guideFormData, guideNic: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business Email
                        </label>
                        <input
                          type="email"
                          value={guideFormData.businessMail}
                          onChange={(e) => setGuideFormData({...guideFormData, businessMail: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Personal Number
                        </label>
                        <input
                          type="tel"
                          value={guideFormData.personalNumber}
                          onChange={(e) => setGuideFormData({...guideFormData, personalNumber: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={guideFormData.whatsappNumber}
                          onChange={(e) => setGuideFormData({...guideFormData, whatsappNumber: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={guideFormData.description}
                        onChange={(e) => setGuideFormData({...guideFormData, description: e.target.value})}
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Languages
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {availableLanguages.map(language => (
                          <label key={language} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={guideFormData.languages.includes(language)}
                              onChange={() => handleLanguageChange(language)}
                              className="mr-2"
                            />
                            {language}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Locations
                      </label>
                      {loadingLocations ? (
                        <div className="text-gray-500">Loading locations...</div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {availableLocations.map(location => (
                            <label key={location} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={guideFormData.locations.includes(location)}
                                onChange={() => handleLocationChange(location)}
                                className="mr-2"
                              />
                              {location}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleUpdateGuide}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Update Details
                      </button>
                      <button
                        onClick={() => setShowEditGuideForm(false)}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Display existing images */}
                    {guide.guideImage && guide.guideImage.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guide Images
                        </label>
                        <div className="flex flex-wrap gap-4">
                          {guide.guideImage.map((image, index) => (
                            <img
                              key={index}
                              src={`http://localhost:8000/storage/${image}`}
                              alt={`Guide ${index}`}
                              className="h-32 w-32 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <User className="size-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium">{guide.guideName}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Award className="size-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">NIC</p>
                          <p className="font-medium">{guide.guideNic}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="size-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Business Email</p>
                          <p className="font-medium">{guide.businessMail}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="size-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Personal Number</p>
                          <p className="font-medium">{guide.personalNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="size-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">WhatsApp Number</p>
                          <p className="font-medium">{guide.whatsappNumber || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    {guide.description && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Description</p>
                        <p className="font-medium">{guide.description}</p>
                      </div>
                    )}

                    {guide.languages && guide.languages.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {guide.languages.map((language, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {guide.locations && guide.locations.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Service Locations</p>
                        <div className="flex flex-wrap gap-2">
                          {guide.locations.map((location, index) => (
                            <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Shield className="size-12 mx-auto mb-4 text-gray-400" />
              <p>No guide profile found. Please contact admin to set up your guide profile.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuideProfile;