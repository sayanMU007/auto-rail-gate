import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Camera, AlertTriangle, Activity, Clock, User, LogOut, Settings, Bell } from 'lucide-react';
import './GateControl.css';

function GateControl() {
  const [gateStatus, setGateStatus] = useState('CLOSED');
  const [manualMode, setManualMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stationName, setStationName] = useState('Central Railway Station');
  const [activityLog, setActivityLog] = useState([]);
  const { currentUser, logout } = useAuth();

  // Listen to Firebase in real-time
  useEffect(() => {
    try {
      const statusRef = ref(database, 'current_gate_status');
      const modeRef = ref(database, 'manual_mode');

      const unsubscribeStatus = onValue(statusRef, (snapshot) => {
        if (snapshot.exists()) {
          const newStatus = snapshot.val();
          setGateStatus(newStatus);
          addToActivityLog(`Gate ${newStatus}`, newStatus.toLowerCase());
          setLoading(false);
        } else {
          setGateStatus('CLOSED');
          setLoading(false);
        }
      }, (error) => {
        console.error('Firebase error:', error);
        setError(error.message);
        setLoading(false);
      });

      const unsubscribeMode = onValue(modeRef, (snapshot) => {
        if (snapshot.exists()) {
          setManualMode(snapshot.val() === 1);
        } else {
          setManualMode(false);
        }
      }, (error) => {
        console.error('Firebase error:', error);
      });

      return () => {
        unsubscribeStatus();
        unsubscribeMode();
      };
    } catch (err) {
      console.error('Setup error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const addToActivityLog = (event, status) => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newLog = { time: now, event, status };
    setActivityLog(prevLog => [newLog, ...prevLog.slice(0, 4)]);
  };

  const toggleManualMode = async () => {
    try {
      const newMode = !manualMode;
      await set(ref(database, 'manual_mode'), newMode ? 1 : 0);
      addToActivityLog(`Switched to ${newMode ? 'Manual' : 'Automatic'} Mode`, 'mode');
    } catch (err) {
      console.error('Error toggling mode:', err);
      alert('Failed to toggle mode: ' + err.message);
    }
  };

  const openGate = async () => {
    if (manualMode) {
      try {
        await set(ref(database, 'gate_status'), 'OPEN');
        addToActivityLog('Gate Opened (Manual)', 'opened');
      } catch (err) {
        console.error('Error opening gate:', err);
        alert('Failed to open gate: ' + err.message);
      }
    }
  };

  const closeGate = async () => {
    if (manualMode) {
      try {
        await set(ref(database, 'gate_status'), 'CLOSED');
        addToActivityLog('Gate Closed (Manual)', 'closed');
      } catch (err) {
        console.error('Error closing gate:', err);
        alert('Failed to close gate: ' + err.message);
      }
    }
  };

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        fontSize: '24px'
      }}>
        ⏳ Connecting to Railway System...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#ff5252' }}>⚠️ Connection Error</h2>
        <p>{error}</p>
        <p>Please check your Firebase configuration and database rules.</p>
      </div>
    );
  }

  return (
    <div className="railway-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="logo-box">🚉</div>
          <div>
            <h1 className="main-title">Railway Gate Control System</h1>
            <input 
              type="text" 
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              className="station-name-input"
              placeholder="Enter station name"
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="user-badge">
            <User size={18} color="#667eea" />
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Operator</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e3c72' }}>
                {currentUser?.userData?.username || 'Admin'}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div>
          {/* Gate Status Card */}
          <div className="card main-status-card">
            <h2 className="card-title">Gate Status Monitor</h2>
            
            <div className={`status-display ${gateStatus.toLowerCase()}`}>
              <div className="status-pattern"></div>
              <div className="status-icon">
                {gateStatus === 'OPEN' ? '🟢' : '🔴'}
              </div>
              <div className="status-text">
                GATE {gateStatus}
              </div>
              <div className="last-update">
                Last Update: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* Control Mode Toggle */}
            <div className="mode-toggle">
              <button
                onClick={toggleManualMode}
                className={`mode-btn ${!manualMode ? 'active-auto' : ''}`}
                disabled={!manualMode}
              >
                <Activity size={20} />
                Automatic Mode
              </button>
              <button
                onClick={toggleManualMode}
                className={`mode-btn ${manualMode ? 'active-manual' : ''}`}
                disabled={manualMode}
              >
                <Settings size={20} />
                Manual Mode
              </button>
            </div>

            {/* Manual Controls */}
            {manualMode && (
              <div className="manual-control-box">
                <div className="warning-header">
                  <AlertTriangle size={20} />
                  <span style={{ fontWeight: 'bold' }}>Manual Override Active</span>
                </div>
                <div className="manual-buttons">
                  <button
                    onClick={openGate}
                    disabled={gateStatus === 'OPEN'}
                    className="control-btn open-btn"
                  >
                    🟢 OPEN GATE
                  </button>
                  <button
                    onClick={closeGate}
                    disabled={gateStatus === 'CLOSED'}
                    className="control-btn close-btn"
                  >
                    🔴 CLOSE GATE
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* System Info Cards */}
          <div className="info-grid">
            <div className="card info-card">
              <div className="info-header">
                <Camera size={24} color="#667eea" />
                <h3>Camera Status</h3>
              </div>
              <div className="status-online">● ONLINE</div>
              <div className="info-detail">4 Cameras Active</div>
            </div>

            <div className="card info-card">
              <div className="info-header">
                <Activity size={24} color="#667eea" />
                <h3>Sensors</h3>
              </div>
              <div className="status-online">● ACTIVE</div>
              <div className="info-detail">All Systems Normal</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Activity Log */}
          <div className="card activity-card">
            <div className="card-header">
              <Clock size={24} color="#667eea" />
              <h3>Activity Log</h3>
            </div>
            
            <div className="activity-list">
              {activityLog.length > 0 ? (
                activityLog.map((log, index) => (
                  <div key={index} className={`activity-item ${log.status}`}>
                    <div className="activity-time">{log.time}</div>
                    <div className="activity-event">{log.event}</div>
                  </div>
                ))
              ) : (
                <div className="activity-item">
                  <div className="activity-event">No recent activity</div>
                </div>
              )}
            </div>
          </div>

          {/* Station Info */}
          <div className="card station-info-card">
            <h3 className="card-title">Station Information</h3>
            
            <div className="station-details">
              <div className="detail-item">
                <div className="detail-label">Location</div>
                <div className="detail-value">Platform 1, Track 2</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Operating Hours</div>
                <div className="detail-value">24/7 Monitoring</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Emergency Contact</div>
                <div className="detail-value">+91 XXXX-XXXXXX</div>
              </div>

              <button className="emergency-btn">
                <Bell size={18} />
                Emergency Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GateControl;