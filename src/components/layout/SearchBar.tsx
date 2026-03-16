'use client';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative w-72">

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-3 pr-9 py-2 text-sm border border-gray-200 rounded-lg
                   bg-white text-gray-700 placeholder:text-gray-300
                   focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50
                   transition-all shadow-sm"
      />

      {/* search icon */}
      {/* <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg> */}

      {/* clear button in search bar which is not necessary but provided for user convenience */}
      {value ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      ):
      (
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      )}

    </div>
  );
}