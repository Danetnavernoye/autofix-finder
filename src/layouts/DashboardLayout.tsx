import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Store,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  ChevronRight,
  Search,
  Wrench,
  BarChart3,
  Calendar,
  ShieldAlert,
  Navigation
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { cn } from '../utils/cn';

const SIDEBAR_ITEMS = [
  {
    title: 'Overview',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['superadmin', 'admin', 'user']
  },
  {
    title: 'User Management',
    path: '/admin/users',
    icon: Users,
    roles: ['superadmin', 'admin']
  },
  {
    title: 'Repair Shops',
    path: '/admin/shops',
    icon: Store,
    roles: ['superadmin', 'admin']
  },
  {
    title: 'Map Markers',
    path: '/admin/map-shops',
    icon: Navigation,
    roles: ['superadmin', 'admin']
  },
  {
    title: 'Appointments',
    path: '/admin/appointments',
    icon: Calendar,
    roles: ['superadmin', 'admin']
  },
  {
    title: 'Notifications',
    path: '/admin/notifications',
    icon: Bell,
    roles: ['superadmin', 'admin']
  },
  {
    title: 'Analytics',
    path: '/admin/analytics',
    icon: BarChart3,
    roles: ['superadmin', 'admin', 'user']
  },
  {
    title: 'System Logs',
    path: '/superadmin/logs',
    icon: ShieldAlert,
    roles: ['superadmin']
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: Settings,
    roles: ['superadmin', 'admin', 'user']
  },
];

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const filteredItems = SIDEBAR_ITEMS.filter(item =>
    !item.roles || (user?.role && item.roles.includes(user.role))
  );

  const isSuperAdmin = user?.role === 'superadmin';

  if (isSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-50 flex flex-col"
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white">
              <Wrench className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg tracking-tight">AutoFix</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                  isActive
                    ? "bg-black text-white shadow-lg shadow-black/5"
                    : "text-gray-500 hover:bg-gray-50 hover:text-black"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-black")} />
                {sidebarOpen && (
                  <span className="font-medium text-[14px]">{item.title}</span>
                )}
                {isActive && sidebarOpen && (
                  <motion.div layoutId="active-pill" className="ml-auto">
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="font-medium text-[14px]">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 min-h-screen flex flex-col",
          sidebarOpen ? "pl-[280px]" : "pl-[80px]"
        )}
      >
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-8 w-px bg-gray-200 mx-2" />

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-bold leading-none">{user?.displayName || 'Admin User'}</div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mt-1">{user?.role}</div>
                </div>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-gray-50 mb-1">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</div>
                    </div>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                      <User className="w-4 h-4 text-gray-400" /> Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" /> Settings
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-sm font-medium text-red-500 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
