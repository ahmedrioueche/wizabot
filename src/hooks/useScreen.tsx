import { useState, useEffect } from 'react';

const useScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMidScreen, setIsMidScreen] = useState(false);

  useEffect(() => {
    const smallScreenQuery = window.matchMedia('(max-width: 768px)');
    const midScreenQuery = window.matchMedia('(min-width: 769px) and (max-width: 1040px)');

    const handleResize = () => {
      setIsSmallScreen(smallScreenQuery.matches);
      setIsMidScreen(midScreenQuery.matches);
    };

    // Set the initial screen size
    handleResize();

    // Listen for screen size changes
    smallScreenQuery.addEventListener('change', handleResize);
    midScreenQuery.addEventListener('change', handleResize);

    // Cleanup listeners on component unmount
    return () => {
      smallScreenQuery.removeEventListener('change', handleResize);
      midScreenQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return { isSmallScreen, isMidScreen };
};

export default useScreen;
