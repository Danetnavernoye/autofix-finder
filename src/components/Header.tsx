import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getRoleDisplay = (role?: string | null) => {
    const roleMap: Record<string, { label: string; color: string }> = {
      superadmin: { label: '👑 SuperAdmin', color: 'bg-purple-100 text-purple-800' },
      admin: { label: '🎯 Admin', color: 'bg-blue-100 text-blue-800' },
      user: { label: '👤 User', color: 'bg-green-100 text-green-800' },
    };
    return roleMap[role || ''] || { label: role || 'User', color: 'bg-gray-100 text-gray-800' };
  };

  const roleDisplay = getRoleDisplay(user?.role);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔧</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AutoFix Finder</h1>
            {title && <p className="text-sm text-gray-500">{title}</p>}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleDisplay.color}`}>
                    {roleDisplay.label}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

