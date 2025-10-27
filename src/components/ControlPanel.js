function ControlPanel({ stationData, onLogout }) {
  const [gateStatus, setGateStatus] = useState('closed');
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [countdown, setCountdown] = useState(15);

  React.useEffect(() => {
    if (isAutoMode && gateStatus === 'closing') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setGateStatus('closed');
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAutoMode, gateStatus]);

  const toggleGate = () => {
    if (gateStatus === 'open') {
      setGateStatus('closing');
      setCountdown(15);
    } else {
      setGateStatus('open');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <PanelHeader stationData={stationData} onLogout={onLogout} />
        <StatusPanel 
          gateStatus={gateStatus}
          toggleGate={toggleGate}
          isAutoMode={isAutoMode}
          setIsAutoMode={setIsAutoMode}
          countdown={countdown}
        />
      </div>
    </div>
  );
}