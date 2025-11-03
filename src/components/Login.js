import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (isSignup && username.trim().length < 3) {
      return setError('Username must be at least 3 characters');
    }

    try {
      setError('');
      setLoading(true);
      
      if (isSignup) {
        await signup(email, password, username);
      } else {
        await login(email, password);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError(error.message);
      }
    }
    
    setLoading(false);
  }

  function toggleMode() {
    setIsSignup(!isSignup);
    setError('');
    setEmail('');
    setPassword('');
    setUsername('');
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🚉 Railway Gate System</h1>
        <h2>{isSignup ? 'Create Account' : 'Login'}</h2>
        
        {error && <div className="error-message">⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                minLength="3"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password (min 6 characters)"
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <span>⏳ Please wait...</span>
            ) : (
              isSignup ? '✅ Sign Up' : '🔓 Login'
            )}
          </button>
        </form>
        
        <p className="toggle-auth">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={toggleMode}
            className="toggle-button"
            disabled={loading}
          >
            {isSignup ? 'Login here' : 'Sign up here'}
          </button>
        </p>

        <div className="info-box">
          <p>ℹ️ {isSignup ? 'Create an account to access the gate control system' : 'Login with your registered email'}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;