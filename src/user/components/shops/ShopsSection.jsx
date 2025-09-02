import React, { useState, useMemo, useEffect } from 'react';
import SearchAndFilter from '../SearchAndFilter';
import ShopCard from './ShopCard';
import ShopDetail from './ShopDetail';
import Navbar from '../Navbar';
import axios from 'axios';

const ShopsSection = () => {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedShop, setSelectedShop] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const shopsPerPage = 6; // how many shops to show per page

  // Fetch shops from API
  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/api/shops')
    .then((response) => setShops(response.data))
    .catch((error) => console.error('Error fetching shops:', error));
  }, []);

  const filteredShops = useMemo(() => {
    return shops.filter(shop => {
      const matchesSearch = shop.shopName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
      const matchesLocation =
      selectedLocation === 'All Locations' || (shop.locations && shop.locations.includes(selectedLocation));
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation, shops]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage);
  const startIndex = (currentPage - 1) * shopsPerPage;
  const currentShops = filteredShops.slice(
    startIndex,
    startIndex + shopsPerPage
  );
  // Reset to first page when filters change
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

  if (selectedShop) {
    return (
      <ShopDetail 
        shop={selectedShop} 
        onBack={() => setSelectedShop(null)}
      />
    );
  }
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
    <div className="min-h-dvh bg-gray-50 pt-16">
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Camping Gear Shops</h2>
          <p className="text-gray-600">Find everything you need for your outdoor adventure</p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          placeholder="Search shops by name..."
        />

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentShops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onClick={setSelectedShop}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No shops found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredShops.length > shopsPerPage && (
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
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-gray-300 hover:bg-gray-50"
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

export default ShopsSection;
