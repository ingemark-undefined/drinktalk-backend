import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer);

httpServer.listen(process.env.PORT || 4000);

export default io;
