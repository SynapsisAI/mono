import TextSummarizer from '@ui/TextSummarizer';

function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero section with text summarizer */}
      <TextSummarizer />
      
      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="font-sans text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Synapsis
          </h1>
          <p className="font-mono text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
            AI summarisation tool that turns text into video
          </p>
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-lg">
            Get Started
          </button>
        </div>
        
        {/* Feature highlights could go here */}
      </div>
    </div>
  );
}

export default Home;