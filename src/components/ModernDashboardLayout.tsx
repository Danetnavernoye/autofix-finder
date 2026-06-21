import React from 'react';
import { Header } from './Header';

interface ModernDashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const ModernDashboardLayout: React.FC<ModernDashboardLayoutProps> = ({
  title,
  children,
}) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 18) return '☀️ Good Afternoon';
    return '🌙 Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header title={title} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{greeting()}</h2>
          <p className="text-gray-500 mt-1">Welcome back! Here's your dashboard overview.</p>
        </div>

        {/* Dashboard Content */}
        <div>{children}</div>
      </main>
    </div>
  );
};

