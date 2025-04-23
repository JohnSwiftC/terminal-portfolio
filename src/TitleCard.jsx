import React, { useState, useEffect } from 'react';

const TitleCard = ({ title, subtitle, duration = 3000, onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fading out after duration
    const fadeTimer = setTimeout(() => {
      // Gradually reduce opacity
      const fadeInterval = setInterval(() => {
        setOpacity(prevOpacity => {
          const newOpacity = prevOpacity - 0.05;
          if (newOpacity <= 0) {
            clearInterval(fadeInterval);
            // When fully transparent, set to not visible
            setTimeout(() => {
              setVisible(false);
              if (onComplete) onComplete();
            }, 100);
            return 0;
          }
          return newOpacity;
        });
      }, 50);
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [duration, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-black z-50`}
      style={{ opacity: opacity, transition: 'opacity 0.2s ease' }}
    >
      <h1 className="text-blue-400">{title}</h1>
      {subtitle && (
        <h2 className="text-2xl text-gray-300 mt-4">
          {subtitle}
        </h2>
      )}
    </div>
  );
};

export default TitleCard;