const express = require('express');
const path = require('path');
const cors = require('cors');
const net = require('net');

const app = express();
let PORT = process.env.PORT || 3000;

// Function to find an available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try the next port
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
    
    server.listen(startPort, () => {
      server.close(() => {
        resolve(startPort);
      });
    });
  });
};

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch-all route to serve the frontend for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server with available port
findAvailablePort(PORT)
  .then((availablePort) => {
    PORT = availablePort;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error finding available port:', err);
  });
