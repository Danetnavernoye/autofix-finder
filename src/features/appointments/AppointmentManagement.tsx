import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { useCollection } from '../../hooks/useFirestore';
import { DataTable } from '../../components/ui/DataTable';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Calendar, User, Wrench, Clock, CheckCircle2, XCircle, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { firestoreService } from '../../services/firestore';

interface AppointmentFormData {
  customerName: string;
  vehicle: string;
  serviceType: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const AppointmentManagement: React.FC = () => {
  const { data: appointments, loading } = useCollection<any>('appointments');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  const { register, handleSubmit, reset } = useForm<AppointmentFormData>();

  const openAddModal = () => {
    setSelectedAppointment(null);
    reset({ customerName: '', vehicle: '', serviceType: '', date: '', status: 'pending' });
    setIsModalOpen(true);
  };

  const openEditModal = (appointment: any) => {
    setSelectedAppointment(appointment);
    reset({
      customerName: appointment.customerName,
      vehicle: appointment.vehicle,
      serviceType: appointment.serviceType,
      date: appointment.date,
      status: appointment.status
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      if (selectedAppointment) {
        await firestoreService.update('appointments', selectedAppointment.id, data);
      } else {
        await firestoreService.create('appointments', data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save appointment:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedAppointment) return;
    try {
      await firestoreService.delete('appointments', selectedAppointment.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'customerName',
      header: 'Customer',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <User className="w-4 h-4" />
          </div>
          <div className="font-bold text-gray-900">{row.getValue('customerName')}</div>
        </div>
      )
    },
    {
      accessorKey: 'vehicle',
      header: 'Vehicle',
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 font-medium">
          {row.getValue('vehicle')}
        </div>
      )
    },
    {
      accessorKey: 'serviceType',
      header: 'Service',
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold border border-gray-100">
          <Wrench className="w-3 h-3" />
          {row.getValue('serviceType')}
        </div>
      )
    },
    {
      accessorKey: 'date',
      header: 'Date & Time',
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          {row.getValue('date')}
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const config: Record<string, { color: string, bg: string, icon: any }> = {
          pending: { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
          confirmed: { color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle2 },
          completed: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
          cancelled: { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
        };
        const item = config[status] || config.pending;
        const Icon = item.icon;
        return (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.bg} ${item.color}`}>
            <Icon className="w-3 h-3" />
            {status}
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
             onClick={() => { setSelectedAppointment(row.original); setIsDeleteModalOpen(true); }}
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
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-gray-500 mt-1">Track and manage service bookings and rescue requests.</p>
        </div>
        <Button onClick={openAddModal}>
          + New Appointment
        </Button>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={appointments}
            loading={loading}
            searchPlaceholder="Search by customer or vehicle..."
          />
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAppointment ? 'Update Appointment' : 'Create Appointment'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Customer Name</label>
              <input
                {...register('customerName', { required: true })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                placeholder="Juan dela Cruz"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Vehicle</label>
                <input
                  {...register('vehicle', { required: true })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                  placeholder="e.g., Car (Toyota Vios)"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Service Type</label>
                <input
                  {...register('serviceType', { required: true })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                  placeholder="e.g., Tire Change"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Date & Time</label>
              <input
                {...register('date', { required: true })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all"
                type="datetime-local"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1">Status</label>
              <select
                {...register('status')}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all appearance-none"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {selectedAppointment ? 'Save Changes' : 'Create Appointment'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Cancel Appointment"
        className="max-w-md"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
             <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-gray-900">Cancel this booking?</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              This will permanently delete the appointment for <b>{selectedAppointment?.customerName}</b>. This action is irreversible.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>
              Back
            </Button>
            <Button variant="danger" className="flex-1" onClick={handleDelete}>
              Delete Appointment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
