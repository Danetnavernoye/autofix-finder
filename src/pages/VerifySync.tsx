import React from 'react';
import { useCollection } from '../hooks/useFirestore';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { cn } from '../utils/cn';

export const VerifySync: React.FC = () => {
  const { data: users, loading } = useCollection<any>('users');

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Real-time Sync Verification</h1>
        <p className="text-gray-500">This page bypasses auth for testing purposes. Update a user status in the Firebase Console to see it change here instantly.</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Users in Firestore</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center text-gray-400 font-medium">Connecting to Firestore...</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {users.map((user: any) => (
                <div key={user.id} className="py-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{user.displayName || 'Unnamed User'}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full animate-pulse",
                      user.status === 'active' ? "bg-emerald-500" : user.status === 'suspended' ? "bg-red-500" : "bg-gray-300"
                    )} />
                    <span className="text-sm font-bold uppercase tracking-wider">{user.status || 'No Status'}</span>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <div className="py-12 text-center text-gray-400">No users found in the 'users' collection.</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
