import React, { useState, useMemo } from 'react';
import { vehicles } from '../../data/mockData';
import SearchAndFilter from '../SearchAndFilter';
import VehicleCard from './VehicleCard';
import VehicleDetail from './VehicleDetail';

export const VehiclesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = 
        selectedLocation === 'All Locations' || vehicle.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation]);

  if (selectedVehicle) {
    return (
      <VehicleDetail
        vehicle={selectedVehicle}
        onBack={() => setSelectedVehicle(null)}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Adventure Vehicles</h2>
          <p className="text-gray-600">
            Rent the perfect vehicle for your outdoor journey
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          placeholder="Search vehicles by name..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onClick={setSelectedVehicle}
            />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No vehicles found matching your criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VehiclesSection;