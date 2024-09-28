'use client';

import React, { useState } from 'react';

export default function Balance({ balance }) {
  // State to track hover
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        paddingLeft: '50px',  // Add padding to the left
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',  // Align items to the left inside the box
          padding: '25px',
          backgroundColor: '#0A0A0A',
          width: '200px',
          borderRadius: '15px',
          boxShadow: isHovered
            ? '0 8px 30px rgba(0, 0, 0, 1)'
            : '0 4px 20px rgba(0, 0, 0, 0.75)',
          transform: isHovered ? 'translateY(-5px)' : 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon */}
        <div
          style={{
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="/icon.png"
            alt="Balance Icon"
            width={65}
            height={70}
            style={{ filter: 'invert(100%)' }}
          />
        </div>
        {/* Label: My Balance */}
        <p
          style={{
            fontSize: '24px',
            color: '#FCF5E9',
            margin: '-5px 0 0 0',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.5px',
          }}
        >
          My Balance
        </p>
        {/* User balance */}
        <p
          style={{
            marginTop: '10px',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#FCF5E9',
          }}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
