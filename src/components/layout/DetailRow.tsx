import React from 'react';

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-sm text-gray-700 font-medium">{value}</span>
    </div>
  );
}