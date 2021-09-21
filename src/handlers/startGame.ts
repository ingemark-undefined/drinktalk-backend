import { Socket } from 'socket.io';

import { rooms, io } from '@misc/index';

export default (socket: Socket) => {
  const gameId = socket.data.gameId;
  rooms[gameId].started = true;
  io.in(gameId).emit('started');
};
