import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LocationDetail from '../components/locations/LocationDetail';

const LocationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/locations/${id}`);
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching location:', error);
        // Redirect to locations page if not found
        navigate('/locations', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id, navigate]);

  const handleBack = () => {
    navigate('/locations');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading location details...</p>
      </div>
    );
  }

  if (!location) {
    return null; // Will redirect in useEffect
  }

  return <LocationDetail location={location} onBack={handleBack} />;
};

export default LocationDetailPage;