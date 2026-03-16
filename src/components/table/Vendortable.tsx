'use client';

import { useState, useEffect } from 'react';
import { Vendor } from '@/types/vendor';
import { Pencil, ChevronLeft, ChevronRight, X, Mail, Phone, MapPin, Briefcase, Wrench, Calendar } from 'lucide-react';
import VendorDetailModal from '@/components/layout/VendorDetailsCard';


const PAGE_SIZE = 10;

interface VendorTableProps {
  data: Vendor[];
}

export default function VendorTable({ data }: VendorTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // modal state
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [data]);

  const totalPages  = Math.ceil(data.length / PAGE_SIZE);
  const startIndex  = (currentPage - 1) * PAGE_SIZE;
  const currentRows = data.slice(startIndex, startIndex + PAGE_SIZE);

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedRows(currentRows.map((v) => v.id));
    } else {
      setSelectedRows([]);
    }
  }

  function handleSelectRow(id: string, checked: boolean) {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((r) => r !== id));
    }
  }

  const allSelected = currentRows.length > 0 && currentRows.every((v) => selectedRows.includes(v.id));

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* selected count bar */}
        {/* {selectedRows.length > 0 && (
          <div className="px-5 py-2.5 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
            <p className="text-sm text-indigo-700 font-medium">
              {selectedRows.length} row{selectedRows.length > 1 ? 's' : ''} selected
            </p>
            <button
              onClick={() => setSelectedRows([])}
              className="text-xs text-indigo-500 hover:text-indigo-700 underline transition-colors"
            >
              Clear
            </button>
          </div>
        )} */}

        {/* table data section */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">

            {/* Header */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-4 text-left w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded accent-black cursor-pointer"
                  />
                </th>
                {['Email', 'Phone Number', 'Postcode', 'Vendor Type', 'Service Offering', 'Signup Date', 'Status', 'Actions'].map((col) => (
                  <th key={col} className="px-5 py-4 text-left text-xs font-extrabold text-gray-700 uppercase tracking-widest whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-gray-300 text-sm">
                    No vendors match your filters.
                  </td>
                </tr>
              ) : (
                currentRows.map((vendor, index) => {
                  const isSelected = selectedRows.includes(vendor.id);
                  return (
                    <tr
                      key={vendor.id}
                      className={`
                        border-b border-gray-50 transition-all duration-150
                        ${isSelected
                          ? 'bg-indigo-50'
                          : index % 2 === 0
                            ? 'bg-white hover:bg-gray-100'
                            : 'bg-gray-200 hover:bg-gray-150'}
                      `}
                    >
                      {/* checkbox */}
                      <td className="px-5 py-3.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(vendor.id, e.target.checked)}
                          className="w-4 h-4 rounded accent-black cursor-pointer"
                        />
                      </td>

                      {/* email */}
                      <td className="px-5 py-3.5 text-gray-500">{vendor.email}</td>

                      {/* phone */}
                      <td className="px-5 py-3.5 text-gray-500">{vendor.phoneNumber}</td>

                      {/* postcode */}
                      <td className="px-5 py-3.5 text-gray-500">{vendor.postcode}</td>

                      {/* vendor type */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium text-gray-500">
                          {vendor.vendorType}
                        </span>
                      </td>

                      {/* service offering */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium text-gray-500">
                          {vendor.serviceOffering}
                        </span>
                      </td>

                      {/* date */}
                      <td className="px-5 py-3.5 text-gray-500">
                        {new Date(vendor.signupDate).toLocaleDateString('en-US', {
                          month: 'numeric', day: 'numeric', year: 'numeric',
                        })}
                      </td>

                      {/* status */}
                      <td className="px-5 py-3.5">
                        <span className={`
                          inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold
                          transition-all duration-150
                          ${vendor.status === 'Onboarded'
                            ? ' text-emerald-600' : vendor.status === 'Rejected' ? ' text-red-500': ' text-gray-500'}
                        `}>
                          {/* <span className={`w-1.5 h-1.5 rounded-full ${vendor.status === 'Onboarded' ? 'bg-emerald-500' : 'bg-red-400'}`} /> */}
                          {vendor.status}
                        </span>
                      </td>

                      {/* actions */}
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setEditVendor(vendor)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-700
                                     hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-150
                                     hover:scale-110"
                        >
                          <Pencil size={14} />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-600">
              {data.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, data.length)}
            </span>
            {' '}of{' '}
            <span className="font-semibold text-gray-600">{data.length}</span> vendors
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200
                         text-gray-400 hover:bg-gray-50 hover:text-gray-600
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all duration-150"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-8 h-8 text-xs rounded-lg border font-medium
                  transition-all duration-150
                  ${page === currentPage
                    ? 'bg-blue-500 text-white border-blue-600 shadow-sm scale-105'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}
                `}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200
                         text-gray-400 hover:bg-gray-50 hover:text-gray-600
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all duration-150"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

      </div>

      <VendorDetailModal
        vendor={editVendor}
        onClose={() => setEditVendor(null)}
        onEdit={(vendor) => {
          alert(`Edit vendor: ${vendor.email}`);
          setEditVendor(null);
        }}
      />
    </>
  );
}