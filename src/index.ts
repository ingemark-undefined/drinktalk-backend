import { Socket } from 'socket.io';

import { newGame, joinGame, startGame, lostGame, onDisconnect } from '@handlers/index';
import { rooms, io } from '@misc/index';

const onConnection = (socket: Socket) => {
  socket.data.user = socket.handshake.auth.user;

  socket.on('new', (time) => newGame(socket, time));
  socket.on('join', (gameId) => joinGame(socket, gameId));
  socket.on('start', () => startGame(socket));
  socket.on('lost', () => lostGame(socket));
  socket.on('disconnect', () => onDisconnect(socket));
};

io.on('connection', onConnection);

io.of('/').adapter.on('delete-room', (room) => {
  delete rooms[room];
});
