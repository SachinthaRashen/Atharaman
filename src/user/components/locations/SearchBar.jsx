import React from 'react';
import { Search, MapPin } from 'lucide-react';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for breathtaking locations in Sri Lanka..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <MapPin className="text-gray-400 w-5 h-5" />
        </div>
      </div>
      
      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible transition-all duration-300 hover:opacity-100 hover:visible">
        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700">Popular: Sigiriya Rock</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span className="text-gray-700">Trending: Ella Rock</span>
          </div>
        </div>
      </div>
    </div>
  );
};