import { RemoteSocket, Socket } from 'socket.io';

import { rooms, io } from '@misc/index';
import { ERROR } from '@ts/types';

export default async (socket: Socket, gameId: string) => {
  try {
    // Check if game with the provided gameId exists
    if (!io.of('/').adapter.rooms.has(gameId)) {
      throw new Error(ERROR.GAME_DOES_NOT_EXIST);
    }

    // Get all current players
    const sockets = await io.in(gameId).fetchSockets();

    // Check if user with that name is already joined
    if (sockets.find((s: RemoteSocket<any>) => s.data.user === socket.data.user)) {
      throw new Error(ERROR.USER_TAKEN);
    }

    // Send event that user joined the game
    io.in(gameId).emit('joined', socket.data.user);

    // Join the room
    socket.data.gameId = gameId;
    socket.join(gameId);

    // Format players array
    const players = [...sockets.map((s: RemoteSocket<any>) => s.data.user), socket.data.user];

    // Send back the game data
    socket.emit('game', {
      time: rooms[gameId].time,
      players: players,
    });
  } catch (error: any) {
    socket.emit('exception', error.message);
  }
};
