import net from 'node:net';


function startServer(port) {
  const server = net.createServer();

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use.`);
      // Find an available port
      findAvailablePort((err, availablePort) => {
        if (err) {
          console.error('No available ports found.');
          process.exit(1);
        }
        console.log(`Starting server on port ${availablePort}`);
        startServer(availablePort);
      });
    } else {
      console.error(`Server error: ${err}`);
      throw err;
    }
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    // ... rest of your server logic ...
  });
}

function findAvailablePort(callback) {
  const testPort = 8001; // Starting port for testing

  const testServer = net.createServer();
  testServer.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      findAvailablePort(callback); // Recursively try the next port
    } else {
      callback(err);
    }
  });

  testServer.listen(testPort, () => {
    testServer.close();
    callback(null, testPort);
  });
}

export {startServer}