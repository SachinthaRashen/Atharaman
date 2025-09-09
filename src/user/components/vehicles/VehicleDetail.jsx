import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  DollarSign,
  User,
  Mail,
  Fuel,
  UserCheck,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../Navbar";
import { getReviewsByEntity, getVehiclesByOwner } from "../../../services/api";
import ReviewSection from "../ReviewSection";

export const VehicleDetail = ({ vehicle, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [owner, setOwner] = useState(null);

  const placeholderImage = "/assets/placeholder.png"; // fallback image

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const nextImage = () => {
    if (vehicle?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const prevImage = () => {
    if (vehicle?.images?.length) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length
      );
    }
  };

  useEffect(() => {
    const fetchVehicleReviews = async () => {
      if (vehicle?.id) {
        try {
          setReviewsLoading(true);
          const response = await getReviewsByEntity("vehicle", vehicle.id);
          setReviews(response.data || []);

          if (response.data.length > 0) {
            const totalRating = response.data.reduce(
              (sum, review) => sum + review.rating,
              0
            );
            setAverageRating(totalRating / response.data.length);
          }
        } catch (error) {
          console.error("Error fetching vehicle reviews:", error);
        } finally {
          setReviewsLoading(false);
        }
      }
    };
    fetchVehicleReviews();
  }, [vehicle?.id]);

  useEffect(() => {
    const fetchOwner = async () => {
      if (vehicle?.vehicle_owner_id) {
        try {
          const response = await getVehiclesByOwner(vehicle.vehicle_owner_id);
          setOwner(response.data); // vehicle owner object
        } catch (error) {
          console.error("Error fetching owner:", error);
        }
      }
    };

    fetchOwner();
  }, [vehicle?.vehicle_owner_id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-dvh bg-gray-50 pt-16">
      <Navbar onScrollToSection={scrollToSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* IMAGE SLIDER */}
          <div className="relative h-64 md:h-80">
            <img
              src={vehicle?.images?.[currentImageIndex] || placeholderImage}
              alt={vehicle?.name || "Vehicle"}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {vehicle?.images?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white/90 rounded-full p-2 transition-all"
                >
                  <ChevronLeft className="size-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white/90 rounded-full p-2 transition-all"
                >
                  <ChevronRight className="size-5 text-gray-700" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {vehicle.images?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`size-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              onClick={onBack}
              className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
            >
              <ArrowLeft className="size-5 text-gray-700" />
            </button>
          </div>

          {/* DETAILS */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {vehicle?.name || "Unnamed Vehicle"}
                </h1>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {vehicle?.type || "Unknown Type"}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center text-2xl font-bold text-emerald-600">
                  <DollarSign className="size-6" />
                  <span>{vehicle?.pricePerDay || 0}</span>
                </div>
                <span className="text-sm text-gray-500">per day</span>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="size-5 text-emerald-600" />
                <span>{vehicle?.location || "No location provided"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Fuel className="size-5 text-emerald-600" />
                <span>{vehicle?.mileage || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                {vehicle?.withDriver ? (
                  <>
                    <UserCheck className="size-5 text-green-600" />
                    <span>Driver included</span>
                  </>
                ) : (
                  <>
                    <X className="size-5 text-red-500" />
                    <span>Self-drive only</span>
                  </>
                )}
              </div>
            </div>

            {/* ABOUT */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  About
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {vehicle?.description || "No description available."}
                </p>
              </div>

              {/* OWNER */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Owner Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="size-5 text-emerald-600" />
                    <span>{vehicle?.vehicleOwnerName || "Unknown Owner"}</span>
                  </div>
                  {vehicle?.ownerContact && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="size-5 text-emerald-600" />
                      <a
                        href={`mailto:${vehicle.ownerContact}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {vehicle.ownerContact}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* REVIEWS */}
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Customer Reviews
                </h2>

                {reviews.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-emerald-600">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center mt-1">
                          {renderStars(Math.round(averageRating))}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {reviews.length} review
                          {reviews.length !== 1 ? "s" : ""}
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = reviews.filter(
                            (review) => review.rating === star
                          ).length;
                          const percentage =
                            reviews.length > 0
                              ? (count / reviews.length) * 100
                              : 0;

                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 w-4">
                                {star}
                              </span>
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-8 text-right">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  !reviewsLoading && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                      <p className="text-gray-500">
                        No reviews yet. Be the first to review this vehicle!
                      </p>
                    </div>
                  )
                )}

                {/* ReviewSection Component */}
                <ReviewSection entityType="vehicle" entityId={vehicle?.id} />
              </div>
            </div>

            {/* BOOK BUTTON */}
            <div className="mt-8 pt-6 border-t">
              <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Book Vehicle
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetail;
