function Demo() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="font-sans text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">Demo Page</h1>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-6">
        Placeholder for the Synapsis demo interface
      </p>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded flex items-center justify-center">
          <span className="font-mono text-gray-500 dark:text-gray-400">Demo content will appear here</span>
        </div>
      </div>
    </div>
  );
}

export default Demo;