import { Socket } from 'socket.io';

import { newGame, joinGame, startGame, onDisconnect } from '@handlers/index';
import { io } from '@misc/index';

const onConnection = (socket: Socket) => {
  socket.data.user = socket.handshake.auth.user;

  socket.on('game:new', () => newGame(socket));
  socket.on('game:join', (gameId) => joinGame(socket, gameId));
  socket.on('game:start', (time) => startGame(socket, time));

  socket.on('disconnect', () => onDisconnect(socket));
};

io.on('connection', onConnection);
