"use client"; // Required for using React hooks

import './page.css';
import { useState } from 'react';

export default function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [email, setEmail] = useState(''); // State for email
  const [dob, setDob] = useState(''); // State for date of birth
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to manage login status
  const [isSignUp, setIsSignUp] = useState(false); // New state to manage sign-up form

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set login status to true on successful login
        setIsLoggedIn(true);
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, dob }), // Include email and dob
      });

      const data = await response.json();

      if (response.ok) {
        // Optionally log in the user immediately after sign-up
        setIsLoggedIn(true);
      } else {
        setError(data.message || 'Sign-up failed');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (isLoggedIn) {
     window.location.href = '/dashboard'
    }
     
  return (
    <main className="main-container">
      <div className="form-container center">
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
  
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          {isSignUp && (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
  
              <div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
  
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
  
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {/* Login Button */}
          {!isSignUp && (
            <button type="submit" disabled={loading}>
              Login
            </button>
          )}
  
          {/* Sign-Up Button */}
          {isSignUp && (
            <button type="submit" disabled={loading}style={{
              backgroundColor: '#FF00E6', // Set button background to #FF00E6
              color: '#FFFFFF', // Set text color to white
              border: '2px solid #FF00E6' // Keep the border the same color as the background
            }}>
              Sign Up
            </button>
          )}
        </form>
  
        {/* Toggle between Login and Sign Up */}
        {!isSignUp && (
          <p style={{ marginTop: '10px', color: '#FFFFFF' }}>
          Don’t have an account?{' '}
          <span
            onClick={() => setIsSignUp(true)} // Toggle to sign-up
            style={{
              color: '#FF00E6', // Make it look like a link
              cursor: 'pointer',
              textDecoration: 'underline' // Underline to indicate it's clickable
            }}
          >
            Sign Up
          </span>
        </p>
        )}
  
        {isSignUp && (
          <p style={{ marginTop: '10px', color: '#FFFFFF' }}>
            Already have an account?{' '}
            <span
              onClick={() => setIsSignUp(false)} // Toggle to login
              style={{ 
                color: '#FF00E6', // Make it look like a link
                cursor: 'pointer',
                textDecoration: 'underline' // Underline to indicate it's clickable
              }}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </main>
  )
            };