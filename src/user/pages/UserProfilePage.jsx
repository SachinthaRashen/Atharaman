import React from 'react';
import UserProfile from '../components/UserProfile';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function UserProfilePage() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-green-50/80 to-blue-50/80 flex flex-col">
      <Navbar />
      
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
        <UserProfile />
      </main>
      
      <Footer />
    </div>
  );
}

export default UserProfilePage;