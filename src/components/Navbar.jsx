import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-800">ADMIN DASHBOARD</h1>
      </div>
    </nav>
  );
};

export default Navbar;