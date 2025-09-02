import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Star, User, Mail, DollarSign } from 'lucide-react';
import Navbar from '../Navbar';
import axios from 'axios';

const ShopDetail = ({ shop, onBack }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (shop?.id) {
      axios
        .get(`http://127.0.0.1:8000/api/shops/${shop.id}/items`)
        .then((res) => {
          const formatted = res.data.map((item) => ({
            id: item.id,
            name: item.itemName,
            description: item.description,
            price: item.price,
            image: item.itemImage
              ? `http://127.0.0.1:8000/storage/${JSON.parse(item.itemImage)[0]}`
              : '/default-item.png',
          }));
          setItems(formatted);
        })
        .catch((err) => console.error('Error fetching items:', err));
    }
  }, [shop]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-32 bg-gradient-to-br from-emerald-100 to-emerald-200">
            <button
              onClick={onBack}
              className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
            >
              <ArrowLeft className="size-5 text-gray-700" />
            </button>
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Star className="size-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-lg">{shop.rating}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{shop.shopName}</h1>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="size-5 text-emerald-600" />
              <span>{shop.location}</span>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{shop.description}</p>
              </div>

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
                            src={item.image}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopDetail;
