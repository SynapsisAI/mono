import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black transition-colors">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        {children}
      </main>
      <footer className="py-6 px-4 text-center text-sm font-mono text-gray-500 dark:text-gray-400">
        Synapsis © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Layout;