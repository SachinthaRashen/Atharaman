import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Star, DollarSign } from 'lucide-react';
import Navbar from '../Navbar';
import ReviewSection from '../ReviewSection';
import { getReviewsByEntity } from '../../../services/api';
import axios from 'axios';

const ShopDetail = ({ shop, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [items, setItems] = useState([]);  // ✅ add state for items

  useEffect(() => {
    const fetchShopReviews = async () => {
      if (shop?.id) {
        try {
          setReviewsLoading(true);
          const response = await getReviewsByEntity('shop', shop.id);
          setReviews(response.data);

          if (response.data.length > 0) {
            const totalRating = response.data.reduce(
              (sum, review) => sum + review.rating,
              0
            );
            setAverageRating(totalRating / response.data.length);
          }
        } catch (error) {
          console.error('Error fetching shop reviews:', error);
        } finally {
          setReviewsLoading(false);
        }
      }
    };

    // ✅ Fetch items for this shop
    const fetchShopItems = async () => {
      if (shop?.id) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/shops/${shop.id}/items`
          );
          setItems(response.data); // assume backend returns item array
        } catch (error) {
          console.error('Error fetching shop items:', error);
        }
      }
    };

    fetchShopReviews();
    fetchShopItems();
  }, [shop?.id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-dvh bg-gray-50 pt-16">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* ...Shop Header... */}

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{shop.shopName}</h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="size-5 text-emerald-600" />
              <span>{shop.location}</span>
            </div>

            {/* About */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{shop.description}</p>
              </div>

              {/* ✅ Items Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-32 overflow-hidden">
                          <img
                            src={`http://localhost:8000/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-emerald-600 font-semibold">
                              <DollarSign className="size-4" />
                              <span>{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No items available.</p>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <ReviewSection entityType="shop" entityId={shop?.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopDetail;
