import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Admin Components
import Navbar from './admin/components/Navbar';
import Sidebar from './admin/components/Sidebar';
// Admin Pages
import Dashboard from './admin/pages/Dashboard';
import ManageLocations from './admin/pages/ManageLocations';
import ManageGuides from './admin/pages/ManageGuides';
import ManageShopOwners from './admin/pages/ManageShopOwners';
import ManageHotelOwners from './admin/pages/ManageHotelOwners';
import ManageVehicleOwners from './admin/pages/ManageVehicleOwners';
import ManageRequests from './admin/pages/ManageRequests';
import ManageReviews from './admin/pages/ManageReviews';
import ManageUsers from './admin/pages/ManageUsers';
// User Components
import GuidesSection from './user/components/guides/GuidesSection';
import HotelsSection from './user/components/hotels/HotelsSection';
import ShopsSection from './user/components/shops/ShopsSection';
import VehiclesSection from './user/components/vehicles/VehiclesSection';
// User Pages
import Home from './user/pages/Home';
import UserProfilePage from './user/pages/UserProfilePage';
import PrivacyPolicy from './user/pages/PrivacyPolicy';
import Settings from './user/pages/Settings';
import TermsAndConditions from './user/pages/TermsAndConditions';
import ForgotPassword from './user/pages/ForgotPassword';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isAdminRoute ? (
          // Admin Layout
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 ml-64 p-6">
                <Routes location={location} key={location.pathname}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/locations" element={<ManageLocations />} />
                  <Route path="/admin/guides" element={<ManageGuides />} />
                  <Route path="/admin/shopowners" element={<ManageShopOwners />} />
                  <Route path="/admin/hotelowners" element={<ManageHotelOwners />} />
                  <Route path="/admin/vehicleowners" element={<ManageVehicleOwners />} />
                  <Route path="/admin/requests" element={<ManageRequests />} />
                  <Route path="/admin/reviews" element={<ManageReviews />} />
                  <Route path="/admin/users" element={<ManageUsers />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          // User Layout
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/guides" element={<GuidesSection />} />
            <Route path="/hotels" element={<HotelsSection />} />
            <Route path="/shops" element={<ShopsSection />} />
            <Route path="/vehicles" element={<VehiclesSection />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}