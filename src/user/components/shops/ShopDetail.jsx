import React from 'react';
import { ArrowLeft, MapPin, Star, User, Mail, DollarSign } from 'lucide-react';

const ShopDetail = ({ shop, onBack }) => {
  return (
    <div className="min-h-dvh bg-gray-50">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{shop.name}</h1>

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
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Owner Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="size-5 text-emerald-600" />
                    <span>{shop.ownerName}</span>
                  </div>
                  {shop.ownerContact && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="size-5 text-emerald-600" />
                      <a
                        href={`mailto:${shop.ownerContact}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {shop.ownerContact}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shop.items.map((item) => (
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
                          <button className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-200 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Shop
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopDetail;