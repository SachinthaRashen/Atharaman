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

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const matchesSearch = guide.guideName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation === 'All Locations' || 
                              (guide.locations && guide.locations.includes(selectedLocation));
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation, guides]);

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