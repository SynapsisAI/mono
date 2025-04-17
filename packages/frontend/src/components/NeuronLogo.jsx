import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';
import { useEffect, useState } from 'react';

export default function NeuronLogo({ className = "", width = "32px" }) {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    // Function to update state when dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <img 
      src={isDarkMode ? logoWhite : logoBlack} 
      alt="Synapsis Logo" 
      className={className}
      style={{ width }}
    />
  );
}