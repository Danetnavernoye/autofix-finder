import React, { useState, useCallback, useRef } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { useCollection } from '../../hooks/useFirestore';
import { DataTable } from '../../components/ui/DataTable';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Store, Edit2, Trash2, AlertCircle, Navigation, Search, Loader2 } from 'lucide-react';
import { firestoreService } from '../../services/firestore';
import { cn } from '../../utils/cn';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY || '';

const libraries: "places"[] = ["places"];

interface RegisteredShopFormData {
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  category: 'General' | 'Tires' | 'Electrical' | 'Body Shop';
  status: 'active' | 'inactive';
}

const mapContainerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '24px'
};

const defaultCenter = {
  lat: 16.0433,
  lng: 120.3333
};

export const RegisteredShops: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  });

  const { data: shops, loading } = useCollection<any>('registered_repair_shops');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<any | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<RegisteredShopFormData>();

  const currentStatus = watch('status');

  const openAddModal = () => {
    setSelectedShop(null);
    setMarkerPos(null);
    setMapCenter(defaultCenter);
    reset({ name: '', address: '', phone: '', latitude: 0, longitude: 0, category: 'General', status: 'active' });
    setIsModalOpen(true);
  };

  const openEditModal = (shop: any) => {
    setSelectedShop(shop);
    const pos = { lat: Number(shop.latitude), lng: Number(shop.longitude) };
    setMarkerPos(pos);
    setMapCenter(pos);
    reset({
      name: shop.name,
      address: shop.address,
      phone: shop.phone,
      latitude: shop.latitude,
      longitude: shop.longitude,
      category: shop.category,
      status: shop.status
    });
    setIsModalOpen(true);
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const pos = { lat, lng };

        setMarkerPos(pos);
        setMapCenter(pos);
        setValue('latitude', lat);
        setValue('longitude', lng);
        setValue('address', place.formatted_address || '');
        if (place.name) setValue('name', place.name);
      }
    }
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const pos = { lat, lng };
      setMarkerPos(pos);
      setValue('latitude', lat);
      setValue('longitude', lng);
    }
  }, [setValue]);

  const onSubmit = async (data: RegisteredShopFormData) => {
    try {
      const formattedData = {
        ...data,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude)
      };

      if (selectedShop) {
        await firestoreService.update('registered_repair_shops', selectedShop.id, formattedData);
      } else {
        await firestoreService.create('registered_repair_shops', formattedData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save shop:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedShop) return;
    try {
      await firestoreService.delete('registered_repair_shops', selectedShop.id);
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
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shadow-black/10">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.getValue('name')}</div>
            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{row.original.category}</div>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'location',
      header: 'Map Coordinates',
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-gray-900 font-mono text-xs font-bold">
            <Navigation className="w-3 h-3 text-blue-500" />
            {Number(row.original.latitude).toFixed(4)}, {Number(row.original.longitude).toFixed(4)}
          </div>
          <div className="text-[11px] text-gray-400 truncate max-w-[180px]">{row.original.address}</div>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Map Visibility',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              status === 'active' ? "bg-emerald-500 animate-pulse" : "bg-gray-300"
            )} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
              {status === 'active' ? 'Visible on Map' : 'Hidden'}
            </span>
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
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Registered Repair Shops</h1>
          <p className="text-gray-500 mt-2 font-medium">Search and select shops to make them appear automatically on the Android mobile map.</p>
        </div>
        <Button onClick={openAddModal} size="lg" className="rounded-2xl">
          <Store className="w-5 h-5" />
          Add Shop to Map
        </Button>
      </div>

      <Card className="border-none shadow-xl shadow-black/5">
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={shops}
            loading={loading}
            searchPlaceholder="Filter shops by name..."
          />
        </CardContent>
      </Card>

      {/* Map Entry Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedShop ? 'Update Map Listing' : 'New Map Listing'}
        className="max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
             <div className="relative group">
                <div className="absolute left-4 top-4 z-10 w-[calc(100%-32px)]">
                  {isLoaded && (
                    <Autocomplete
                      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search for a shop or address..."
                          className="w-full pl-11 pr-4 py-3.5 bg-white border-none rounded-2xl shadow-2xl text-sm focus:ring-4 focus:ring-black/5 transition-all"
                        />
                      </div>
                    </Autocomplete>
                  )}
                </div>

                {loadError ? (
                  <div style={mapContainerStyle} className="bg-red-50 flex flex-col items-center justify-center p-8 text-center border border-red-100">
                    <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                    <h5 className="text-red-900 font-bold text-sm">Google Maps failed to load</h5>
                    <p className="text-red-600 text-[11px] mt-1">Please ensure "Maps JavaScript API" and "Places API" are enabled for your key in Google Cloud Console.</p>
                  </div>
                ) : isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={15}
                    onClick={onMapClick}
                    options={{
                      disableDefaultUI: true,
                      zoomControl: true,
                      styles: [
                        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
                      ]
                    }}
                  >
                    {markerPos && <Marker position={markerPos} />}
                  </GoogleMap>
                ) : (
                  <div style={mapContainerStyle} className="bg-gray-100 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
                  </div>
                )}

                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest pointer-events-none">
                  Click on map to manually adjust pin
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Latitude</span>
                  <span className="font-mono text-sm font-bold text-gray-900">{watch('latitude')?.toFixed(6) || '0.000000'}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Longitude</span>
                  <span className="font-mono text-sm font-bold text-gray-900">{watch('longitude')?.toFixed(6) || '0.000000'}</span>
                </div>
             </div>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Shop Name</label>
                  <input {...register('name', { required: true })} className="w-full px-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-black/5 transition-all" placeholder="e.g., Pangasinan Auto Care" />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Category</label>
                  <select {...register('category')} className="w-full px-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm appearance-none">
                     <option value="General">General Repair</option>
                     <option value="Tires">Tire Specialist</option>
                     <option value="Electrical">Electrical/Battery</option>
                     <option value="Body Shop">Body & Paint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Full Address</label>
                  <textarea {...register('address', { required: true })} className="w-full px-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm resize-none" rows={2} placeholder="Street, Barangay, City, Pangasinan" />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Visibility Status</label>
                  <div className="flex gap-2">
                     <button type="button" onClick={() => setValue('status', 'active')} className={cn("flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase transition-all", currentStatus === 'active' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-gray-100 text-gray-400")}>Active</button>
                     <button type="button" onClick={() => setValue('status', 'inactive')} className={cn("flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase transition-all", currentStatus === 'inactive' ? "bg-gray-500 text-white shadow-lg shadow-gray-500/20" : "bg-gray-100 text-gray-400")}>Hidden</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 rounded-2xl">
                  {selectedShop ? 'Update Map' : 'Add to Map'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Remove Marker" className="max-w-md">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
             <AlertCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-gray-900">Remove from Map?</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              This will permanently remove <b>{selectedShop?.name}</b> from the Android application's home screen map.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setIsDeleteModalOpen(false)}>Keep Marker</Button>
            <Button variant="danger" className="flex-1 rounded-xl" onClick={handleDelete}>Remove Now</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
