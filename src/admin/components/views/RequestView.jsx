import React from 'react';
import { Mail, Phone, MessageCircle, User } from 'lucide-react';

const RequestView = ({ request }) => {
  if (!request) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{request.name}</h3>
        <div className="flex items-center space-x-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            request.status === 'Approved' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {request.status}
          </span>
          <span className="text-gray-500 text-sm">Request Type: {request.requestType}</span>
        </div>
        <p className="text-gray-600">{request.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{request.businessEmail}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{request.personalNumber}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{request.whatsappNumber}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Username:</span>
              <p className="text-gray-900">{request.username}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">NIC:</span>
              <p className="text-gray-900">{request.nic}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Submitted:</span>
              <p className="text-gray-900">{request.submittedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestView;