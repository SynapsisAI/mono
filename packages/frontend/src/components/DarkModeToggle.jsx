import useDarkMode from '../hooks/useDarkMode';
import { Sun, Moon } from 'lucide-react';
import { IconButton } from './Button';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <IconButton
      icon={darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle dark mode"
    />
  );
}