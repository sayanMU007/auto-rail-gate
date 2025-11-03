import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import GateControl from './GateControl';
import Login from './Login';
import './App.css';

function AppContent() {
  const { currentUser } = useAuth();
  
  return (
    <div className="App">
      {currentUser ? <GateControl /> : <Login />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;  // ← THIS LINE IS CRITICAL!