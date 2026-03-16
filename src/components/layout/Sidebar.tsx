'use client';

import { useState } from 'react';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/types/vendor';
import { LayoutDashboard, ChevronRight } from 'lucide-react';

interface SidebarProps {
  onFilterChange: (filtered: Vendor[]) => void;
  onToast: (message: string) => void;
}

export default function Sidebar({ onFilterChange, onToast }: SidebarProps) {
  const [postcode, setPostcode]               = useState('');
  const [status, setStatus]                   = useState<string[]>([]);
  const [dateStart, setDateStart]             = useState('');
  const [dateEnd, setDateEnd]                 = useState('');
  const [vendorType, setVendorType]           = useState<string[]>([]);
  const [serviceOffering, setServiceOffering] = useState<string[]>([]);


  function toggleCheckbox(value: string, current: string[], setter: (v: string[]) => void) {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  }

  function handleApply() {
    let result = [...mockVendors];
    if (postcode.trim()) {
      result = result.filter((v) =>
        v.postcode.toLowerCase().includes(postcode.trim().toLowerCase())
      );
    }
    if (status.length > 0) {
      result = result.filter((v) => status.includes(v.status));
    }
    if (dateStart) {
      result = result.filter((v) => new Date(v.signupDate) >= new Date(dateStart));
    }
    if (dateEnd) {
      result = result.filter((v) => new Date(v.signupDate) <= new Date(dateEnd));
    }
    if (vendorType.length > 0) {
      result = result.filter((v) => vendorType.includes(v.vendorType));
    }
    if (serviceOffering.length > 0) {
      result = result.filter((v) => serviceOffering.includes(v.serviceOffering));
    }
    onFilterChange(result);
    onToast(`Filters applied: ${result.length} vendor${result.length !== 1 ? 's' : ''} found`);
  }

  function handleClear() {
    setPostcode('');
    setStatus([]);
    setDateStart('');
    setDateEnd('');
    setVendorType([]);
    setServiceOffering([]);
    onFilterChange(mockVendors);
    onToast('Filters cleared');
  }

  return (
    <div className="w-72 flex-shrink-0 bg-white border-r border-gray-100 h-full flex flex-col">

      {/* Admin Panel */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          {/* <LayoutDashboard size={18} className="text-white" /> */}
          <img
            src="/Union.png"
            alt="fyaora logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <p className="text-[16px] font-semibold text-blue-600 leading-5">Admin Panel</p>
        </div>
      </div>

      {/* User Management */}
      <div className="px-4 border-b border-gray-100">
        <button className="w-full flex items-center justify-between px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-150">
          <span className="text-[14px] font-bold text-gray-700">User Management</span>
          {/* <ChevronRight size={16} className="text-gray-400" /> */}
        </button>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

        {/* Postcode */}
        <Section label="Postcode">
          <input
            type="text"
            placeholder="ZIP"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="w-35 border border-gray-200 rounded-lg px-4 py-2.5 text-[12px]
                       text-gray-700 placeholder:text-gray-300 bg-white
                       focus:outline-none focus:border-indigo-400 focus:ring-2
                       focus:ring-indigo-50 transition-all"
          />
        </Section>

        {/* Registration Status */}
        <Section label="Registration Status">
          <div className="space-y-3">
            {['Onboarded', 'Rejected'].map((s) => (
              <label key={s} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={status.includes(s)}
                  onChange={() => toggleCheckbox(s, status, setStatus)}
                  className="w-[15px] h-[15px] rounded accent-black cursor-pointer flex-shrink-0"
                />
                <span className="text-[12px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </Section>

        {/* Date Registered, stacked vertically to avoid overflow */}
        <Section label="Date Registered">
          <div className="w-full flex justify-between gap-2">
            <div>

              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                placeholder='Start'
                className="w-30 border border-gray-200 rounded-lg px-3 py-2.5 text-[10px]
                text-gray-700 bg-white focus:outline-none focus:border-indigo-400
                focus:ring-2 focus:ring-indigo-50 transition-all"
              />
                <p className="text-[12px] text-gray-400 mb-1">Start</p>
            </div>
            <div>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-30 border border-gray-200 rounded-lg px-3 py-2.5 text-[10px]
                text-gray-700 bg-white focus:outline-none focus:border-indigo-400
                focus:ring-2 focus:ring-indigo-50 transition-all"
              />
                <p className="text-[12px] text-gray-400 mb-1.5">End</p>
            </div>
          </div>
        </Section>

        {/* Vendor Type */}
        <Section label="Vendor Type">
          <div className="space-y-3">
            {['Independent', 'Company'].map((t) => (
              <label key={t} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={vendorType.includes(t)}
                  onChange={() => toggleCheckbox(t, vendorType, setVendorType)}
                  className="w-[15px] h-[15px] rounded accent-black cursor-pointer flex-shrink-0"
                />
                <span className="text-[12px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {t}
                </span>
              </label>
            ))}
          </div>
        </Section>

        {/* Service Offering */}
        <Section label="Service Offering">
          <div className="space-y-3">
            {['Housekeeping', 'Window Cleaning', 'Car Valet'].map((s) => (
              <label key={s} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={serviceOffering.includes(s)}
                  onChange={() => toggleCheckbox(s, serviceOffering, setServiceOffering)}
                  className="w-[15px] h-[15px] rounded accent-black cursor-pointer flex-shrink-0"
                />
                <span className="text-[12px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </Section>

      </div>

      {/* filter and clear buttons */}
      <div className="px-6 py-5 border-t border-gray-100 space-y-3 flex flex-col justify-center items-center">
        <button
          onClick={handleApply}
          className="w-25 bg-blue-600 flex justify-center items-center hover:bg-indigo-700 text-white text-[14px]
                     font-semibold py-3 rounded-full transition-all duration-150
                     shadow-sm hover:shadow-md active:scale-95"
        >
          Filters
        </button>
        <button
          onClick={handleClear}
          className="w-25 bg-white hover:bg-gray-50 text-gray-600 text-[14px]
                     font-medium py-3 rounded-full border border-gray-200
                     transition-all duration-150 active:scale-95"
        >
          Clear Filters
        </button>
      </div>

    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <p className="text-[12px] font-bold text-gray-700 tracking-[0.08em]">
        {label}
      </p>
      {children}
    </div>
  );
}