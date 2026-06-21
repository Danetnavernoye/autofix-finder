import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Store,
  ShieldCheck,
  Activity,
  Server,
  Database,
  Layers,
  Bell,
  ChevronRight,
  Terminal,
  Radio,
  Download,
  MapPin,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  Search,
  LogOut,
  UserCog,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Star,
  Zap,
  ArrowUpRight,
  Menu,
  X,
  User,
  Navigation,
  Shield,
  ShieldAlert,
  Power
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useCollection } from '../hooks/useFirestore';
import { useAuthStore } from '../store/authStore';
import { cn } from '../utils/cn';

// Import Feature Components
import { UserManagement } from '../features/users/UserManagement';
import { AppointmentManagement } from '../features/appointments/AppointmentManagement';
import { NotificationCenter } from '../features/notifications/NotificationCenter';
import { AnalyticsOverview } from '../features/analytics/AnalyticsOverview';
import { RegisteredShops } from '../features/shops/RegisteredShops';
import { ShopManagement } from '../features/shops/ShopManagement';

// Merged Component for SuperAdmin
const SuperAdminRegisteredShops: React.FC = () => {
  const [view, setView] = useState<'list' | 'map'>('list');
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setView('list')}
            className={cn("px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all", view === 'list' ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600")}
          >
            Shop Registry
          </button>
          <button
            onClick={() => setView('map')}
            className={cn("px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all", view === 'map' ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600")}
          >
            Live Map Markers
          </button>
        </div>
      </div>

      {view === 'list' ? <ShopManagement /> : <RegisteredShops />}
    </div>
  );
};

export const SuperAdminDashboard: React.FC = () => {
  const { data: users } = useCollection('users_web');
  const { data: shops } = useCollection('repair_shops');
  const { data: logs } = useCollection('logs');
  const { data: appointments } = useCollection('appointments');
  const { data: notifications } = useCollection('notifications');

  const [activeTab, setActiveTab] = useState('overview');
  const [liveTime, setLiveTime] = useState(new Date());
  const [trafficPulse, setTrafficPulse] = useState(842);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    const pulse = setInterval(() => setTrafficPulse(Math.floor(Math.random() * 200) + 700), 3000);
    return () => { clearInterval(timer); clearInterval(pulse); };
  }, []);

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'shops', label: 'Registered Shops', icon: Store },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'logs', label: 'System Logs', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = useMemo(() => [
    { label: 'Total Admins', value: (users || []).filter((u: any) => u.role === 'admin').length, icon: Users, meta: '+2 this month', up: true, tab: 'users' },
    { label: 'Active Shops', value: (shops || []).length, icon: Store, meta: '+9 this week', up: true, tab: 'shops' },
    { label: 'Platform Health', value: '99.9%', icon: ShieldCheck, meta: '30d uptime', up: true, accent: true, tab: 'overview' },
    { label: 'System Logs', value: (logs || []).length, icon: Activity, meta: 'Last 24h', up: true, tab: 'logs' },
  ], [users, shops, logs]);

  const trafficData = useMemo(() => Array.from({ length: 40 }, () => Math.floor(Math.random() * 80) + 20), []);

  const logTypeColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-400 bg-red-400/10';
      case 'warn': return 'text-amber-400 bg-amber-400/10';
      case 'success': return 'text-emerald-400 bg-emerald-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-black">
      {/* Top Header - Matches AdminDashboard Image exactly */}
      <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative group transition-colors">
            <Bell className="w-5 h-5 text-gray-500 group-hover:text-black" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          <div className="h-8 w-px bg-gray-200 mx-2" />

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-bold leading-none text-gray-900">{user?.displayName || 'Super Admin'}</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mt-1">{user?.role || 'SUPERADMIN'}</div>
              </div>
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-gray-50 mb-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Account</div>
                    </div>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                        <Settings className="w-4 h-4 text-gray-400" />
                      </div>
                      Settings
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm font-bold text-red-500 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-white transition-colors">
                        <LogOut className="w-4 h-4" />
                      </div>
                      Sign Out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Navigation Sub-header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-[1600px] mx-auto px-8 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 py-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-4 text-sm font-bold transition-all whitespace-nowrap group",
                  activeTab === item.id
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-black" : "text-gray-400 group-hover:text-gray-600")} />
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-black rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-black mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-[#c8f560] px-2 py-1">Super Admin</span>
                  <span className="font-mono text-[10px] text-gray-400 font-semibold tracking-widest uppercase">System Command v2.4.1</span>
                  <span className="font-mono text-[10px] text-gray-300">{liveTime.toLocaleTimeString('en-US', { hour12: false })}</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-black leading-none">Platform <span className="text-gray-400">Governance</span></h1>
                <p className="text-gray-500 max-w-xl leading-relaxed">Real-time operational intelligence across all AutoFix Finder infrastructure and transactional flows.</p>
              </div>
              <button className="flex items-center gap-2 font-mono text-[11px] font-bold px-5 py-3 border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-widest shrink-0">
                <Download className="w-4 h-4" /> Export Data (.CSV)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mb-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {stats.map((stat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(stat.tab)}
                  className={cn(
                    "p-8 relative min-h-[180px] flex flex-col justify-between text-left transition-all hover:brightness-95",
                    stat.accent ? "bg-[#c8f560]" : "bg-white"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <stat.icon className={cn("w-4 h-4", stat.accent ? "text-black" : "text-gray-400")} />
                      <span className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.2em]", stat.accent ? "text-black/60" : "text-gray-400")}>{stat.label}</span>
                    </div>
                    <div className={cn("w-3 h-3 rounded-full", stat.accent ? "bg-black" : "bg-[#c8f560]")} />
                  </div>
                  <div>
                    <div className="text-5xl font-bold tracking-tighter text-black leading-none mb-3">{stat.value}</div>
                    <div className="flex items-center gap-2">
                      <div className={cn("px-2 py-0.5 font-mono text-[10px] font-bold rounded", stat.accent ? "bg-black text-[#c8f560]" : "bg-[#a3c94a] text-white")}>
                        {stat.up ? '↑' : '↓'} {stat.meta.split(' ')[0]}
                      </div>
                      <span className={cn("font-mono text-[10px] font-medium tracking-tight", stat.accent ? "text-black/50" : "text-gray-400")}>{stat.meta.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <Card className="bg-black text-white border-transparent overflow-hidden rounded-2xl shadow-2xl">
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Radio className="w-5 h-5 text-[#c8f560] animate-pulse" />
                        <div>
                          <h2 className="text-lg font-bold tracking-tight">Infrastructure Monitor</h2>
                          <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Real-time telemetry</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[#c8f560] font-bold border border-[#c8f560]/30 px-2 py-1">HEALTHY</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
                      <HealthCell label="API Gateway" value="99.99%" status="good" icon={<Server className="w-4 h-4" />} />
                      <HealthCell label="Primary DB" value="0ms Lag" status="good" icon={<Database className="w-4 h-4" />} />
                      <HealthCell label="Job Queue" value="74 Wait" status="warn" icon={<Layers className="w-4 h-4" />} />
                      <HealthCell label="FCM Node" value="Nominal" status="good" icon={<Bell className="w-4 h-4" />} />
                    </div>

                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Live Traffic Flow</span>
                        <span className="font-mono text-[10px] text-[#c8f560]">{trafficPulse} REQ/S</span>
                      </div>
                      <div className="h-24 flex items-end gap-1">
                        {trafficData.map((h, i) => (
                          <div key={i} className={cn("flex-1 transition-all duration-500 rounded-t-sm", h > 70 ? "bg-[#c8f560]" : "bg-white/10")} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <Card className="h-fit border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900">Action Queue</h3>
                      <p className="text-xs text-gray-400 font-medium">Pending governance tasks</p>
                    </div>
                    <div className="divide-y divide-gray-50">
                      <ActionItem title="Review Admin Request" meta="olivia@northvale.io" time="2m ago" urgency="high" />
                      <ActionItem title="Shop Verification" meta="Bramblewick Auto" time="12m ago" urgency="high" />
                      <ActionItem title="Policy Update" meta="Q2 Compliance" time="3h ago" urgency="normal" />
                      <ActionItem title="DB Maintenance" meta="02:00 UTC Scheduled" time="5h ago" urgency="low" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Section Content */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'shops' && <SuperAdminRegisteredShops />}
          {activeTab === 'appointments' && <AppointmentManagement />}
          {activeTab === 'notifications' && <NotificationCenter />}
          {activeTab === 'analytics' && <AnalyticsOverview />}
          {activeTab === 'logs' && (
             <div className="bg-black border border-gray-800 overflow-hidden rounded-2xl shadow-2xl">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-[#c8f560]" />
                    <div>
                      <h3 className="text-base font-bold text-white">System Log Stream</h3>
                      <p className="text-[11px] text-white/30 font-mono uppercase tracking-wider">Real-time event pipeline</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#c8f560] rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-white/40 uppercase">LIVE</span>
                  </div>
                </div>
                <div className="p-0 max-h-[600px] overflow-y-auto font-mono text-[11px] divide-y divide-white/5 no-scrollbar">
                  {logs.length === 0 ? (
                    <div className="p-8 text-center text-white/20 text-sm">No log entries available</div>
                  ) : (
                    [...logs].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).map((log, idx) => (
                      <div key={log.id || idx} className="p-3 flex items-center gap-3 hover:bg-white/5 transition-colors">
                        <span className="text-white/20 text-[10px] shrink-0 w-14">
                          {new Date(log.timestamp || Date.now()).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0",
                          log.type === 'error' ? 'text-red-400 bg-red-400/10' :
                          log.type === 'warn' ? 'text-amber-400 bg-amber-400/10' :
                          log.type === 'success' ? 'text-emerald-400 bg-emerald-400/10' :
                          'text-blue-400 bg-blue-400/10'
                        )}>
                          {log.type || 'INFO'}
                        </span>
                        <span className="text-white/60 truncate">{log.message || 'System event recorded'}</span>
                      </div>
                    ))
                  )}
                  <div ref={logEndRef} />
                </div>
             </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
               <h2 className="text-2xl font-bold mb-4">System Settings</h2>
               <p className="text-gray-500">Configure global platform parameters and security policies.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <Wrench className="w-3 h-3 text-[#c8f560]" />
            </div>
            <span className="text-xs font-bold text-gray-900">AutoFix Finder</span>
            <span className="text-[10px] text-gray-400 font-mono">v2.4.1</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-gray-400 font-mono uppercase tracking-wider">
            <span>SuperAdmin Console</span>
            <span>•</span>
            <span>Secure Connection</span>
            <span>•</span>
            <span>{liveTime.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthCell = ({ label, value, status, icon }: any) => (
  <div className="p-6 space-y-2">
    <div className="flex items-center gap-2 text-white/40">
      {icon}
      <span className="font-mono text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className={cn("text-xl font-bold", status === 'good' ? "text-[#c8f560]" : "text-amber-400")}>{value}</div>
  </div>
);

const ActionItem = ({ title, meta, time, urgency }: any) => (
  <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
    <div className={cn(
      "w-2 h-2 rounded-full",
      urgency === 'high' ? "bg-red-500" : urgency === 'normal' ? "bg-amber-500" : "bg-gray-300"
    )} />
    <div className="flex-1">
      <div className="text-sm font-bold text-gray-900">{title}</div>
      <div className="text-[11px] text-gray-400 font-medium">{meta}</div>
    </div>
    <div className="text-right">
      <div className="text-[10px] text-gray-400 font-mono">{time}</div>
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-all ml-auto mt-1" />
    </div>
  </div>
);

export default SuperAdminDashboard;