import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Unauthorized } from './pages/Unauthorized';
import { DashboardLayout } from './layouts/DashboardLayout';

// Dashboard Pages
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserManagement } from './features/users/UserManagement';
import { AnalyticsOverview } from './features/analytics/AnalyticsOverview';
import { NotificationCenter } from './features/notifications/NotificationCenter';
import { VerifySync } from './pages/VerifySync';
import { ShopManagement } from './features/shops/ShopManagement';
import { RegisteredShops } from './features/shops/RegisteredShops';
import { AppointmentManagement } from './features/appointments/AppointmentManagement';

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4f2ed]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Initializing AutoFix...</p>
        </div>
      </div>
    );
  }

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/verify-sync" element={<VerifySync />} />

        {/* Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Smart Redirect /dashboard */}
          <Route
            path="/dashboard"
            element={
              <DashboardRedirect />
            }
          />

          {/* Feature Routes */}
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/shops" element={<ShopManagement />} />
          <Route path="/admin/map-shops" element={<RegisteredShops />} />
          <Route path="/admin/appointments" element={<AppointmentManagement />} />
          <Route path="/admin/notifications" element={<NotificationCenter />} />
          <Route path="/admin/analytics" element={<AnalyticsOverview />} />
          <Route path="/admin/settings" element={<div>Settings</div>} />

          {/* Super Admin Only */}
          <Route path="/superadmin/logs" element={<div>System Logs</div>} />
        </Route>

        {/* Legacy redirects */}
        <Route path="/superadmin/dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Navigate to="/dashboard" replace />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

const DashboardRedirect = () => {
  const { user } = useAuthStore();

  if (user?.role === 'superadmin') return <SuperAdminDashboard />;
  if (user?.role === 'admin' || user?.role === 'user') return <AdminDashboard />;

  return <Navigate to="/unauthorized" replace />;
};

export default App;
