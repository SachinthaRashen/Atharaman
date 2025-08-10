import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageLocations from './pages/ManageLocations';
import ManageGuides from './pages/ManageGuides';
import ManageShopOwners from './pages/ManageShopOwners';
import ManageHotelOwners from './pages/ManageHotelOwners';
import ManageVehicleOwners from './pages/ManageVehicleOwners';
import ManageRequests from './pages/ManageRequests';
import ManageReviews from './pages/ManageReviews';
import ManageUsers from './pages/ManageUsers';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'locations':
        return <ManageLocations />;
      case 'guides':
        return <ManageGuides />;
      case 'shop-owners':
        return <ManageShopOwners />;
      case 'hotel-owners':
        return <ManageHotelOwners />;
      case 'vehicle-owners':
        return <ManageVehicleOwners />;
      case 'requests':
        return <ManageRequests />;
      case 'reviews':
        return <ManageReviews />;
      case 'users':
        return <ManageUsers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 ml-64 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;