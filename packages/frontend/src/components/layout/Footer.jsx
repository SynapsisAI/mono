import { Code, Terminal, Cpu } from 'lucide-react';
import NeuronLogo from '../icons/NeuronLogo';
import GitHubIcon from '../icons/GitHubIcon';

/**
 * Terminal-themed footer component
 */
const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upper footer with sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company section */}
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <NeuronLogo width="24px" />
              <h3 className="ml-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Synapsis</h3>
            </div>
            <div className="font-mono text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
              <p className="flex items-start">
                <Code className="h-3.5 w-3.5 mr-2 mt-0.5 text-neutral-400 dark:text-neutral-500" />
                <span>Transforming complex text into engaging videos</span>
              </p>
              <p className="flex items-start">
                <Terminal className="h-3.5 w-3.5 mr-2 mt-0.5 text-neutral-400 dark:text-neutral-500" />
                <span>Built with cutting-edge technology</span>
              </p>
            </div>
          </div>
          
          {/* Navigation section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 uppercase tracking-wider font-mono">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'Info', 'Contact', 'Demo'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'Home' ? '/' : item === 'Demo' ? '/demo' : `/#${item.toLowerCase()}`}
                    className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors font-mono flex items-center"
                  >
                    <span className="text-neutral-400 dark:text-neutral-500 mr-2">$</span>
                    {item.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Stats section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 uppercase tracking-wider font-mono">System Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'version', value: 'v2.3.1' },
                { label: 'uptime', value: '99.9%' },
                { label: 'engine', value: 'core.ai' },
                { label: 'status', value: 'active' }
              ].map((stat) => (
                <div key={stat.label} className="flex items-center">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono mr-2">{stat.label}:</span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Terminal separator */}
        <div className="border-t border-dashed border-neutral-200 dark:border-neutral-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse mr-2"></div>
            <span className="text-xs text-neutral-500 dark:text-neutral-500 font-mono">synapsis_core.system --status=online</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/SynapsisAI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <span className="text-xs text-neutral-500 dark:text-neutral-500 font-mono">
              &copy; {year} Synapsis // All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;