import React, { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { FilterOptions } from './FilterOptions';
import { LocationCard } from './LocationCard';
import { ChevronRight, Compass, Sparkles } from 'lucide-react';
import { locations } from '../../data/locations';

export const LocationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
  const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      sessionStorage.removeItem('scrollPosition'); 
    }
  },[]);
  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
      const matchesProvince = selectedProvince === 'all' || location.province === selectedProvince;
      
      return matchesSearch && matchesCategory && matchesProvince;
    });
  }, [searchTerm, selectedCategory, selectedProvince]);

  const paginatedLocations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLocations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLocations, currentPage]);

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  const handleLoadMore = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -left-16 w-48 h-48 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Compass className="w-12 h-12 animate-spin" style={{ animationDuration: '8s' }} />
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Discover Sri Lanka
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Explore the Pearl of the Indian Ocean's breathtaking natural wonders and rich cultural heritage
            </p>

            <div className="mb-8">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
            
            <FilterOptions 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory}
              selectedProvince={selectedProvince}
              onProvinceChange={setSelectedProvince}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {filteredLocations.length} Amazing {selectedCategory === 'all' ? 'Locations' : selectedCategory} Found
            {selectedProvince !== 'all' && ` in ${selectedProvince} Province`}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedLocations.map((location, index) => (
            <div
              key={location.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <LocationCard location={location} />
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        {filteredLocations.length > itemsPerPage && (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Showing {Math.min(currentPage * itemsPerPage, filteredLocations.length)} of {filteredLocations.length} locations
              </h3>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                {currentPage > 1 && (
                  <button
                    onClick={handlePrevPage}
                    className="bg-white text-gray-700 border-2 border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center space-x-2"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>Previous Page</span>
                  </button>
                )}
                
                {currentPage < totalPages && (
                  <button
                    onClick={handleLoadMore}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Load More Adventures
                  </button>
                )}
                
                {currentPage < totalPages && (
                  <button
                    onClick={handleNextPage}
                    className="bg-white text-gray-700 border-2 border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Next Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Page indicator */}
              <div className="flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'bg-blue-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {filteredLocations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No locations found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};