import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { TrendingUp, Users, Wrench, ShieldCheck, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';

const USER_GROWTH_DATA = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 850 },
  { name: 'Mar', users: 1200 },
  { name: 'Apr', users: 1800 },
  { name: 'May', users: 2400 },
  { name: 'Jun', users: 3100 },
];

const SERVICE_REQUESTS_DATA = [
  { name: 'Mon', requests: 45 },
  { name: 'Tue', requests: 52 },
  { name: 'Wed', requests: 38 },
  { name: 'Thu', requests: 65 },
  { name: 'Fri', requests: 88 },
  { name: 'Sat', requests: 120 },
  { name: 'Sun', requests: 95 },
];

const STATS = [
  { label: 'Total Users', value: '3,100', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Services', value: '142', change: '+8.2%', icon: Wrench, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Platform Health', value: '99.9%', change: 'Nominal', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Monthly Growth', value: '24%', change: '+4.1%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export const AnalyticsOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Platform Analytics</h1>
        <p className="text-gray-500 mt-1.5">Deep dive into platform performance and user engagement metrics.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-5">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                   <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                   <span className="text-[11px] font-bold text-emerald-500">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
              <p className="text-xs text-gray-400 font-medium">Monthly new registrations</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
               <Users className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px] pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={USER_GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#000', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#000"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Requests Chart */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Service Requests</h3>
              <p className="text-xs text-gray-400 font-medium">Daily volume trend</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
               <Activity className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px] pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SERVICE_REQUESTS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <Tooltip
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                />
                <Bar
                  dataKey="requests"
                  fill="#000"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                >
                  {SERVICE_REQUESTS_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#a3e635' : '#000'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
