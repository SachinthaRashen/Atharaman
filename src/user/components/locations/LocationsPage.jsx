import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, ArrowLeft, ChevronDown, Grid, List } from 'lucide-react';
import LocationCard from './LocationCard';
import { locations } from '../../data/locationsData';
import styles from '../../styles/LocationsPage.module.css';
import Navbar from '../Navbar';

export const LocationsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const locationsPerPage = 9;

  const filters = [
    { value: 'all', label: 'All Locations' },
    { value: 'mountain', label: 'Mountains' },
    { value: 'desert', label: 'Deserts' },
    { value: 'forest', label: 'Forests' },
    { value: 'beach', label: 'Beaches' },
    { value: 'lake', label: 'Lakes' }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || location.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);
  const startIndex = (currentPage - 1) * locationsPerPage;
  const currentLocations = filteredLocations.slice(startIndex, startIndex + locationsPerPage);

  const handleLocationClick = (locationId) => {
    navigate(`/location/${locationId}`);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Match your navbar height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 ${styles.locationsPage}`}>
      <Navbar onScrollToSection={scrollToSection} />
      <div className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors ${styles.animateSlideInLeft}`}
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            
            <div className={`flex items-center space-x-4 ${styles.animateSlideInRight}`}>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
            </div>
          </div>

          <div className={`text-center mb-8 ${styles.animateFadeInUp}`}>
            <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${styles.animateZoomIn}`}>
              Discover Amazing Locations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore breathtaking natural destinations around the world
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className={`flex flex-col md:flex-row gap-4 ${styles.animateSlideInUp}`}>
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${styles.searchInput}`}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all ${styles.filterButton}`}
              >
                <Filter size={20} />
                <span>{filters.find(f => f.value === selectedFilter)?.label}</span>
                <ChevronDown size={16} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 ${styles.animateSlideDown}`}>
                  {filters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setSelectedFilter(filter.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                        selectedFilter === filter.value ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className={`mt-4 text-gray-600 ${styles.animateFadeIn}`}>
            Showing {currentLocations.length} of {filteredLocations.length} locations
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${styles.locationsGrid}`}>
          {currentLocations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => handleLocationClick(location.id)}
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        {/* No Results */}
        {currentLocations.length === 0 && (
          <div className={`text-center py-16 ${styles.animateFadeInUp}`}>
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No locations found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {filteredLocations.length > locationsPerPage && (
          <div className={`flex justify-center items-center space-x-4 mt-12 ${styles.animateSlideInUp}`}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleLoadMore}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;