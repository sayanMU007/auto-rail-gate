import React from 'react';
import { Train } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-white p-3 rounded-full shadow-lg">
          <Train className="w-12 h-12 text-blue-900" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">AUTO RAIL GATE</h1>
      <p className="text-blue-200 text-lg">Automate Railway Barriers Safely</p>
    </div>
  );
}