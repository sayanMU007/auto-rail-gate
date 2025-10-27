import React from 'react';

export default function TrainSchedule() {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <h3 className="font-semibold text-gray-700 mb-3">Next Train Schedule: 10:35 AM</h3>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">Approaching:</span> Train 123 (Express)
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Estimated Arrival:</span> 2 minutes
        </p>
      </div>
    </div>
  );
}