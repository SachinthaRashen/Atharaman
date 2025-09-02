import { useState, useEffect } from 'react';
import { reviews as mockReviews } from '../data/mockData';
import { createLocationHotelReview, updateLocationHotelReview, deleteLocationHotelReview, getLocationHotelReviewsByType } from '../api/locationHotelReviews';
import { createOtherReview, updateOtherReview, deleteOtherReview, getOtherReviewsByType } from '../api/otherReviews';

const ReviewSection = ({ itemType, itemId }) => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map item types to review types
  const getReviewType = () => {
    const typeMap = {
      'hotels': 'hotel',
      'locations': 'hotel', // Assuming locations use hotel reviews
      'guides': 'guide',
      'shops': 'shop',
      'vehicles': 'vehicle'
    };
    return typeMap[itemType] || itemType;
  };

  // Determine which API to use based on item type
  const isLocationHotelType = () => {
    return ['hotels', 'locations'].includes(itemType);
  };

  useEffect(() => {
    fetchReviews();
  }, [itemType, itemId]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const reviewType = getReviewType();
      
      let response;
      if (isLocationHotelType()) {
        response = await getLocationHotelReviewsByType(reviewType);
      } else {
        response = await getOtherReviewsByType(reviewType);
      }
      
      // Filter reviews for this specific item
      const itemReviews = response.data.filter(review => review.item_id === parseInt(itemId));
      setReviews(itemReviews);
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
      const reviewData = {
        rating: newReview.rating,
        comment: newReview.comment,
        type: getReviewType(),
        item_id: parseInt(itemId)
      };

      let response;
      if (isLocationHotelType()) {
        response = await createLocationHotelReview(reviewData);
      } else {
        response = await createOtherReview({
          review: newReview.comment,
          rating: newReview.rating,
          type: getReviewType(),
          item_id: parseInt(itemId)
        });
      }

      setReviews(prev => [response.data, ...prev]);
      setNewReview({ rating: 5, comment: '' });
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
      comment: isLocationHotelType() ? review.comment : review.review 
    });
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    setIsSubmitting(true);
    
    try {
      const updateData = {
        rating: newReview.rating,
        comment: newReview.comment,
        type: getReviewType()
      };

      let response;
      if (isLocationHotelType()) {
        response = await updateLocationHotelReview(editingReview.id, updateData);
      } else {
        response = await updateOtherReview(editingReview.id, {
          review: newReview.comment,
          rating: newReview.rating,
          type: getReviewType()
        });
      }

      setReviews(prev => prev.map(review => 
        review.id === editingReview.id 
          ? response.data 
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
      if (isLocationHotelType()) {
        await deleteLocationHotelReview(reviewId);
      } else {
        await deleteOtherReview(reviewId);
      }
      
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'star-filled' : 'star-empty'}`}>
        ★
      </span>
    ));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (isLoading) {
    return <div className="review-section">Loading reviews...</div>;
  }

  return (
    <div className="review-section">
      <div className="review-header">
        <div>
          <h3 className="review-title">Reviews</h3>
          {reviews.length > 0 && (
            <div className="review-stats">
              <div className="stars">{renderStars(Math.round(averageRating))}</div>
              <span className="review-average">{averageRating}</span>
              <span className="review-count">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="review-form">
          <h4 className="review-form-title">
            {editingReview ? 'Edit Review' : 'Write a Review'}
          </h4>
          <form onSubmit={editingReview ? handleUpdateReview : handleSubmitReview}>
            <div className="form-group">
              <label className="form-label">
                Rating
              </label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    className={`rating-star ${star <= newReview.rating ? 'rating-star-filled' : 'rating-star-empty'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="form-textarea"
                placeholder="Share your experience..."
                required
              />
            </div>
            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
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
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {!isAuthenticated && (
        <div className="login-notice">
          <p className="login-notice-text">Please log in to write a review.</p>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-content">
                <div className="review-user-section">
                  <img
                    src={review.user?.avatar || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"}
                    alt={review.user?.name || 'User'}
                    className="review-avatar"
                  />
                  <div className="review-details">
                    <div className="review-user-header">
                      <h5 className="review-username">{review.user?.name || 'Anonymous'}</h5>
                      <div className="stars">{renderStars(review.rating)}</div>
                    </div>
                    <p className="review-comment">{isLocationHotelType() ? review.comment : review.review}</p>
                    <p className="review-date">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {user && user.id === review.user_id && (
                  <div className="review-actions">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="review-action"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="review-action review-action-delete"
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