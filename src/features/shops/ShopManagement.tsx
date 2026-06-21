import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { useCollection } from '../../hooks/useFirestore';
import { DataTable } from '../../components/ui/DataTable';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Store, MapPin, Phone, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { firestoreService } from '../../services/firestore';

interface ShopFormData {
  name: string;
  address: string;
  phone: string;
  ownerId: string;
  status: 'active' | 'pending' | 'suspended';
}

export const ShopManagement: React.FC = () => {
  const { data: shops, loading } = useCollection<any>('repair_shops');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<any | null>(null);

  const { register, handleSubmit, reset } = useForm<ShopFormData>();

  const openAddModal = () => {
    setSelectedShop(null);
    reset({ name: '', address: '', phone: '', ownerId: '', status: 'pending' });
    setIsModalOpen(true);
  };

  const openEditModal = (shop: any) => {
    setSelectedShop(shop);
    reset({
      name: shop.name,
      address: shop.address,
      phone: shop.phone,
      ownerId: shop.ownerId,
      status: shop.status
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (data: ShopFormData) => {
    try {
      if (selectedShop) {
        await firestoreService.update('repair_shops', selectedShop.id, data);
      } else {
        await firestoreService.create('repair_shops', data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save shop:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedShop) return;
    try {
      await firestoreService.delete('repair_shops', selectedShop.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete shop:', error);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'Shop Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.getValue('name')}</div>
            <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">ID: {row.original.id?.slice(0, 8)}...</div>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'address',
      header: 'Location',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-gray-500 max-w-[200px]">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate text-sm">{row.getValue('address')}</span>
        </div>
      )
    },
    {
      accessorKey: 'phone',
      header: 'Contact',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-gray-500">
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span className="text-sm">{row.getValue('phone')}</span>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const colors: Record<string, string> = {
          active: 'bg-emerald-50 text-emerald-600',
          pending: 'bg-amber-50 text-amber-600',
          suspended: 'bg-red-50 text-red-600'
        };
        return (
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
          </span>
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
             onClick={() => { setSelectedShop(row.original); setIsDeleteModalOpen(true); }}
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
          <h1 className="text-3xl font-bold tracking-tight">Repair Shops</h1>
          <p className="text-gray-500 mt-1">Manage partner repair shops and service centers.</p>
        </div>
        <Button onClick={openAddModal}>
          + Register New Shop
        </Button>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={shops}
            loading={loading}
            searchPlaceholder="Search by shop name or location..."
          />
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedShop ? 'Update Shop Profile' : 'Register New Shop'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Shop Name</label>
              <input
                {...register('name', { required: true })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                placeholder="AutoFix Center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Address</label>
              <textarea
                {...register('address', { required: true })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all resize-none"
                placeholder="123 MacArthur Hwy, Dagupan City"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                <input
                  {...register('phone', { required: true })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                  placeholder="0912 345 6789"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Owner User ID</label>
                <input
                  {...register('ownerId', { required: true })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                  placeholder="Paste Firebase UID"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Status</label>
              <select
                {...register('status')}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all appearance-none"
              >
                <option value="pending">Pending Review</option>
                <option value="active">Active/Verified</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {selectedShop ? 'Save Changes' : 'Register Shop'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Remove Shop"
        className="max-w-md"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
             <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-gray-900">Are you sure?</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              This will remove <b>{selectedShop?.name}</b> from the platform. Existing appointments may still refer to this shop ID.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" className="flex-1" onClick={handleDelete}>
              Delete Permanently
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
