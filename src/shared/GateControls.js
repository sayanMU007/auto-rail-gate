import React from 'react';

export default function GateControls({ gateStatus, toggleGate }) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={toggleGate}
        disabled={gateStatus === 'closing'}
        className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
          gateStatus === 'open'
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-green-600 hover:bg-green-700 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
      >
        {gateStatus === 'open' ? 'CLOSE' : 'OPEN'}
      </button>
    </div>
  );
}