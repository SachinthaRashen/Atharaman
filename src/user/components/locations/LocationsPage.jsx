import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, ArrowLeft, ChevronDown, Grid, List } from 'lucide-react';
import LocationCard from './LocationCard';
import LocationDetail from './LocationDetail';
import { locations } from '../../data/locationsData';
import styles from '../../styles/LocationsPage.module.css';
import Navbar from '../Navbar';
import SearchAndFilter from '../SearchAndFilter';
import { u } from 'framer-motion/client';
import axios from 'axios';

export const LocationsPage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const locationsPerPage = 9;

  //Fetch locations from data file or API
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/locations')
      .then((response) =>  setLocations(response.data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  // Category filters

  const filters = [
    { value: 'all', label: 'All Locations' },
    { value: 'mountain', label: 'Mountains' },
    { value: 'desert', label: 'Deserts' },
    { value: 'forest', label: 'Forests' },
    { value: 'beach', label: 'Beaches' },
    { value: 'lake', label: 'Lakes' }
  ];

  // Filtering
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch = location.locationName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        selectedFilter === 'all' || location.category === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter, locations]);

  // Pagination

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

  if (selectedLocation) {
    return (
      <LocationDetail location={selectedLocation} onBack={() => setSelectedLocation(null)} />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 pt-16 ${styles.locationsPage}`}>
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Next Adventure
          </h2>
          <p className="text-gray-600">
            Explore our curated list of breathtaking locations around the world.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilter
          searchTerm={searchTerm }
          onSearchChange={setSearchTerm}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          placeholder='Search locations...'
        />
        {/* category filter */}
        <div className="flex justify-between items-center mt-4">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition-all"
            >
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-700">
                {filters.find(f => f.value === selectedFilter)?.label || 'Select Category'}
              </span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </button>
            {isFilterOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {filters.map(filter => (
                  <div
                    key={filter.value}
                    onClick={() => {
                      setSelectedFilter(filter.value);
                      setIsFilterOpen(false);
                    }}
                    className={`flex items-center px-4 py-2 hover:bg-gray-100 transition-all ${
                      filter.value === selectedFilter ? 'bg-gray-100' : ''
                    }`}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">{filter.label}</span>
                  </div>
                ))}
              </div>
            )}
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
      </main>
    </div>
  );
};

export default LocationsPage;