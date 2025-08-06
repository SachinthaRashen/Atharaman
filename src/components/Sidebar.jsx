import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Store, 
  Building2, 
  Car, 
  FileText,
  Map
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'locations', label: 'Manage Locations', icon: MapPin },
    { id: 'guides', label: 'Manage Guides', icon: Users },
    { id: 'shop-owners', label: 'Manage Shop Owners', icon: Store },
    { id: 'hotel-owners', label: 'Manage Hotel Owners', icon: Building2 },
    { id: 'vehicle-owners', label: 'Manage Vehicle Owners', icon: Car },
    { id: 'requests', label: 'Manage Requests', icon: FileText },
  ];

  return (
    <aside className="bg-white w-64 h-screen fixed left-0 top-16 shadow-lg border-r border-gray-200 z-40">
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            <Map className="w-8 h-8" />
          </div>
          <h2 className="ml-3 text-xl font-bold text-gray-800">ATHARAMAN</h2>
        </div>
        
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