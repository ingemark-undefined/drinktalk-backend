const { io: Client } = require("socket.io-client");
require("../index");
const { httpServer } = require("../misc/server");

describe("new game module", () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = Client("http://localhost:4000", { auth: { user: "fifi" } });
    done();
  });

  afterEach(() => {
    clientSocket.close();
    httpServer.close();
  });

  test("should create new game and receive the gameId", (done) => {
    clientSocket.emit("game:new", 43);
    clientSocket.on("gameId", (gameId) => {
      expect(gameId).toBeTruthy();
      done();
    });
  });
});
