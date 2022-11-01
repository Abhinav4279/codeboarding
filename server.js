const {Server} = require('socket.io')
const express = require('express');
const http = require('http');
const ACTIONS = require('./src/Actions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      }
    }
  )
}

io.on('connection', (socket) => {
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socketId,
      })
    })
  })

  socket.on(ACTIONS.CODE_CHANGE, ({roomId, value: code}) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { roomId, code });
  })

  socket.on(ACTIONS.BOARD_CHANGE, ({roomId, lines: slines}) => {
    socket.in(roomId).emit(ACTIONS.BOARD_CHANGE, { roomId, slines });
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];

    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      })
    })

    delete userSocketMap[socket.id]
    socket.leave();
  })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));