function IconButton({ 
  icon, 
  className = '', 
  ...props 
}) {
  return (
    <button
      className={`
        p-2 rounded-md transition-all
        text-gray-600 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-white
        hover:bg-gray-100 dark:hover:bg-gray-800
        focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700
        ${className}
      `}
      {...props}
    >
      {icon}
    </button>
  );
}

function TextButton({ 
  children, 
  active = false,
  className = '', 
  ...props 
}) {
  return (
    <button
      className={`
        relative px-3 py-2 font-mono text-sm transition-all
        ${active 
          ? 'text-gray-900 dark:text-white font-medium' 
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }
        ${className}
      `}
      {...props}
    >
      {children}
      {active && (
        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-900 dark:bg-gray-400" />
      )}
    </button>
  );
}

export { IconButton, TextButton };