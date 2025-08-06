import React from 'react';
import { MapPin, Users, Store, Building2, Car, Hotel, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Locations', count: 156, icon: MapPin, color: 'bg-blue-500' },
    { label: 'Guides', count: 89, icon: Users, color: 'bg-green-500' },
    { label: 'Shop Owners', count: 234, icon: UserCheck, color: 'bg-purple-500' },
    { label: 'Shops', count: 467, icon: Store, color: 'bg-orange-500' },
    { label: 'Hotel Owners', count: 78, icon: UserCheck, color: 'bg-teal-500' },
    { label: 'Hotels', count: 145, icon: Hotel, color: 'bg-pink-500' },
    { label: 'Vehicle Owners', count: 123, icon: UserCheck, color: 'bg-indigo-500' },
    { label: 'Vehicles', count: 289, icon: Car, color: 'bg-red-500' },
  ];

  return (
    <div className="mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to the ATHARAMAN Admin Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.count}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg text-left transition-colors duration-200">
            <h3 className="font-semibold">Add New Location</h3>
            <p className="text-sm text-blue-600 mt-1">Create a new tourist location</p>
          </button>
          <button className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg text-left transition-colors duration-200">
            <h3 className="font-semibold">Register New Guide</h3>
            <p className="text-sm text-green-600 mt-1">Add a new tour guide</p>
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg text-left transition-colors duration-200">
            <h3 className="font-semibold">Review Requests</h3>
            <p className="text-sm text-purple-600 mt-1">Check pending applications</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;