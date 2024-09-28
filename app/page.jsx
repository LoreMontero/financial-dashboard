"use client"; // Required for using React hooks

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
    return (
      <div className="">
        <h1>Login Complete</h1>
        <p>Welcome, {username}!</p> {/* Display a welcome message */}
        <button onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <main className="">
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
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
        <button type="submit" disabled={loading}>{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      
      <button onClick={() => setIsSignUp(!isSignUp)} style={{ marginTop: '10px' }}>
        {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
      </button>
    </main>
  );
}



