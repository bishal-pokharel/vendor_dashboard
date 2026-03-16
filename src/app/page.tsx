'use client';

import { useState } from 'react';
import TopNav from '@/components/layout/TopNav';
import VendorTable from '@/components/table/Vendortable';
import Sidebar from '@/components/layout/Sidebar';
import Toast from '@/components/ui/Toast';
import SearchBar from '@/components/layout/SearchBar';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/types/vendor';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [active, setActive] = useState('Service Dashboard');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Service Provider' | 'Customer'>('Service Provider');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  function showToast(message: string) {
    setToast({ show: true, message });
  }

  function handleFilterChange(filtered: Vendor[]) {
    setFilteredVendors(filtered);
    setSearchQuery('');
    setSidebarOpen(false);
  }

  const searchedVendors = searchQuery.trim()
    ? filteredVendors.filter((v) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          v.email.toLowerCase().includes(q)           ||
          v.phoneNumber.toLowerCase().includes(q)     ||
          v.postcode.toLowerCase().includes(q)        ||
          v.vendorType.toLowerCase().includes(q)      ||
          v.serviceOffering.toLowerCase().includes(q) ||
          v.status.toLowerCase().includes(q)
        );
      })
    : filteredVendors;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav active={active} onNavChange={setActive} />

      {active === 'Human Resources' ? (
        <div className="flex h-[calc(100vh-64px)] relative">

          {/* ── Mobile dark overlay — clicking closes sidebar ── */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar - fixed on mobile, static on desktop */}
          <div className={`
            fixed top-[56px] left-0 h-[calc(100vh-56px)] z-30
            lg:static lg:z-auto lg:translate-x-0 lg:h-full
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <Sidebar onFilterChange={handleFilterChange} onToast={showToast} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 overflow-auto p-4 lg:p-6 space-y-4">

            {/* Mobile: hamburger button to open sidebar */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Menu size={18} />
              </button>
              <h1 className="text-lg font-bold text-gray-800">Waitlist</h1>
            </div>

            {/* Desktop heading */}
            <h1 className="hidden lg:block text-xl font-bold text-gray-800">Waitlist</h1>

            {/* Tabs + Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {(['Service Provider', 'Customer'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${activeTab === tab
                        ? 'bg-gray-500/50 shadow-sm'
                        : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Searchbar div */}
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search vendors..."
              />
            </div>

            {/* Main table displaying */}
            <VendorTable data={searchedVendors} />

          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <p className="text-gray-400 text-sm">{active} — coming soon</p>
        </div>
      )}

      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ show: false, message: '' })}
      />
    </div>
  );
}