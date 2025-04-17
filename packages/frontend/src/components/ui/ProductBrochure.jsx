import { useState } from 'react';
import { Code, FileText, Video, Zap, Upload, MessageSquare, Cpu, Terminal, ServerCrash } from 'lucide-react';

/**
 * A technical terminal-like information component explaining Synapsis
 */
const ProductBrochure = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Content for the brochure
  const features = [
    {
      id: 'simplify',
      title: 'ANALYZE',
      icon: <Code className="h-4 w-4" />,
      description: 'Synapsis breaks down complex documents into clear, structured data that can be transformed into engaging content.',
      benefit: '> reduces_processing_time(hours) -> minutes'
    },
    {
      id: 'engage',
      title: 'RENDER',
      icon: <Cpu className="h-4 w-4" />,
      description: 'Transforms plain text into visual data sequences that effectively communicate complex information.',
      benefit: '> increases_retention(audience) -> 73%'
    },
    {
      id: 'transform',
      title: 'EXECUTE',
      icon: <Terminal className="h-4 w-4" />,
      description: 'Single command execution to process input, generate models, and output a complete video file.',
      benefit: '> removes_dependencies(video_editing_skills) -> true'
    }
  ];
  
  const howItWorks = [
    {
      step: 1,
      title: 'INPUT data',
      icon: <Upload className="h-4 w-4" />,
      description: 'Upload your document (*.txt, *.pdf, *.docx) to the secure processing pipeline.'
    },
    {
      step: 2,
      title: 'PROCESS with ML',
      icon: <FileText className="h-4 w-4" />,
      description: 'Intelligent processing distills content to core conceptual structures using semantic analysis.'
    },
    {
      step: 3,
      title: 'GENERATE media',
      icon: <Video className="h-4 w-4" />,
      description: 'Transforms processed data into synchronized visual and audio components.'
    },
    {
      step: 4,
      title: 'OUTPUT video',
      icon: <Zap className="h-4 w-4" />,
      description: 'Export the compiled video file to your preferred destination (local/cloud).'
    }
  ];
  
  const tabs = [
    { id: 'why', label: 'SYSTEM.INFO' },
    { id: 'how', label: 'PROCESS.MAP' }
  ];
  
  // Random stats for tech aesthetic
  const sysStats = {
    models: '17',
    accuracy: '94.7%',
    uptime: '99.9%',
    version: 'v2.3.1',
    cores: '64',
    memory: '128GB'
  };
  
  return (
    <div className="bg-white dark:bg-black shadow-md border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden w-full font-mono">
      {/* Terminal Header */}
      <div className="bg-neutral-100 dark:bg-zinc-900 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
            <Cpu className="h-3.5 w-3.5 mr-1.5" />
            synapsis_core.system — information
          </div>
        </div>
        
        {/* System status indicator */}
        <div className="flex items-center space-x-2">
          <div className="py-0.5 px-2 rounded bg-neutral-200 dark:bg-neutral-800">
            <span className="text-xs text-neutral-600 dark:text-neutral-400 tracking-wider">SYSTEM.ACTIVE</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></div>
        </div>
      </div>
      
      {/* Command Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-zinc-900">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 text-xs font-medium tracking-wider transition-colors ${
              activeTab === index 
                ? 'bg-white dark:bg-black text-neutral-800 dark:text-neutral-200 border-r border-neutral-200 dark:border-neutral-800' 
                : 'bg-neutral-100 dark:bg-zinc-900 text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 border-r border-neutral-200 dark:border-neutral-800'
            }`}
          >
            <code>{tab.label}</code>
          </button>
        ))}
        <div className="flex-1 bg-neutral-100 dark:bg-zinc-900 border-b-0"></div>
      </div>
      
      {/* Terminal Content Area */}
      <div className="p-5 bg-white dark:bg-black">
        {/* System.Info Tab */}
        {activeTab === 0 && (
          <div className="space-y-6">
            {/* Terminal intro */}
            <div className="font-mono space-y-1 text-sm">
              <p className="text-neutral-500 dark:text-neutral-500">// SYNAPSIS ENGINE – AI Video Generation System</p>
              <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                <span className="text-neutral-400 dark:text-neutral-500">$</span> <span className="text-neutral-800 dark:text-neutral-200">synapsis</span> <span className="text-neutral-500 dark:text-neutral-400">--info</span>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 border-l border-neutral-200 dark:border-neutral-800 mb-2">
                Synapsis employs advanced algorithms to transform complex document input into optimized video output. Designed for technical professionals, educators, and content creators who need to explain complex subjects efficiently.
              </p>
              <div className="flex flex-wrap gap-3 pl-4 pt-1 pb-2">
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs">content.summarization</span>
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs">semantic.analysis</span>
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs">media.synthesis</span>
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs">data.visualization</span>
              </div>
            </div>
            
            {/* Features as code blocks */}
            <div className="space-y-4">
              <p className="text-neutral-700 dark:text-neutral-300">
                <span className="text-neutral-400 dark:text-neutral-500">$</span> <span className="text-neutral-800 dark:text-neutral-200">synapsis</span> <span className="text-neutral-500 dark:text-neutral-400">--capabilities</span>
              </p>
              
              <div className="grid gap-4 md:grid-cols-3">
                {features.map(feature => (
                  <div key={feature.id} className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-zinc-900 rounded">
                    <div className="border-b border-neutral-200 dark:border-neutral-800 px-3 py-1.5 flex items-center justify-between bg-neutral-100 dark:bg-zinc-900">
                      <div className="flex items-center">
                        <div className="mr-2 text-neutral-500 dark:text-neutral-400">
                          {feature.icon}
                        </div>
                        <code className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{feature.title}</code>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 font-mono">{feature.description}</p>
                      <code className="text-xs text-neutral-500 dark:text-neutral-500 font-mono">{feature.benefit}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Who can use */}
            <div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                <span className="text-neutral-400 dark:text-neutral-500">$</span> <span className="text-neutral-800 dark:text-neutral-200">synapsis</span> <span className="text-neutral-500 dark:text-neutral-400">--users</span>
              </p>
              
              <div className="border border-neutral-200 dark:border-neutral-800 rounded">
                <div className="border-b border-neutral-200 dark:border-neutral-800 px-3 py-1.5 bg-neutral-100 dark:bg-zinc-900">
                  <code className="text-xs font-bold text-neutral-700 dark:text-neutral-300">USER.PROFILES</code>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-zinc-900">
                  <div className="grid md:grid-cols-2 gap-y-1 gap-x-3">
                    {[
                      'Educators explaining complex topics',
                      'Technical writers creating documentation',
                      'Researchers presenting findings',
                      'Data scientists visualizing analysis',
                      'Engineers demonstrating concepts',
                      'Product managers explaining features'
                    ].map((user, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="font-mono text-neutral-400 dark:text-neutral-500">></span>
                        <span>{user}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Process.Map Tab */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <div className="font-mono space-y-1 text-sm">
              <p className="text-neutral-500 dark:text-neutral-500">// SYNAPSIS PROCESS VISUALIZATION</p>
              <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                <span className="text-neutral-400 dark:text-neutral-500">$</span> <span className="text-neutral-800 dark:text-neutral-200">synapsis</span> <span className="text-neutral-500 dark:text-neutral-400">--pipeline</span>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 border-l border-neutral-200 dark:border-neutral-800 mb-2">
                Synapsis processes documents through a multi-stage pipeline, transforming raw text into structured video output through computational analysis and media synthesis.
              </p>
            </div>
            
            {/* Process steps as a pipeline visualization */}
            <div className="space-y-1">
              {howItWorks.map((step) => (
                <div key={step.step} className="flex items-start group">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 mr-3">
                    <div className="w-6 h-6 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-500 text-xs border border-neutral-300 dark:border-neutral-700">
                      {step.step}
                    </div>
                    {step.step < howItWorks.length && (
                      <div className="w-[1px] h-10 bg-neutral-200 dark:bg-neutral-800 mt-1 mx-auto"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <div className="border border-neutral-200 dark:border-neutral-800 rounded mb-1 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors">
                      <div className="border-b border-neutral-200 dark:border-neutral-800 px-3 py-1.5 bg-neutral-100 dark:bg-zinc-900 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-neutral-200 dark:bg-neutral-800 h-4 w-4 rounded-sm flex items-center justify-center mr-2 text-neutral-500 dark:text-neutral-500">
                            {step.icon}
                          </div>
                          <code className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{step.title}</code>
                        </div>
                        <div className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                      </div>
                      <div className="p-3 bg-neutral-50 dark:bg-zinc-900">
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tech details block */}
            <div className="border border-neutral-200 dark:border-neutral-800 rounded overflow-hidden bg-neutral-50 dark:bg-zinc-900">
              <div className="border-b border-neutral-200 dark:border-neutral-800 px-3 py-1.5 bg-neutral-100 dark:bg-zinc-900 flex items-center">
                <ServerCrash className="h-3.5 w-3.5 mr-2 text-neutral-500 dark:text-neutral-500" />
                <code className="text-xs font-bold text-neutral-700 dark:text-neutral-300">TECHNICAL.SPECS</code>
              </div>
              
              <div className="p-3">
                <div className="text-xs text-neutral-600 dark:text-neutral-400 font-mono grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500">models: </span>
                    <span>{sysStats.models}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500">accuracy: </span>
                    <span>{sysStats.accuracy}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500">uptime: </span>
                    <span>{sysStats.uptime}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500">version: </span>
                    <span>{sysStats.version}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500">cores: </span>
                    <span>{sysStats.cores}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500">memory: </span>
                    <span>{sysStats.memory}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Terminal Footer */}
      <div className="bg-neutral-50 dark:bg-zinc-900 px-4 py-1.5 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-xs font-mono">
        <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-500">
          <span>v2.3.1</span>
          <span>|</span>
          <span>neural.engine</span>
        </div>
        <div className="flex items-center space-x-2 text-neutral-500 dark:text-neutral-500">
          <span>synapsis-core</span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductBrochure;