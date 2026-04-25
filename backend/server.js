const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { Server } = require('socket.io');

// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Join global chat room
  socket.join('global-chat');

  socket.on('sendMessage', (data) => {
    // Broadcast message to everyone in the room
    io.to('global-chat').emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Pass io instance to app so controllers can use it if needed
app.set('io', io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
