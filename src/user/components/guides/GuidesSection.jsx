import React, { useState, useMemo } from 'react';
import { guides } from '../../data/mockData';
import SearchAndFilter from '../SearchAndFilter';
import GuideCard from './GuideCard';
import GuideDetail from './GuideDetail';

export const GuidesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation === 'All Locations' || guide.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation]);

  if (selectedGuide) {
    return <GuideDetail guide={selectedGuide} onBack={() => setSelectedGuide(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Guides</h2>
          <p className="text-gray-600">Connect with experienced guides for your next adventure</p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          placeholder="Search guides by name..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onClick={setSelectedGuide}
            />
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No guides found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default GuidesSection;