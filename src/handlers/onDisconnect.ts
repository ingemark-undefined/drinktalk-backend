import { Socket } from "socket.io";

import io from "../misc/server";

export default (socket: Socket) => {
  io.in(socket.data.gameId).emit("left", socket.data.user);
};
