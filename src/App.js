import React, { useState, useEffect } from 'react';
import { Train, MapPin, User, Lock, Shield, Clock, AlertCircle } from 'lucide-react';
import { FirebaseHelper } from './firebase';

// ==================== STYLES ====================
const styles = `
/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Auth Pages */
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #312e81 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.auth-card:hover {
  box-shadow: 0 25px 70px rgba(59, 130, 246, 0.2);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  color: white;
}

.icon-badge-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
}

.icon-badge-green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.auth-header h2 {
  font-size: 28px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
}

.auth-header p {
  color: #6b7280;
  font-size: 14px;
}

.form-group-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  z-index: 10;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #f9fafb;
  font-family: inherit;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-wrapper input:hover {
  border-color: #d1d5db;
}

.input-wrapper input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.6;
}

.error-message {
  background: linear-gradient(90deg, #fee2e2 0%, #fecaca 100%);
  border-left: 4px solid #ef4444;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.1);
}

.success-message {
  background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%);
  border-left: 4px solid #10b981;
  color: #065f46;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.1);
}

.loading-message {
  background: linear-gradient(90deg, #dbeafe 0%, #bfdbfe 100%);
  border-left: 4px solid #3b82f6;
  color: #1e40af;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #3b82f6;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.suggestions-dropdown {
  position: absolute;
  z-index: 20;
  width: 100%;
  margin-top: 8px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  max-height: 240px;
  overflow-y: auto;
  animation: slideDown 0.2s ease-out;
}

.suggestion-item {
  padding: 16px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s ease;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: linear-gradient(90deg, #eff6ff 0%, #e0e7ff 100%);
}

.station-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.station-code {
  font-size: 13px;
  color: #2563eb;
  font-weight: 500;
}

.btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: inherit;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-primary {
  background: linear-gradient(90deg, #2563eb 0%, #4f46e5 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(90deg, #1d4ed8 0%, #4338ca 100%);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.btn-success {
  background: linear-gradient(90deg, #059669 0%, #047857 100%);
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(90deg, #047857 0%, #065f46 100%);
  box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
}

.auth-footer {
  margin-top: 32px;
  text-align: center;
}

.auth-footer p {
  color: #6b7280;
  margin-bottom: 8px;
  font-size: 14px;
}

.link-button {
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s ease;
  font-family: inherit;
}

.link-button:hover {
  color: #4f46e5;
  text-decoration: underline;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.header-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.header-icon {
  background: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  color: #1e3a8a;
  transition: all 0.3s ease;
  display: inline-flex;
}

.header-icon:hover {
  transform: scale(1.1) rotate(3deg);
}

.page-header h1 {
  font-size: 48px;
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

.header-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #93c5fd;
  font-size: 18px;
}

.page-footer {
  text-align: center;
  margin-top: 32px;
}

.page-footer p {
  color: #93c5fd;
  font-size: 14px;
}

.footer-tagline {
  color: #bfdbfe;
  font-size: 12px;
  margin-top: 8px;
}

.control-panel-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%);
  padding: 24px;
}

.panel-container {
  max-width: 1200px;
  margin: 0 auto;
}

.panel-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.5s ease-out;
}

.panel-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logout-btn {
  padding: 12px;
  background: white;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn:hover {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #dc2626;
}

.panel-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  color: white;
  display: flex;
}

.panel-info h1 {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
}

.panel-info p {
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-header-right {
  background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid #bfdbfe;
  text-align: right;
}

.panel-header-right .label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 4px;
}

.panel-header-right .value {
  font-weight: bold;
  color: #1f2937;
  font-size: 18px;
}

.status-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.5s ease-out;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.title-icon {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  padding: 8px;
  border-radius: 8px;
  color: white;
  display: flex;
}

.panel-title h2 {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 16px;
  padding: 20px;
  border: 2px solid #fbbf24;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(251, 191, 36, 0.3);
}

.stat-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.stat-icon {
  font-size: 32px;
}

.stat-label {
  font-size: 12px;
  color: #92400e;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  color: #78350f;
  line-height: 1;
}

.train-schedule {
  background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 2px solid #bfdbfe;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.schedule-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: #2563eb;
}

.schedule-header h3 {
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
}

.schedule-content {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.schedule-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.schedule-item .schedule-label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.schedule-time {
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
}

.schedule-arrival {
  font-size: 24px;
  font-weight: bold;
  color: #f97316;
}

.schedule-train {
  color: #374151;
  font-weight: 600;
}

.train-number {
  color: #2563eb;
}

.gate-controls {
  margin-bottom: 24px;
}

.btn-gate {
  width: 100%;
  padding: 24px;
  border: none;
  border-radius: 16px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  font-family: inherit;
}

.btn-gate:hover {
  transform: scale(1.02);
}

.btn-gate:active {
  transform: scale(0.98);
}

.btn-gate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-open {
  background: linear-gradient(90deg, #059669 0%, #10b981 100%);
}

.btn-open:hover {
  background: linear-gradient(90deg, #047857 0%, #059669 100%);
  box-shadow: 0 10px 30px rgba(5, 150, 105, 0.4);
}

.btn-close {
  background: linear-gradient(90deg, #dc2626 0%, #f87171 100%);
}

.btn-close:hover {
  background: linear-gradient(90deg, #b91c1c 0%, #dc2626 100%);
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
}

.auto-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.auto-mode-toggle:hover {
  border-color: #d1d5db;
}

.toggle-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-icon {
  padding: 8px;
  border-radius: 8px;
  background: #d1d5db;
  color: #6b7280;
  transition: all 0.3s ease;
  display: flex;
}

.toggle-icon.active {
  background: #d1fae5;
  color: #059669;
}

.toggle-label {
  font-weight: bold;
  color: #1f2937;
  font-size: 18px;
  display: block;
}

.toggle-description {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.toggle-switch {
  position: relative;
  width: 64px;
  height: 32px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #9ca3af;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-switch.active {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}

.toggle-slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-slider {
  left: 36px;
}

.status-display {
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  animation: pulse 2s ease-in-out infinite;
}

.status-open {
  background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%);
  border-left: 4px solid #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.status-closing {
  background: linear-gradient(90deg, #fef3c7 0%, #fde68a 100%);
  border-left: 4px solid #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.status-closed {
  background: linear-gradient(90deg, #fee2e2 0%, #fecaca 100%);
  border-left: 4px solid #ef4444;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.status-icon-display {
  font-size: 40px;
}

.status-label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.status-value {
  font-weight: bold;
  color: #1f2937;
  font-size: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.95;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 36px;
  }
  .auth-card {
    padding: 28px;
  }
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .schedule-grid {
    grid-template-columns: 1fr;
  }
  .status-panel {
    padding: 20px;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
`;

// Style Injector
const StyleInjector = () => {
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "auto-rail-gate-styles";
    styleSheet.textContent = styles;
    
    const existingStyle = document.getElementById("auto-rail-gate-styles");
    if (existingStyle) {
      existingStyle.remove();
    }
    
    document.head.appendChild(styleSheet);
    
    return () => {
      const style = document.getElementById("auto-rail-gate-styles");
      if (style) {
        style.remove();
      }
    };
  }, []);
  
  return null;
};

// ==================== MAIN APP ====================
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setUserData(data);
    setCurrentPage('control');
  };

  const handleRegister = (data) => {
    setUserData(data);
    setCurrentPage('control');
  };

  const switchToRegister = () => {
    setCurrentPage('register');
  };

  const switchToLogin = () => {
    setCurrentPage('login');
  };

  if (currentPage === 'control') {
    return (
      <>
        <StyleInjector />
        <ControlPanel stationData={userData} onLogout={switchToLogin} />
      </>
    );
  }

  if (currentPage === 'register') {
    return (
      <>
        <StyleInjector />
        <RegisterPage onRegister={handleRegister} switchToLogin={switchToLogin} />
      </>
    );
  }

  return (
    <>
      <StyleInjector />
      <LoginPage onLogin={handleLogin} switchToRegister={switchToRegister} />
    </>
  );
}

// ==================== LOGIN PAGE ====================
function LoginPage({ onLogin, switchToRegister }) {
  const [formData, setFormData] = useState({
    stationCode: '',
    stationMasterId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.stationCode || !formData.stationMasterId || !formData.password) {
      setError('Please fill all fields!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if user is registered
      const isRegistered = await FirebaseHelper.isUserRegistered(
        formData.stationMasterId, 
        formData.stationCode
      );

      if (!isRegistered) {
        setError('Station master not registered. Please register first.');
        setLoading(false);
        return;
      }

      // Validate credentials
      const user = await FirebaseHelper.validateUser(
        formData.stationMasterId, 
        formData.stationCode, 
        formData.password
      );

      if (!user) {
        setError('Invalid credentials. Please check your Station Master ID, Station Code, and Password.');
        setLoading(false);
        return;
      }

      // Login successful
      onLogin(user);
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Header />
        
        <div className="auth-card">
          <div className="auth-header">
            <div className="icon-badge icon-badge-blue">
              <User size={32} />
            </div>
            <h2>Welcome Back!</h2>
            <p>Login to access your rail gate control panel</p>
          </div>

          <div className="form-group-container">
            <InputField
              label="Station Code"
              name="stationCode"
              value={formData.stationCode}
              onChange={handleInputChange}
              placeholder="Enter station code"
              IconComponent={MapPin}
              disabled={loading}
            />

            <InputField
              label="Station Master ID"
              name="stationMasterId"
              value={formData.stationMasterId}
              onChange={handleInputChange}
              placeholder="Enter station master ID"
              IconComponent={User}
              disabled={loading}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              IconComponent={Lock}
              disabled={loading}
            />

            {loading && (
              <div className="loading-message">
                <div className="spinner"></div>
                Logging in...
              </div>
            )}

            {error && (
              <div className="error-message">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <button 
              onClick={handleSubmit} 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </div>

          <div className="auth-footer">
            <p>Don't have an account?</p>
            <button onClick={switchToRegister} className="link-button">
              Register as Station Master →
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// ==================== REGISTER PAGE ====================
function RegisterPage({ onRegister, switchToLogin }) {
  const stations = [
    { name: 'New Delhi Railway Station', code: 'NDLS' },
    { name: 'Mumbai Central', code: 'MMCT' },
    { name: 'Howrah Junction', code: 'HWH' },
    { name: 'Chennai Central', code: 'MAS' },
    { name: 'Bengaluru City Junction', code: 'SBC' },
    { name: 'Pune Junction', code: 'PUNE' },
    { name: 'Secunderabad Junction', code: 'SC' },
    { name: 'Kanpur Central', code: 'CNB' },
    { name: 'Nagpur Junction', code: 'NGP' },
    { name: 'Jaipur Junction', code: 'JP' },
    { name: 'Ahmedabad Junction', code: 'ADI' },
    { name: 'Lucknow Charbagh', code: 'LKO' },
    { name: 'Patna Junction', code: 'PNBE' },
    { name: 'Vijayawada Junction', code: 'BZA' },
    { name: 'Bhopal Junction', code: 'BPL' }
  ];

  const [formData, setFormData] = useState({
    stationCode: '',
    stationMasterId: '',
    password: '',
    confirmPassword: '',
    stationName: '',
    gateNumber: ''
  });
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredStations, setFilteredStations] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setSuccess('');
    
    if (name === 'stationName') {
      setFormData({ ...formData, stationName: value });
      
      if (value.trim() === '') {
        setFilteredStations([]);
        setShowSuggestions(false);
      } else {
        const filtered = stations.filter(station =>
          station.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredStations(filtered);
        setShowSuggestions(true);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const selectStation = (station) => {
    setFormData({
      ...formData,
      stationName: station.name,
      stationCode: station.code
    });
    setShowSuggestions(false);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.stationName || !formData.gateNumber || !formData.stationCode || 
        !formData.stationMasterId || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if user already exists
      const isRegistered = await FirebaseHelper.isUserRegistered(
        formData.stationMasterId, 
        formData.stationCode
      );

      if (isRegistered) {
        setError('Station master already registered with this ID and Station Code!');
        setLoading(false);
        return;
      }

      // Register the user
      const result = await FirebaseHelper.addUser(formData);
      
      if (result.success) {
        setSuccess('Registration successful! Redirecting to control panel...');
        
        setTimeout(() => {
          onRegister(formData);
        }, 1500);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Header />
        
        <div className="auth-card">
          <div className="auth-header">
            <div className="icon-badge icon-badge-green">
              <Shield size={32} />
            </div>
            <h2>Station Master Registration</h2>
            <p>Create your account to manage railway gates</p>
          </div>

          <div className="form-group-container">
            <StationSearchField
              formData={formData}
              handleInputChange={handleInputChange}
              showSuggestions={showSuggestions}
              filteredStations={filteredStations}
              selectStation={selectStation}
              setShowSuggestions={setShowSuggestions}
              disabled={loading}
            />

            <InputField
              label="Gate Number"
              name="gateNumber"
              value={formData.gateNumber}
              onChange={handleInputChange}
              placeholder="Enter gate number"
              IconComponent={Shield}
              disabled={loading}
            />

            <InputField
              label="Station Code"
              name="stationCode"
              value={formData.stationCode}
              onChange={handleInputChange}
              placeholder="Enter station code"
              IconComponent={MapPin}
              disabled={loading}
            />

            <InputField
              label="Station Master ID"
              name="stationMasterId"
              value={formData.stationMasterId}
              onChange={handleInputChange}
              placeholder="Enter station master ID"
              IconComponent={User}
              disabled={loading}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              IconComponent={Lock}
              disabled={loading}
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              IconComponent={Lock}
              disabled={loading}
            />

            {loading && (
              <div className="loading-message">
                <div className="spinner"></div>
                Registering...
              </div>
            )}

            {error && (
              <div className="error-message">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </div>
            )}

            <button 
              onClick={handleSubmit} 
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>
          </div>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <button onClick={switchToLogin} className="link-button">
              Login here →
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// ==================== CONTROL PANEL ====================
function ControlPanel({ stationData, onLogout }) {
  const [gateStatus, setGateStatus] = useState('closed');
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [countdown, setCountdown] = useState(15);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    // Get total registered users from Firebase
    const fetchUserCount = async () => {
      try {
        const count = await FirebaseHelper.getTotalUsersCount();
        setTotalUsers(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUserCount();
  }, []);

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
    <div className="control-panel-page">
      <div className="panel-container">
        <PanelHeader stationData={stationData} onLogout={onLogout} totalUsers={totalUsers} />
        <StatusPanel 
          gateStatus={gateStatus}
          toggleGate={toggleGate}
          isAutoMode={isAutoMode}
          setIsAutoMode={setIsAutoMode}
          countdown={countdown}
          totalUsers={totalUsers}
          loadingUsers={loadingUsers}
        />
      </div>
    </div>
  );
}

// ==================== SHARED COMPONENTS ====================
function Header() {
  return (
    <div className="page-header">
      <div className="header-icon-container">
        <div className="header-icon">
          <Train size={56} />
        </div>
      </div>
      <h1>AUTO RAIL GATE</h1>
      <div className="header-subtitle">
        <Shield size={20} />
        <p>Automate Railway Barriers Safely</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="page-footer">
      <p>© 2025 Auto Rail Gate System. All rights reserved.</p>
      <p className="footer-tagline">Secure • Reliable • Automated</p>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, IconComponent, type = 'text', disabled = false }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-wrapper">
        <IconComponent className="input-icon" size={20} />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function StationSearchField({ formData, handleInputChange, showSuggestions, filteredStations, selectStation, setShowSuggestions, disabled = false }) {
  return (
    <div className="form-group">
      <label>Station Name</label>
      <div className="input-wrapper">
        <MapPin className="input-icon" size={20} />
        <input
          type="text"
          name="stationName"
          value={formData.stationName}
          onChange={handleInputChange}
          onFocus={() => formData.stationName && setShowSuggestions(true)}
          placeholder="Type to search station..."
          autoComplete="off"
          disabled={disabled}
        />
        {showSuggestions && filteredStations.length > 0 && !disabled && (
          <div className="suggestions-dropdown">
            {filteredStations.map((station, index) => (
              <div
                key={index}
                onClick={() => selectStation(station)}
                className="suggestion-item"
              >
                <div className="station-name">{station.name}</div>
                <div className="station-code">{station.code}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PanelHeader({ stationData, onLogout, totalUsers }) {
  return (
    <div className="panel-header">
      <div className="panel-header-left">
        <button onClick={onLogout} className="logout-btn" title="Logout">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="panel-icon">
          <Train size={32} />
        </div>
        <div className="panel-info">
          <h1>Auto Rail Gate Control</h1>
          <p>
            <MapPin size={16} />
            {stationData.stationName || 'Station Name'} • Gate {stationData.gateNumber || 'N/A'}
          </p>
        </div>
      </div>
      <div className="panel-header-right">
        <p className="label">Station Master</p>
        <p className="value">{stationData.stationMasterId}</p>
      </div>
    </div>
  );
}

function StatusPanel({ gateStatus, toggleGate, isAutoMode, setIsAutoMode, countdown, totalUsers, loadingUsers }) {
  return (
    <div className="status-panel">
      <div className="panel-title">
        <div className="title-icon">
          <AlertCircle size={24} />
        </div>
        <h2>Status Panel</h2>
      </div>

      <StatsGrid totalUsers={totalUsers} loadingUsers={loadingUsers} />
      <TrainSchedule />
      <GateControls gateStatus={gateStatus} toggleGate={toggleGate} />
      <AutoModeToggle isAutoMode={isAutoMode} setIsAutoMode={setIsAutoMode} />
      <StatusDisplay gateStatus={gateStatus} countdown={countdown} />
    </div>
  );
}

function StatsGrid({ totalUsers, loadingUsers }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-icon">👥</div>
          <div>
            <div className="stat-label">Total Registered Users</div>
            <div className="stat-value">
              {loadingUsers ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="spinner" style={{ borderColor: '#78350f', borderTopColor: 'transparent' }}></div>
                  <span style={{ fontSize: '18px' }}>Loading...</span>
                </div>
              ) : (
                totalUsers
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainSchedule() {
  return (
    <div className="train-schedule">
      <div className="schedule-header">
        <Clock size={24} />
        <h3>Next Train Schedule</h3>
      </div>
      <div className="schedule-content">
        <div className="schedule-grid">
          <div className="schedule-item">
            <p className="schedule-label">SCHEDULED TIME</p>
            <p className="schedule-time">10:35 AM</p>
          </div>
          <div className="schedule-item">
            <p className="schedule-label">ARRIVAL</p>
            <p className="schedule-arrival">2 min</p>
          </div>
        </div>
        <div className="schedule-train">
          <p><span className="train-number">Train 123</span> (Express)</p>
        </div>
      </div>
    </div>
  );
}

function GateControls({ gateStatus, toggleGate }) {
  return (
    <div className="gate-controls">
      <button
        onClick={toggleGate}
        disabled={gateStatus === 'closing'}
        className={`btn-gate ${gateStatus === 'open' ? 'btn-close' : 'btn-open'}`}
      >
        {gateStatus === 'open' ? '🔴 CLOSE GATE' : '🟢 OPEN GATE'}
      </button>
    </div>
  );
}

function AutoModeToggle({ isAutoMode, setIsAutoMode }) {
  return (
    <div className="auto-mode-toggle">
      <div className="toggle-left">
        <div className={`toggle-icon ${isAutoMode ? 'active' : ''}`}>
          <Shield size={20} />
        </div>
        <div>
          <span className="toggle-label">Automatic Mode</span>
          <p className="toggle-description">AI-powered gate control</p>
        </div>
      </div>
      <button
        onClick={() => setIsAutoMode(!isAutoMode)}
        className={`toggle-switch ${isAutoMode ? 'active' : ''}`}
      >
        <div className="toggle-slider"></div>
      </button>
    </div>
  );
}

function StatusDisplay({ gateStatus, countdown }) {
  const statusConfig = {
    open: { class: 'status-open', text: 'Gate Open', icon: '🟢' },
    closing: { class: 'status-closing', text: `Closing in ${countdown}s`, icon: '🟡' },
    closed: { class: 'status-closed', text: 'Gate Closed', icon: '🔴' }
  };

  const config = statusConfig[gateStatus];

  return (
    <div className={`status-display ${config.class}`}>
      <div className="status-icon-display">{config.icon}</div>
      <div className="status-text">
        <p className="status-label">CURRENT STATUS</p>
        <p className="status-value">{config.text}</p>
      </div>
    </div>
  );
}