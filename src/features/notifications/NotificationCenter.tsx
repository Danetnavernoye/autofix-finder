import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useCollection } from '../../hooks/useFirestore';
import { DataTable } from '../../components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  Send,
  Users,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface NotificationForm {
  title: string;
  message: string;
  type: 'announcement' | 'alert' | 'update';
  target: 'all' | 'mechanics' | 'customers';
}

export const NotificationCenter: React.FC = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<NotificationForm>();
  const [success, setSuccess] = useState(false);
  const { data: notifications, loading } = useCollection<any>('notifications');

  const onSubmit = async (data: NotificationForm) => {
    try {
      await addDoc(collection(db, 'notifications'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'sent',
      });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <div className="text-xs text-gray-500 font-medium">
          {row.original.createdAt?.toDate ? row.original.createdAt.toDate().toLocaleString() : 'Just now'}
        </div>
      )
    },
    {
      accessorKey: 'title',
      header: 'Notification',
      cell: ({ row }) => (
        <div>
          <div className="font-bold text-gray-900">{row.getValue('title')}</div>
          <div className="text-xs text-gray-400 line-clamp-1">{row.original.message}</div>
        </div>
      )
    },
    {
      accessorKey: 'target',
      header: 'Target',
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-600">
          <Users className="w-3 h-3" />
          {row.getValue('target')}
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: () => (
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          SENT
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notification Center</h1>
          <p className="text-gray-500 mt-1.5">Broadcast announcements and push notifications to Android devices.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Composer */}
        <Card className="lg:col-span-5 h-fit">
          <CardHeader>
            <h3 className="text-lg font-bold text-gray-900">New Broadcast</h3>
            <p className="text-xs text-gray-400 font-medium">Compose a message for your users</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Title</label>
                <input
                  {...register('title', { required: true })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                  placeholder="E.g., System Maintenance"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Message</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Target Group</label>
                  <select
                    {...register('target')}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all appearance-none"
                  >
                    <option value="all">All Users</option>
                    <option value="mechanics">Mechanics Only</option>
                    <option value="customers">Customers Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Notify Type</label>
                  <select
                    {...register('type')}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all appearance-none"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="alert">Emergency Alert</option>
                    <option value="update">App Update</option>
                  </select>
                </div>
              </div>

              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                   <CheckCircle2 className="w-5 h-5" />
                   Notification sent successfully!
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                isLoading={isSubmitting}
              >
                <Send className="w-4 h-4" />
                Broadcast Now
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="lg:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <p className="text-xs text-gray-400 font-medium">History of sent broadcasts</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
               <Clock className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={notifications}
              loading={loading}
              searchPlaceholder="Search history..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
