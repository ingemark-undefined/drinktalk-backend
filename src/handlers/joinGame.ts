import { RemoteSocket, Socket } from 'socket.io';

import { rooms, io } from '@misc/index';
import { ERROR } from '@ts/types';

export default async (socket: Socket, gameId: string) => {
  // Get all current players
  const sockets = await io.in(gameId).fetchSockets();

  // Check if user with that name is already joined
  if (sockets.find((s: RemoteSocket<any>) => s.data.user === socket.data.user)) {
    socket.emit('exception', ERROR.USER_TAKEN);
    return;
  }

  // Send event that user joined the game
  io.in(gameId).emit('joined', socket.data.user);

  // Join the room
  socket.data.gameId = gameId;
  socket.join(gameId);

  // Send back the game data
  socket.emit('game', {
    time: rooms[gameId].time,
    players: sockets.map((s: RemoteSocket<any>) => s.data.user),
  });
};
