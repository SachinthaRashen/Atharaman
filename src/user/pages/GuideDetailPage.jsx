import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GuideDetail from '../components/guides/GuideDetail';

const GuideDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/guides/${id}`);
        // Normalize the image structure for the component
        const guideData = response.data;
        if (guideData.images && guideData.images.length > 0) {
          // Convert new structure to compatible format
          guideData.guideImage = guideData.images.map(img => img.image_path);
        } else if (!guideData.guideImage) {
          // Ensure guideImage exists even if empty
          guideData.guideImage = [];
        }
        setGuide(guideData);
      } catch (error) {
        console.error('Error fetching guide:', error);
        // Redirect to guides page if not found
        navigate('/guides', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id, navigate]);

  const handleBack = () => {
    navigate('/guides');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading guide details...</p>
      </div>
    );
  }

  if (!guide) {
    return null;
  }

  return <GuideDetail guide={guide} onBack={handleBack} />;
};

export default GuideDetailPage;