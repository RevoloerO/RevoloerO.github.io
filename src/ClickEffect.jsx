import React from 'react';
import './ClickEffect.css';

const ClickEffect = ({ id, x, y, type }) => {
  if (type.includes('metal-red')) {
    return (
      <div
        className="sonar-ping"
        style={{ left: `${x}px`, top: `${y}px` }}
      />
    );
  }

  if (type.includes('cyber-matcha')) {
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <div
            key={`${id}-${i}`}
            className="wind-streak"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              '--random-angle': `${Math.random() * 360}deg`,
              '--random-delay': `${Math.random() * 0.2}s`
            }}
          />
        ))}
      </>
    );
  }

  if (type.includes('divine-gold')) {
    return (
      <>
        {[...Array(10)].map((_, i) => (
          <div
            key={`${id}-${i}`}
            className="sparkle"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              '--random-x': `${(Math.random() - 0.5) * 100}px`,
              '--random-y': `${(Math.random() - 0.5) * 100}px`,
              '--random-delay': `${Math.random() * 0.3}s`,
              '--random-duration': `${0.5 + Math.random() * 0.5}s`
            }}
          />
        ))}
      </>
    );
  }

  return null;
};

export default ClickEffect;
