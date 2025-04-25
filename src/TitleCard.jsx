import React, { useState, useEffect } from 'react';
import "./styles.css"

const TitleCard = ({ title, duration = 3000 }) => {
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
  }, []);

  if (!visible) return null;

  // Chars: ╔ ═ ╗ ╚ ╝

  const boxWidth = title.length + 6;
  
  const topLine = `╔${"═".repeat(boxWidth)}╗`;
  const emptyLine = `║${" ".repeat(boxWidth)}║`;
  const bottomLine = `╚${"═".repeat(boxWidth)}╝`;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 text-blue-400`}
      style={{ opacity: opacity, transition: 'opacity 0.2s ease' }}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center display-inline-block">
        <pre className='leading-tight'>
        {topLine}
        <br></br>
        {emptyLine}
        <br></br>
        {bottomLine}
        </pre>
      </div>
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        {title}
      </div>

    </div>
  );
};

export default TitleCard;