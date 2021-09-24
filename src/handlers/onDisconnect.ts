import { Socket } from 'socket.io';

import { io } from '@misc/index';

export default (socket: Socket) => {
  // Send other players in the game event that the user has left
  io.in(socket.data.gameId).emit('left', socket.data.user);
};
