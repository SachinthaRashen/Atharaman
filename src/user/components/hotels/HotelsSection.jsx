import React, { useState, useMemo } from 'react';
import { hotels } from '../../data/mockData';
import SearchAndFilter from '../SearchAndFilter';
import HotelCard from './HotelCard';
import HotelDetail from './HotelDetail';

export const HotelsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedHotel, setSelectedHotel] = useState(null);

  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation === 'All Locations' || hotel.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation]);

  if (selectedHotel) {
    return (
      <HotelDetail 
        hotel={selectedHotel} 
        onBack={() => setSelectedHotel(null)}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Accommodation</h2>
          <p className="text-gray-600">Discover comfortable places to stay during your adventure</p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          placeholder="Search hotels by name..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onClick={setSelectedHotel}
            />
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HotelsSection;