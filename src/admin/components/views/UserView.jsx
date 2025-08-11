import React from 'react';
import { Mail, User } from 'lucide-react';

const UserView = ({ user }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={user.image}
          alt={user.username}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.username}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            <span>User ID: {user.userId}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-gray-700">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;