import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShopDetail from '../components/shops/ShopDetail';

const ShopDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/shops/${id}`);
        setShop(response.data);
      } catch (error) {
        console.error('Error fetching shop:', error);
        // Redirect to shops page if not found
        navigate('/shops', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [id, navigate]);

  const handleBack = () => {
    navigate('/shops');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading shop details...</p>
      </div>
    );
  }

  if (!shop) {
    return null;
  }

  return <ShopDetail shop={shop} onBack={handleBack} />;
};

export default ShopDetailPage;