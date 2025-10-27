import React from 'react';

export default function AutoModeToggle({ isAutoMode, setIsAutoMode }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-6">
      <span className="font-semibold text-gray-800">Automatic Mode</span>
      <button
        onClick={() => setIsAutoMode(!isAutoMode)}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          isAutoMode ? 'bg-green-600' : 'bg-gray-400'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
            isAutoMode ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}