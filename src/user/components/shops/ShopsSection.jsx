import React, { useState, useMemo } from 'react';
import { shops } from '../../data/mockData';
import SearchAndFilter from '../SearchAndFilter';
import ShopCard from './ShopCard';
import ShopDetail from './ShopDetail';

const ShopsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedShop, setSelectedShop] = useState(null);

  const filteredShops = useMemo(() => {
    return shops.filter(shop => {
      const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation === 'All Locations' || shop.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation]);

  if (selectedShop) {
    return (
      <ShopDetail 
        shop={selectedShop} 
        onBack={() => setSelectedShop(null)}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onClick={setSelectedShop}
            />
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No shops found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopsSection;