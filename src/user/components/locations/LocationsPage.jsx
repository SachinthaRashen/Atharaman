import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, ArrowLeft, ChevronDown, Grid, List } from 'lucide-react';
import LocationCard from './LocationCard';
import LocationDetail from './LocationDetail';
import styles from '../../styles/LocationsPage.module.css';
import Navbar from '../Navbar';
import SearchAndFilter from '../SearchAndFilter';
import axios from 'axios';

export const LocationsPage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [locationRatings, setLocationRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const locationsPerPage = 9;

  // Function to determine category (same as in LocationCard)
  const getCategory = (location) => {
    const type = location.locationType?.toLowerCase() || '';
    const name = location.locationName?.toLowerCase() || '';
    
    if (type.includes('mountain') || name.includes('mountain')) return 'mountain';
    if (type.includes('rock') || name.includes('rock')) return 'rock';
    if (type.includes('plain') || name.includes('plain')) return 'plain';
    if (type.includes('valley') || name.includes('valley')) return 'valley';
    if (type.includes('beach') || name.includes('beach')) return 'beach';
    if (type.includes('cliff') || name.includes('cliff')) return 'cliff';
    if (type.includes('desert') || name.includes('desert')) return 'desert';
    if (type.includes('forest') || name.includes('forest')) return 'forest';
    if (type.includes('temple') || name.includes('temple')) return 'temple';
    if (type.includes('building') || name.includes('building')) return 'building';
    if (type.includes('lake') || name.includes('lake')) return 'lake';
    if (type.includes('river') || name.includes('river')) return 'river';
    if (type.includes('island') || name.includes('island')) return 'island';
    if (type.includes('road') || name.includes('road')) return 'road';
    if (type.includes('village') || name.includes('village')) return 'village';
    
    return 'other';
  };

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8000/api/locations');
        
        // Add category to each location
        const locationsWithCategory = response.data.map(location => ({
          ...location,
          category: getCategory(location)
        }));
        
        setLocations(locationsWithCategory);
        
        // Fetch ratings for each location
        const ratings = {};
        for (const location of response.data) {
          try {
            const reviewsResponse = await axios.get(`http://localhost:8000/api/reviews/entity/location/${location.id}`);
            if (reviewsResponse.data.length > 0) {
              const totalRating = reviewsResponse.data.reduce((sum, review) => sum + Number(review.rating), 0);
              ratings[location.id] = Number((totalRating / reviewsResponse.data.length).toFixed(1));
            } else {
              ratings[location.id] = 0;
            }
          } catch (error) {
            console.error('Error fetching reviews for location:', location.id, error);
            ratings[location.id] = 0;
          }
        }
        setLocationRatings(ratings);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Category filters
  const filters = [
    { value: 'all', label: 'All Locations' },
    { value: 'mountain', label: 'Mountains' },
    { value: 'rock', label: 'Rocks' },
    { value: 'plain', label: 'Plains' },
    { value: 'valley', label: 'Valleys' },
    { value: 'beach', label: 'Beaches' },
    { value: 'cliff', label: 'Cliffs' },
    { value: 'desert', label: 'Deserts' },
    { value: 'forest', label: 'Forests' },
    { value: 'temple', label: 'Temple' },
    { value: 'building', label: 'Historic Building' },
    { value: 'lake', label: 'Lakes' },
    { value: 'river', label: 'Rivers' },
    { value: 'island', label: 'Islands' },
    { value: 'road', label: 'Roads' },
    { value: 'village', label: 'Villages' }
  ];

  // Filtering
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        location.locationName?.toLowerCase().includes(searchLower) ||
        location.locationType?.toLowerCase().includes(searchLower) ||
        location.description?.toLowerCase().includes(searchLower) ||
        location.address?.toLowerCase().includes(searchLower);
      
      const matchesFilter =
        selectedFilter === 'all' || location.category === selectedFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter, locations]);

  // Pagination
  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);
  const startIndex = (currentPage - 1) * locationsPerPage;
  const currentLocations = filteredLocations.slice(startIndex, startIndex + locationsPerPage);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
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
      const navbarHeight = 64;
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
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          placeholder='Search locations...'
        />
        
        {/* Category filter */}
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⛰️</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Loading locations...</h3>
            <p className="text-gray-600">Please wait while we fetch the best destinations for you</p>
          </div>
        )}

        {/* Locations Grid */}
        {!isLoading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${styles.locationsGrid}`}>
              {currentLocations.map((location, index) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  rating={locationRatings[location.id] || 0}
                  onClick={() => handleLocationClick(location)}
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
        )}
      </main>
    </div>
  );
};

export default LocationsPage;