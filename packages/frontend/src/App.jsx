import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Demo from './pages/Demo';

function App() {
  // Get the base URL based on environment
  // Use the value from .env file or default to '/'
  const basePath = import.meta.env.VITE_BASE_URL || '/';

  return (
    <BrowserRouter basename={basePath}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          {/* Add a catch-all route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
