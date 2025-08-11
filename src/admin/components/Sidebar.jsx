import React from 'react';
import { LayoutDashboard, MapPin, Users, Store, Building2, Car, GitPullRequest, FileText, UserStar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Logo.jpg';

const Sidebar = () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin', end: true },
    { id: 'locations', label: 'Locations', icon: MapPin, path: '/admin/locations' },
    { id: 'guides', label: 'Guides', icon: Users, path: '/admin/guides' },
    { id: 'shop-owners', label: 'Shop Owners', icon: Store, path: '/admin/shopowners' },
    { id: 'hotel-owners', label: 'Hotel Owners', icon: Building2, path: '/admin/hotelowners' },
    { id: 'vehicle-owners', label: 'Vehicle Owners', icon: Car, path: '/admin/vehicleowners' },
    { id: 'requests', label: 'Requests', icon: GitPullRequest, path: '/admin/requests' },
    { id: 'reviews', label: 'Reviews', icon: FileText, path: '/admin/reviews' },
    { id: 'users', label: 'Users', icon: UserStar, path: '/admin/users' },
  ];

  return (
    <aside className="bg-white w-64 h-screen fixed left-0 top-0 shadow-lg border-r border-gray-200 z-40">
      <div className="bg-black w-full h-32 flex items-center justify-center">
        <img src={logo} className="w-32" alt="Logo" />
      </div>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.end}
                className={({ isActive }) => 
                  `w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                <Icon className="size-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;