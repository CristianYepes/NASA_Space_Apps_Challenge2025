import React from 'react';
import { Telescope, Upload, Edit, BarChart3, Settings, FileText } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'manual', label: 'Manual Input', icon: Edit },
    { id: 'stats', label: 'Model Stats', icon: FileText },
    { id: 'hyperparameters', label: 'Tuning', icon: Settings },
    { id: 'results', label: 'Results', icon: Telescope },
  ];

  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Telescope className="w-10 h-10 text-nasa-blue" />
            <div>
              <h1 className="text-2xl font-bold text-white">Exoplanet Hunter</h1>
              <p className="text-sm text-gray-400">NASA Space Apps Challenge 2025</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="px-4 py-2 bg-nasa-blue bg-opacity-20 rounded-lg border border-nasa-blue">
              <p className="text-xs text-gray-400">Powered by</p>
              <p className="text-sm font-bold text-nasa-blue">AI/ML Technology</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-300 ${
                  activeTab === item.id
                    ? 'bg-nasa-blue text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
