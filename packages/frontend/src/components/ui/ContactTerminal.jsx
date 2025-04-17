import { useState } from 'react';
import { Send, Terminal, Users, Mail } from 'lucide-react';

/**
 * A terminal-style contact form component
 */
const ContactTerminal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend
    console.log({ name, email, message });
    setSubmitted(true);
    // Reset form after "submission"
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div id="contact" className="bg-white dark:bg-black shadow-md border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden w-full font-mono">
      {/* Terminal Header */}
      <div className="bg-neutral-100 dark:bg-zinc-900 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
            <Terminal className="h-3.5 w-3.5 mr-1.5" />
            synapsis_core.contact — message
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center space-x-2">
          <div className="py-0.5 px-2 rounded bg-neutral-200 dark:bg-neutral-800">
            <span className="text-xs text-neutral-600 dark:text-neutral-400 tracking-wider">READY</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></div>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-5 bg-white dark:bg-black">
        {/* Command prompt section */}
        <div className="space-y-4 mb-6">
          <p className="text-neutral-500 dark:text-neutral-500">// SYNAPSIS – CONTACT INTERFACE</p>
          <p className="text-neutral-700 dark:text-neutral-300">
            <span className="text-neutral-400 dark:text-neutral-500">$</span> <span className="text-neutral-800 dark:text-neutral-200">synapsis</span> <span className="text-neutral-500 dark:text-neutral-400">--contact</span>
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 pl-4 border-l border-neutral-200 dark:border-neutral-800 text-sm">
            Interested in Synapsis? Submit your information below and our team will respond shortly.
          </p>
        </div>
        
        {/* Contact form as terminal input */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="text-xs text-neutral-500 dark:text-neutral-500 w-24 flex items-center">
                  <Users className="h-3 w-3 mr-1.5" />
                  <span>name:</span>
                </label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 rounded px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                  placeholder="Your Name"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <label className="text-xs text-neutral-500 dark:text-neutral-500 w-24 flex items-center">
                  <Mail className="h-3 w-3 mr-1.5" />
                  <span>email:</span>
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 rounded px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="flex items-start mt-4">
                <label className="text-xs text-neutral-500 dark:text-neutral-500 w-24 pt-2 flex items-center">
                  <Terminal className="h-3 w-3 mr-1.5" />
                  <span>message:</span>
                </label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 rounded px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 min-h-[100px] font-mono"
                  placeholder="Enter your message here..."
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="flex items-center space-x-1.5 bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200 dark:hover:bg-zinc-800 border border-neutral-300 dark:border-neutral-700 rounded px-4 py-1.5 text-sm transition-colors"
              >
                <span className="text-neutral-700 dark:text-neutral-300">submit</span>
                <Send className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-500" />
              </button>
            </div>
          </form>
        ) : (
          <div className="border border-neutral-200 dark:border-neutral-800 rounded p-4 bg-neutral-50 dark:bg-zinc-900">
            <p className="text-neutral-700 dark:text-neutral-300 flex items-center">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono mr-2">></span>
              <span className="text-xs">Message received. Processing...</span>
            </p>
            <p className="text-green-600 dark:text-green-400 text-sm mt-2 font-mono">
              status: success
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4">
              Thank you for your message. Our team will get back to you shortly.
            </p>
          </div>
        )}
      </div>
      
      {/* Terminal Footer */}
      <div className="bg-neutral-50 dark:bg-zinc-900 px-4 py-1.5 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-xs font-mono">
        <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-500">
          <span>secure-message</span>
        </div>
        <div className="flex items-center space-x-2 text-neutral-500 dark:text-neutral-500">
          <span>contact-module</span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;