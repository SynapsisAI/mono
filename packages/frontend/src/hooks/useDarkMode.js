import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has already set a preference
    if (typeof localStorage !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : 
             // Check for system preference
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Update class on html element
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
}