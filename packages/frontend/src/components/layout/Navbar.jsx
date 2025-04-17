import { Link, useLocation } from 'react-router-dom';
import { IconButton, TextButton } from '../ui/Button';
import DarkModeToggle from '../ui/DarkModeToggle';
import GitHubIcon from '../icons/GitHubIcon';
import NeuronLogo from '../icons/NeuronLogo';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <NeuronLogo width="30px" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold font-sans text-gray-900 dark:text-gray-100">
                  Synapsis
                </span>
                <span className="ml-2 text-xs bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-200 px-1.5 py-0.5 rounded-md font-mono">
                  alpha
                </span>
              </div>
            </Link>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center">
            <nav className="flex items-center mr-2">
              <Link to="/">
                <TextButton active={isActive('/')} className="tracking-wide uppercase text-xs">
                  Home
                </TextButton>
              </Link>
              
              <Link to="/demo">
                <TextButton active={isActive('/demo')} className="tracking-wide uppercase text-xs">
                  Demo
                </TextButton>
              </Link>
            </nav>
            
            {/* Icon buttons */}
            <div className="flex items-center space-x-2">
              <DarkModeToggle />
              
              <a href="https://github.com/SynapsisAI" target="_blank" rel="noopener noreferrer">
                <IconButton 
                  icon={<GitHubIcon />} 
                  aria-label="GitHub"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;