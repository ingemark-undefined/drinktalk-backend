import { Socket } from "socket.io";
import { createServer } from "http";

import newGame from "@handlers/newGame";
import joinGame from "./handlers/joinGame";
import startGame from "./handlers/startGame";
import lostGame from "./handlers/lostGame";
import onDisconnect from "./handlers/onDisconnect";
import rooms from "./misc/storage";
import io from "./misc/server";

const onConnection = (socket: Socket) => {
  socket.data.user = socket.handshake.auth.user;

  socket.on("new", (time) => newGame(socket, time));
  socket.on("join", (gameId) => joinGame(socket, gameId));
  socket.on("start", () => startGame(socket));
  socket.on("lost", () => lostGame(socket));
  socket.on("disconnect", () => onDisconnect(socket));
};

io.on("connection", onConnection);

io.of("/").adapter.on("delete-room", (room) => {
  delete rooms[room];
});
