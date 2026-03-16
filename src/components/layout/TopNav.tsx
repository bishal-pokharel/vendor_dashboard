'use client';

import { Bell, MessageCircle, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  'Service Dashboard',
  'Finance Forecast',
  'Human Resources',
  'Users',
  'Compliances & Verification',
];

interface TopNavProps {
  active: string;
  onNavChange: (item: string) => void;
}

export default function TopNav({ active, onNavChange }: TopNavProps) {
  return (
    <nav className="bg-white border-b border-gray-200 w-full px-6 hidden lg:flex items-center justify-between h-14">

      <ul className="flex items-center">
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <button
              onClick={() => onNavChange(item)}
              className={`
                px-4 py-4 text-sm transition-all border-b-2
                ${active === item
                  ? 'text-blue-600 border-blue-600 font-semibold'
                  : 'text-gray-500 border-transparent hover:text-gray-800 font-normal'}
              `}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">

        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MessageCircle size={20} />
        </button>


        <button className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://i.pravatar.cc"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800 leading-none">Bishal Pokharel</p>
            <p className="text-xs text-gray-400 mt-0.5">London, UK</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

      </div>
    </nav>
  );
}