import { Socket } from "socket.io";

import io from "../misc/server";
import rooms from "../misc/storage";

export default (socket: Socket) => {
  const gameId = socket.data.gameId;
  rooms[gameId].started = true;
  io.in(gameId).emit("started");
};
