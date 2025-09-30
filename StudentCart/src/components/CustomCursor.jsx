import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    const moveCursor = (e) => {
      if (cursor && cursorDot) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    const addHoverEffect = (e) => {
      if (cursorDot) {
        cursorDot.style.transform = 'scale(1.5)';
        cursorDot.style.backgroundColor = '#0077be';
      }
    };

    const removeHoverEffect = (e) => {
      if (cursorDot) {
        cursorDot.style.transform = 'scale(1)';
        cursorDot.style.backgroundColor = '#000';
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', addHoverEffect);
      element.addEventListener('mouseleave', removeHoverEffect);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', addHoverEffect);
        element.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return (
    <div className="custom-cursor fixed pointer-events-none z-50 mix-blend-difference">
      <div className="cursor-dot w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"></div>
    </div>
  );
};

export default CustomCursor;
