import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { useCollection } from '../../hooks/useFirestore';
import { DataTable } from '../../components/ui/DataTable';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { User, Shield, ShieldAlert, Store, UserCircle, Edit2, Trash2, Power, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { AuthUser, UserRole, UserStatus } from '../../types/auth';
import { firestoreService } from '../../services/firestore';

interface UserFormData {
  displayName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export const UserManagement: React.FC = () => {
  const { data: mobileUsers, loading: loadingMobile } = useCollection<AuthUser & { id: string }>('users_mobile');
  const { data: webUsers, loading: loadingWeb } = useCollection<AuthUser & { id: string }>('users_web');

  const [activeTab, setActiveTab] = useState<'Mobile' | 'Web'>('Mobile');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(AuthUser & { id: string }) | null>(null);

  const { register, handleSubmit, reset } = useForm<UserFormData>();

  const openAddModal = () => {
    setSelectedUser(null);
    reset({
      displayName: '',
      email: '',
      role: activeTab === 'Mobile' ? 'customer' : 'user',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user: AuthUser & { id: string }) => {
    setSelectedUser(user);
    const name = activeTab === 'Mobile' ? (user as any).fullName : user.displayName;
    reset({
      displayName: name || '',
      email: user.email || '',
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (user: AuthUser & { id: string }) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: UserFormData) => {
    const collectionName = activeTab === 'Mobile' ? 'users_mobile' : 'users_web';

    // Adapt data based on collection schema
    const finalData: any = {
      email: data.email,
      role: data.role,
      status: data.status,
      updatedAt: { ".sv": "timestamp" }
    };

    if (activeTab === 'Mobile') {
      finalData.fullName = data.displayName;
      if (!selectedUser) {
        finalData.createdAt = { ".sv": "timestamp" };
        finalData.photoURL = "";
        finalData.phoneNumber = "";
      }
    } else {
      finalData.displayName = data.displayName;
      if (!selectedUser) {
        finalData.createdAt = new Date().toISOString();
        finalData.photoURL = "";
      }
    }

    try {
      if (selectedUser) {
        await firestoreService.update(collectionName, selectedUser.id, finalData);
      } else {
        await firestoreService.create(collectionName, finalData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    const collectionName = activeTab === 'Mobile' ? 'users_mobile' : 'users_web';
    try {
      await firestoreService.delete(collectionName, selectedUser.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const toggleStatus = async (user: AuthUser & { id: string }) => {
    const collectionName = activeTab === 'Mobile' ? 'users_mobile' : 'users_web';
    const newStatus: UserStatus = user.status === 'active' ? 'suspended' : 'active';
    await firestoreService.update(collectionName, user.id, { status: newStatus });
  };

  const columns: ColumnDef<AuthUser & { id: string }>[] = [
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => {
        const name = activeTab === 'Mobile' ? (row.original as any).fullName : row.original.displayName;
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
               {row.original.photoURL ? (
                 <img src={row.original.photoURL} alt="" className="w-full h-full object-cover" />
               ) : (
                 <UserCircle className="w-5 h-5 text-gray-400" />
               )}
            </div>
            <div>
              <div className="font-bold text-gray-900">{name || 'Anonymous'}</div>
              <div className="text-xs text-gray-400 font-medium">{row.original.email}</div>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        const roleConfig: Record<string, { icon: any, color: string, bg: string }> = {
          superadmin: { icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
          admin: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
          repairshop: { icon: Store, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          mechanic: { icon: User, color: 'text-amber-600', bg: 'bg-amber-50' },
          customer: { icon: UserCircle, color: 'text-gray-600', bg: 'bg-gray-50' },
        };
        const config = roleConfig[role] || roleConfig.customer;
        const Icon = config.icon;

        return (
          <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider", config.bg, config.color)}>
            <Icon className="w-3 h-3" />
            {role}
          </div>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              status === 'active' ? "bg-emerald-500" : status === 'suspended' ? "bg-red-500" : "bg-gray-300"
            )} />
            <span className="text-sm font-medium capitalize">{status}</span>
          </div>
        );
      }
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
           <button
             onClick={() => openEditModal(row.original)}
             className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all"
           >
             <Edit2 className="w-4 h-4" />
           </button>
           <button
             onClick={() => toggleStatus(row.original)}
             className={cn(
               "p-2 rounded-lg transition-all",
               row.original.status === 'active' ? "hover:bg-red-50 text-gray-400 hover:text-red-500" : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-500"
             )}
             title={row.original.status === 'active' ? "Suspend User" : "Activate User"}
           >
             <Power className="w-4 h-4" />
           </button>
           <button
             onClick={() => openDeleteModal(row.original)}
             className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
           >
             <Trash2 className="w-4 h-4" />
           </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-1">Manage system roles, permissions and account statuses.</p>
        </div>
        <Button onClick={openAddModal}>
          + Add New User
        </Button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('Mobile')}
          className={cn(
            "pb-3 px-4 text-sm font-bold transition-all border-b-2",
            activeTab === 'Mobile' ? "border-black text-black" : "border-transparent text-gray-400 hover:text-gray-600"
          )}
        >
          Mobile Users (Customers/Mechanics)
        </button>
        <button
          onClick={() => setActiveTab('Web')}
          className={cn(
            "pb-3 px-4 text-sm font-bold transition-all border-b-2",
            activeTab === 'Web' ? "border-black text-black" : "border-transparent text-gray-400 hover:text-gray-600"
          )}
        >
          Web Users (Admins/Superadmins)
        </button>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={activeTab === 'Mobile' ? mobileUsers : webUsers}
            loading={activeTab === 'Mobile' ? loadingMobile : loadingWeb}
            searchPlaceholder={`Search ${activeTab.toLowerCase()} users...`}
          />
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User Profile' : 'Add New User'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input
                {...register('displayName', { required: true })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input
                {...register('email', { required: true })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                placeholder="email@example.com"
                type="email"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Role</label>
                <select
                  {...register('role')}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all appearance-none"
                >
                  <option value="customer">Customer</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Account Status</label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {selectedUser ? 'Update Profile' : 'Create User'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
        className="max-w-md"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
             <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-gray-900">Are you absolutely sure?</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              This will permanently delete <b>{selectedUser?.displayName || selectedUser?.email}</b> and all associated data. This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>
              No, Keep User
            </Button>
            <Button variant="danger" className="flex-1" onClick={handleDelete}>
              Yes, Delete User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
