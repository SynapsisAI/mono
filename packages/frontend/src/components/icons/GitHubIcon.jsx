import githubBlack from '../../assets/github-black.svg';
import githubWhite from '../../assets/github-white.svg';
import { useEffect, useState } from 'react';

export default function GitHubIcon({ className = "h-5 w-5" }) {
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
      src={isDarkMode ? githubWhite : githubBlack} 
      alt="GitHub" 
      className={className} 
    />
  );
}