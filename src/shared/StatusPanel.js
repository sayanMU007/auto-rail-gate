import React from 'react';
import TrainSchedule from './TrainSchedule';
import GateControls from './GateControls';
import AutoModeToggle from './AutoModeToggle';
import StatusDisplay from './StatusDisplay';

export default function StatusPanel({ gateStatus, toggleGate, isAutoMode, setIsAutoMode, countdown }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Status Panel</h2>
      <TrainSchedule />
      <GateControls gateStatus={gateStatus} toggleGate={toggleGate} />
      <AutoModeToggle isAutoMode={isAutoMode} setIsAutoMode={setIsAutoMode} />
      <StatusDisplay gateStatus={gateStatus} countdown={countdown} />
    </div>
  );
}