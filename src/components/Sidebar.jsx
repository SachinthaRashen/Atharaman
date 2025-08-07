import React from 'react';
import { LayoutDashboard, MapPin, Users, Store, Building2, Car, GitPullRequest, FileText, UserStar, TentTree } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'guides', label: 'Guides', icon: Users },
    { id: 'shop-owners', label: 'Shop Owners', icon: Store },
    { id: 'hotel-owners', label: 'Hotel Owners', icon: Building2 },
    { id: 'vehicle-owners', label: 'Vehicle Owners', icon: Car },
    { id: 'requests', label: 'Requests', icon: GitPullRequest },
    { id: 'reviews', label: 'Reviews', icon: FileText },
    { id: 'users', label: 'Users', icon: UserStar },
  ];

  return (
    <aside className="bg-white w-64 h-screen fixed left-0 top-0 shadow-lg border-r border-gray-200 z-40">
      <div className="bg-black w-full h-32 flex items-center justify-center">
        <img src='src/assets/Logo.jpg' className="w-32"/>
      </div>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;