const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(__dirname + '/public'));

// Set up a basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
