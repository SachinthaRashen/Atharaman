import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import ReviewView from '../components/views/ReviewView';

const reviewTypes = [
  { id: 'websitereview', label: 'Website' },
  { id: 'locationreview', label: 'Location' },
  { id: 'guidereview', label: 'Guide' },
  { id: 'itemreview', label: 'Item' },
  { id: 'hotelreview', label: 'Hotel' },
  { id: 'vehiclereview', label: 'Vehicle' }
];

const ManageReviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeType, setActiveType] = useState('websitereview');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      type: 'locationreview',
      username: 'srashenb',
      comment: 'Great historical site with amazing views',
      rating: 4.5,
      images: ['https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
      ],
      date: '20 July 2025',
      time: '17.30',
      relatedTo: { id: 'loc123', name: 'Sigiriya Rock Fortress' }
    },
    {
      id: 2,
      type: 'websitereview',
      username: 'traveler123',
      comment: 'Very user-friendly website with great features',
      rating: 4.0,
      images: [],
      date: '21 July 2025',
      time: '10.15'
    },
    {
      id: 3,
      type: 'guidereview',
      username: 'adventurer',
      comment: 'Knowledgeable and friendly guide',
      rating: 5.0,
      date: '22 July 2025',
      time: '09.00',
      relatedTo: { id: 'guide456', name: 'John Smith' }
    },
    {
      id: 4,
      type: 'itemreview',
      username: 'shopper',
      comment: 'High quality souvenir, exactly as pictured',
      rating: 4.0,
      images: ['https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
      ],
      date: '23 July 2025',
      time: '14.30',
      relatedTo: { id: 'item789', name: 'Wooden Elephant Carving' }
    },
    {
      id: 5,
      type: 'hotelreview',
      username: 'vacationer',
      comment: 'Excellent service and comfortable rooms',
      rating: 4.5,
      images: ['https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
      ],
      date: '24 July 2025',
      time: '20.00',
      relatedTo: { id: 'hotel101', name: 'Grand Colombo Hotel' }
    },
    {
      id: 6,
      type: 'vehiclereview',
      username: 'explorer',
      comment: 'Reliable vehicle for our safari trip',
      rating: 4.0,
      images: ['https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'],
      date: '25 July 2025',
      time: '16.45',
      relatedTo: { id: 'vehicle202', name: 'Toyota Land Cruiser' }
    },
  ]);

  const filteredReviews = reviews.filter(review => review.type === activeType);

  const columns = [
    { key: 'username', label: 'Username', sortable: true },
    { key: 'rating', label: 'Rating', sortable: true },
    ...(activeType !== 'websitereview' ? [{
      key: 'relatedTo',
      label: 'Related To',
      sortable: true,
      render: (value) => value?.name || 'N/A'
    }] : []),
    { 
      key: 'comment', 
      label: 'Comment', 
      sortable: false,
      render: (value) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      )
    },
  ];

  const handleView = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleDelete = (review) => {
    if (window.confirm(`Are you sure you want to delete this review?`)) {
      setReviews(reviews.filter(r => r.id !== review.id));
    }
  };

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews List</h1>
          <p className="text-gray-600 mt-1">Manage all user reviews in the system</p>

          {/* Review Type Filter */}
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {reviewTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeType === type.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label} Reviews
              </button>
            ))}
          </div>
        </div>
      </div>

      <DataTable
        data={filteredReviews}
        columns={columns}
        onView={handleView}
        onDelete={handleDelete}
        hideEdit={true} // Assuming your DataTable component accepts this prop to hide edit button
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Review Details"
        size="large"
      >
        <ReviewView review={selectedReview} />
      </Modal>
    </div>
  );
};

export default ManageReviews;