import { Socket } from 'socket.io';

import { io } from '@misc/index';

export default (socket: Socket) => {
  const { gameId, user } = socket.data.gameId;
  io.in(gameId).emit('lost', user);
};
