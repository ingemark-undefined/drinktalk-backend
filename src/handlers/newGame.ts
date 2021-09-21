import { Socket } from 'socket.io';
import { nanoid } from 'nanoid';

import { rooms } from '@misc/index';

export default (socket: Socket, time: number) => {
  // Generate random game id
  const gameId = nanoid();

  // Store game data
  rooms[gameId] = { time, started: false };

  // Join room with the gameId
  socket.join(gameId);
  socket.data.gameId = gameId;

  // Send back the gameId
  socket.emit('gameId', gameId);
};
