import { RemoteSocket, Socket } from 'socket.io';

import { rooms, io } from '@misc/index';

export default async (socket: Socket, gameId: string) => {
  // Send event that user joined the game
  io.in(gameId).emit('joined', socket.data.user);

  // Join the room
  socket.data.gameId = gameId;
  socket.join(gameId);

  // Get all current players
  const sockets = await io.in(gameId).fetchSockets();

  // Send back the game data
  socket.emit('game', {
    time: rooms[gameId].time,
    players: sockets.map((s: RemoteSocket<any>) => s.data.user),
  });
};
