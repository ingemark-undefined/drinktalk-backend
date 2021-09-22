const { io: Client } = require("socket.io-client");
require("../index");
const { httpServer } = require("../misc/server");
const { ERROR } = require("../ts/types");

describe("join game module", () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = Client("http://localhost:4000", { auth: { user: "fifi" } });
    done();
  });

  afterEach(() => {
    clientSocket.close();
  });

  afterAll(() => {
    httpServer.close();
  });

  test("should receive an error that gameId does not exist", (done) => {
    clientSocket.emit("game:join", "123456");
    clientSocket.on("exception", (error) => {
      expect(error).toBe(ERROR.GAME_DOES_NOT_EXIST);
      done();
    });
  });

  test("should successfully join the game", (done) => {
    // Create new game
    clientSocket.emit("game:new", 90);
    clientSocket.on("gameId", (gameId) => {
      const player = new Client("http://localhost:4000", { auth: { user: "player" } });
      player.emit("game:join", gameId);
      player.on("game", (game) => {
        console.log(game);
        expect(game.time).toBe(90);
        expect(game.players).toBe(["fifi", "player"]);
        done();
      });
    });
  });
});
