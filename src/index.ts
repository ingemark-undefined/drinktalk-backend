import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { nanoid } from "nanoid";

const httpServer = createServer();
const io = new Server(httpServer);

type RoomData = {
  time: number;
  started: boolean;
};

type Rooms = {
  [key: string]: RoomData;
};

const rooms: Rooms = {};

io.on("connection", (socket: Socket) => {
  socket.data.user = socket.handshake.auth.user;

  socket.on("new", ({ time }) => {
    // Generate random game id
    const gameId = nanoid();

    // Store game data
    rooms[gameId].time = time;

    // Join room with the gameId
    socket.join(gameId);
    socket.data.gameId = gameId;

    // Send back the gameId
    socket.emit("gameId", gameId);
  });

  socket.on("join", async (gameId) => {
    // Send event that user joined the game
    io.in(gameId).emit("joined", socket.data.user);

    // Join the room
    socket.data.gameId = gameId;
    socket.join(gameId);

    // Get all current players
    const sockets = await io.in(gameId).fetchSockets();

    // Send back the game data
    socket.emit("game", { time: rooms[gameId].time, players: sockets.map((s) => s.data.user) });
  });

  socket.on("start", async () => {
    const gameId = socket.data.gameId;
    rooms[gameId].started = true;
    io.in(gameId).emit("started");
  });

  socket.on("lost", async () => {
    const { gameId, user } = socket.data.gameId;
    io.in(gameId).emit("lost", user);
  });

  socket.on("disconnect", () => {
    io.in(socket.data.gameId).emit("left", socket.data.user);
  });
});

io.of("/").adapter.on("delete-room", (room) => {
  delete rooms[room];
});

httpServer.listen(4000);
