import { Socket } from 'socket.io';

import { io } from '@misc/index';

export default (socket: Socket) => {
  io.in(socket.data.gameId).emit('left', socket.data.user);
};
