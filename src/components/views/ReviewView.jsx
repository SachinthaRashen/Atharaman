import React from 'react';
import { Star, Image as ImageIcon } from 'lucide-react';

const ReviewView = ({ review }) => {
  if (!review) return null;

  // Filter out null/undefined images
  const images = (review.images || []).filter(img => img);

  return (
    <div className="space-y-6">
      {/* Review Header */}
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{review.username}</h3>
        <p className="text-gray-600 mb-2">
          {review.type === 'websitereview' 
            ? 'Website Review' 
            : `${review.type.replace('review', '')} Review for ${review.relatedTo?.name || 'Unknown'}`
          }
        </p>
        <p className="text-gray-600 mb-2">{`${review.date} At ${review.time}`}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Star className="w-4 h-4 mr-1" />
          <span>{review.rating}</span>
        </div>
      </div>

      {/* Image Gallery - Only show if there are images */}
      {images.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={img}
                  alt={`${review.username} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Comment</h4>
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewView;