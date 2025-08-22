import React from 'react';
import { Mail, Phone, MessageCircle, User, Calendar, MapPin, Languages, FileText, Image } from 'lucide-react';

const RequestView = ({ request }) => {
  if (!request) return null;

  // Helper function to format role name
  const formatRoleName = (roleName) => {
    return roleName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper function to format field names for display
  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get icon for specific fields
  const getFieldIcon = (fieldName) => {
    const iconMap = {
      email: Mail,
      phone: Phone,
      contact: Phone,
      number: Phone,
      whatsapp: MessageCircle,
      languages: Languages,
      locations: MapPin,
      description: FileText,
      image: Image,
      nic: User,
      name: User
    };

    for (const key in iconMap) {
      if (fieldName.toLowerCase().includes(key)) {
        return iconMap[key];
      }
    }
    return User;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{request.user?.name}</h3>
        <div className="flex flex-wrap items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            request.status === 'accepted' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
          <span className="text-gray-500 text-sm">
            Request Type: {formatRoleName(request.role?.name)}
          </span>
          <span className="text-gray-500 text-sm">
            Request ID: #{request.id}
          </span>
        </div>
      </div>

      {/* Basic Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            User Information
          </h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{request.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="text-gray-900">{request.user?.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-500" />
            Request Details
          </h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Submitted Date</p>
                <p className="text-gray-900">{new Date(request.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Submitted Time</p>
                <p className="text-gray-900">{new Date(request.created_at).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      {request.extra_data && Object.keys(request.extra_data).length > 0 && (
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-500" />
            Additional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(request.extra_data).map(([key, value]) => {
              const IconComponent = getFieldIcon(key);
              return (
                <div key={key} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <IconComponent className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500 capitalize">
                      {formatFieldName(key)}
                    </p>
                    <p className="text-gray-900 break-words mt-1">
                      {Array.isArray(value) ? (
                        <div className="flex flex-wrap gap-1">
                          {value.map((item, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        value || <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state for no extra data */}
      {(!request.extra_data || Object.keys(request.extra_data).length === 0) && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-800 text-center">
            No additional information provided with this request.
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestView;