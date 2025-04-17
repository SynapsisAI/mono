import './App.css'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="text-center">
        <h1 className="font-sans text-4xl font-bold text-gray-900 dark:text-white mb-4">Synapsis</h1>
        <p className="font-mono text-lg text-gray-600 dark:text-gray-300">
          AI summarisation tool that turns text into video
        </p>
      </div>
      
      <DarkModeToggle />
    </div>
  )
}

export default App
