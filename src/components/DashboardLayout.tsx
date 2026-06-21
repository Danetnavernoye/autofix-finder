import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface DashboardLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getRoleLabel = (role: string | null | undefined): string => {
    switch (role) {
      case 'superadmin':
        return 'Super Admin';
      case 'admin':
        return 'Administrator';
      case 'repairshop':
        return 'Repair Shop Owner';
      case 'mechanic':
        return 'Mechanic';
      case 'customer':
        return 'Customer';
      default:
        return 'User';
    }
  };

  const getRoleColor = (role: string | null | undefined): string => {
    switch (role) {
      case 'superadmin':
        return 'from-purple-600 to-pink-600';
      case 'admin':
        return 'from-blue-600 to-cyan-500';
      case 'repairshop':
        return 'from-green-600 to-emerald-500';
      default:
        return 'from-gray-600 to-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col shadow-xl`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🔧</div>
              <div>
                <h1 className="text-lg font-bold">AutoFix</h1>
                <p className="text-xs text-gray-400">Pro Edition</p>
              </div>
            </div>
          ) : (
            <div className="text-2xl">🔧</div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-100 hover:bg-gray-700 rounded-lg transition duration-200 font-medium"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"></path>
              <path fillRule="evenodd" d="M14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
            </svg>
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </a>

          {sidebarOpen && (
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Quick Access</p>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white mt-2">
                📊 Reports
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white">
                ⚙️ Settings
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white">
                🔔 Notifications
              </a>
            </div>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(user?.role)} rounded-lg flex items-center justify-center font-bold text-sm shadow-lg`}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                <p className="text-xs text-gray-400">{getRoleLabel(user?.role)}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition flex items-center justify-center"
          >
            {sidebarOpen ? '🚪 Logout' : '⏻'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-600">ROLE</p>
                <p className="text-sm font-bold text-blue-600">{getRoleLabel(user?.role)}</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
              ⏰
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

