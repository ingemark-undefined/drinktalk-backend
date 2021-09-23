import { Socket } from 'socket.io';

import { io } from '@misc/index';

export default (socket: Socket, time: number) => {
  // Get gameId
  const gameId = socket.data.gameId;

  // Send message that the game has started
  io.in(gameId).emit('started', time);
};
