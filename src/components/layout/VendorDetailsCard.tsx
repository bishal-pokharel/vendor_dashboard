import { Vendor } from '@/types/vendor';
import { X, Mail, Phone, MapPin, Briefcase, Wrench, Calendar } from 'lucide-react';
import DetailRow from './DetailRow';

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onEdit: (vendor: Vendor) => void;
}

export default function VendorDetailModal({ vendor, onClose, onEdit }: VendorDetailModalProps) {

  // if no vendor selected don't render anything
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal box */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md z-10
                      animate-in fade-in slide-in-from-bottom-4 duration-200">

        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-800">Vendor Details</h2>
            <p className="text-xs text-gray-400 mt-0.5">{vendor.email}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400
                       hover:text-gray-600 hover:bg-gray-100 transition-all duration-150"
          >
            <X size={16} />
          </button>
        </div>

        {/* body — reusable DetailRow for each field */}
        <div className="px-6 py-5 space-y-1">
          <DetailRow icon={<Mail size={14} />}      label="Email"            value={vendor.email} />
          <DetailRow icon={<Phone size={14} />}     label="Phone"            value={vendor.phoneNumber} />
          <DetailRow icon={<MapPin size={14} />}    label="Postcode"         value={vendor.postcode} />
          <DetailRow icon={<Briefcase size={14} />} label="Vendor Type"      value={vendor.vendorType} />
          <DetailRow icon={<Wrench size={14} />}    label="Service Offering" value={vendor.serviceOffering} />
          <DetailRow icon={<Calendar size={14} />}  label="Signup Date"      value={
            new Date(vendor.signupDate).toLocaleDateString('en-US', {
              month: 'numeric', day: 'numeric', year: 'numeric',
            })
          } />

          {/* status row — custom because it has a colored badge */}
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Status
            </span>
            <span className={`
              inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
              ${vendor.status === 'Onboarded'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-red-50 text-red-500'}
            `}>
              <span className={`
                w-1.5 h-1.5 rounded-full
                ${vendor.status === 'Onboarded' ? 'bg-emerald-500' : 'bg-red-400'}
              `} />
              {vendor.status}
            </span>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100
                       hover:bg-gray-200 rounded-lg transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={() => onEdit(vendor)}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600
                       hover:bg-blue-700 rounded-lg transition-all duration-150 shadow-sm"
          >
            Edit Vendor
          </button>
        </div>

      </div>
    </div>
  );
}