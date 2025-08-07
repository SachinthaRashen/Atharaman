import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Replace this with dynamic username if needed
  const username = "Sachintha";

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      console.log('Logging out...');
      // Add actual logout logic here: clear tokens, redirect, etc.
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 left-64 right-0 z-50">
      <div className="h-full flex items-center justify-between px-6 relative">

        {/* Spacer */}
        <div className="w-32"></div>

        {/* Centered Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-semibold text-gray-800">ATHARAMAN DASHBOARD</h1>
        </div>

        {/* Profile & Username */}
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          <span className="text-gray-700 font-medium">{username}</span>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <User className="text-gray-600 text-xl" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;