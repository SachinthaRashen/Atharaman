import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { guides } from '../../data/mockData';
import SearchAndFilter from '../SearchAndFilter';
import GuideCard from './GuideCard';
import GuideDetail from './GuideDetail';
import Navbar from '../Navbar';

export const GuidesSection = () => {
  const [guides, setGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/all_guides')
      .then(response => setGuides(response.data))
      .catch(error => console.error("Error fetching guides:", error));
  }, []);

  // const filteredGuides = useMemo(() => {
  //   return guides.filter(guide => {
  //     const matchesSearch = guide.guideName.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesLocation = selectedLocation === 'All Locations' || 
  //                             (guide.locations && guide.locations.includes(selectedLocation));
  // // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const guidesPerPage = 3; // adjust as needed

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation =
        selectedLocation === 'All Locations' || guide.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation, guides]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
  const startIndex = (currentPage - 1) * guidesPerPage;
  const currentGuides = filteredGuides.slice(startIndex, startIndex + guidesPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (selectedGuide) {
    return <GuideDetail guide={selectedGuide} onBack={() => setSelectedGuide(null)} />;
  }

  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Match your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Guides</h2>
          <p className="text-gray-600">
            Connect with experienced guides for your next adventure
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          placeholder="Search guides by name..."
        />

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} onClick={setSelectedGuide} />
          ))}
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No guides found matching your criteria.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredGuides.length > guidesPerPage && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Load More */}
            <button
              onClick={handleLoadMore}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default GuidesSection;
