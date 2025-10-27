import React from 'react';

export default function StatusDisplay({ gateStatus, countdown }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
      <p className="font-semibold text-gray-800">
        Status: {gateStatus === 'open' ? 'Gate Open' : gateStatus === 'closing' ? `Gate Closing in ${countdown} sec...` : 'Gate Closed'}
      </p>
    </div>
  );
}