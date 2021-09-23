import { Socket } from 'socket.io';
import { nanoid } from 'nanoid';

export default (socket: Socket) => {
  // Generate random game id
  const gameId = nanoid();

  // Join room with the gameId
  socket.join(gameId);
  socket.data.gameId = gameId;

  // Send back the gameId
  socket.emit('gameId', gameId);
};
