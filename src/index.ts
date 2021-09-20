import { Server, Socket } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  console.log("connection");
});

httpServer.listen(4000);
