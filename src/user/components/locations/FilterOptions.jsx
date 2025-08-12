import React from 'react';
import { Mountain, Waves, Trees, Sun, MapPin, Building, Church, Landmark } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Locations', icon: MapPin, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'Mountains', name: 'Mountains', icon: Mountain, color: 'bg-gradient-to-r from-gray-600 to-gray-800' },
  { id: 'Beaches', name: 'Beaches', icon: Waves, color: 'bg-gradient-to-r from-blue-400 to-cyan-500' },
  { id: 'National Parks', name: 'National Parks', icon: Trees, color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
  { id: 'Historical Sites', name: 'Historical Sites', icon: Building, color: 'bg-gradient-to-r from-amber-500 to-orange-600' },
  { id: 'Religious Sites', name: 'Religious Sites', icon: Church, color: 'bg-gradient-to-r from-indigo-500 to-purple-600' },
  { id: 'Landmarks', name: 'Landmarks', icon: Landmark, color: 'bg-gradient-to-r from-red-500 to-pink-600' },
];

const provinces = [
  { id: 'all', name: 'All Provinces' },
  { id: 'Western', name: 'Western Province' },
  { id: 'Central', name: 'Central Province' },
  { id: 'Southern', name: 'Southern Province' },
  { id: 'Northern', name: 'Northern Province' },
  { id: 'Eastern', name: 'Eastern Province' },
  { id: 'North Western', name: 'North Western Province' },
  { id: 'North Central', name: 'North Central Province' },
  { id: 'Uva', name: 'Uva Province' },
  { id: 'Sabaragamuwa', name: 'Sabaragamuwa Province' },
];

export const FilterOptions = ({ selectedCategory, onCategoryChange, selectedProvince, onProvinceChange }) => {
  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-medium">{category.name}</span>
              </div>
              
              <div className={`absolute inset-0 ${category.color} opacity-0 transition-opacity duration-300 ${!isSelected ? 'group-hover:opacity-10' : ''}`}></div>
            </button>
          );
        })}
      </div>

      {/* Province Filter */}
      <div className="flex justify-center">
        <select
          value={selectedProvince}
          onChange={(e) => onProvinceChange(e.target.value)}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3 text-gray-700 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};