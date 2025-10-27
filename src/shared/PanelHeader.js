import React from 'react';
import { Train, MapPin } from 'lucide-react';

export default function PanelHeader({ stationData, onLogout }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <Train className="w-10 h-10 text-blue-900" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Auto Rail Gate</h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Live Location: {stationData.stationName || 'Station Name'}, Gate {stationData.gateNumber || 'number'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Station Master</p>
          <p className="font-semibold text-gray-800">{stationData.stationMasterId}</p>
        </div>
      </div>
    </div>
  );
}