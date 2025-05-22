import { useState, useEffect } from 'react';

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(mobile);
    };

    // Check on mount
    checkDevice();

    // Add listener for window resize
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addListener(checkDevice);

    // Cleanup
    return () => mediaQuery.removeListener(checkDevice);
  }, []);

  return { isMobile };
}; 