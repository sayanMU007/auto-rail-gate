import React from 'react';
import { MapPin } from 'lucide-react';

export default function StationSearchField({ formData, handleInputChange, showSuggestions, filteredStations, selectStation, setShowSuggestions }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Station Name
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
        <input
          type="text"
          name="stationName"
          value={formData.stationName}
          onChange={handleInputChange}
          onFocus={() => formData.stationName && setShowSuggestions(true)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type to search station..."
          autoComplete="off"
        />
        {showSuggestions && filteredStations.length > 0 && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredStations.map((station, index) => (
              <div
                key={index}
                onClick={() => selectStation(station)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-gray-800">{station.name}</div>
                <div className="text-sm text-gray-500">{station.code}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}