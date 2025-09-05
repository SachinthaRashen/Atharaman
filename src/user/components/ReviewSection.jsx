import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getReviewsByEntity, 
  createReview, 
  updateReview, 
  deleteReview 
} from '../../services/api';

const ReviewSection = ({ entityType, entityId }) => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [entityType, entityId]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await getReviewsByEntity(entityType, entityId);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('entity_type', entityType);
      formData.append('entity_id', entityId);
      formData.append('rating', newReview.rating);
      formData.append('comment', newReview.comment);
      
      images.forEach((image) => {
        formData.append('images[]', image);
      });

      const response = await createReview(formData);
      setReviews(prev => [response.data.review, ...prev]);
      setNewReview({ rating: 5, comment: '' });
      setImages([]);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({ 
      rating: review.rating, 
      comment: review.comment 
    });
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('rating', newReview.rating);
      formData.append('comment', newReview.comment);
      formData.append('_method', 'PUT');
    
      // Debug: Log what's in the formData
      for (let [key, value] of formData.entries()) {
        console.log('FormData:', key, value);
      }

      // Append images if any
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append('images[]', image);
        });
      }

      const response = await updateReview(editingReview.id, formData);
      
      setReviews(prev => prev.map(review => 
        review.id === editingReview.id 
          ? response.data.review 
          : review
      ));
      setEditingReview(null);
      setNewReview({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (!['location', 'hotel'].includes(entityType)) {
      alert('Images are only supported for locations and hotels');
      return;
    }

    if (images.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

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

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (isLoading) {
    return <div className="mt-12 pt-8 border-t border-gray-200">Loading reviews...</div>;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(Math.round(averageRating))}</div>
              <span className="text-lg font-semibold text-gray-700">{averageRating}</span>
              <span className="text-gray-500">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold mb-4">
            {editingReview ? 'Edit Review' : 'Write a Review'}
          </h4>
          <form onSubmit={editingReview ? handleUpdateReview : handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    className={`text-2xl bg-transparent border-none cursor-pointer p-0 transition-colors ${
                      star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your experience..."
                required
              />
            </div>

            {['location', 'hotel'].includes(entityType) && !editingReview && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images (Max 5)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base"
                />
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : (editingReview ? 'Update Review' : 'Submit Review')}
              </button>
              {editingReview && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReview(null);
                    setNewReview({ rating: 5, comment: '' });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {!isAuthenticated && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
          <p className="text-blue-800">Please log in to write a review.</p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={review.user?.avatar || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"}
                    alt={review.user?.name || 'User'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</h5>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-2">{review.comment}</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={`/storage/${image}`}
                            alt={`Review image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {user && user.id === review.user_id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-600 text-sm underline hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 text-sm underline hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;