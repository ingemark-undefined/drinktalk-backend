const { io: Client } = require('socket.io-client');
require('../index');
const { httpServer } = require('../misc/server');
const { ERROR } = require('../ts/types');

describe('join game module', () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = Client('http://localhost:4000', { auth: { user: 'player1' } });
    done();
  });

  afterEach(() => {
    clientSocket.close();
  });

  afterAll(() => {
    httpServer.close();
  });

  test('should receive an error that gameId does not exist', (done) => {
    clientSocket.emit('game:join', '123456');
    clientSocket.on('exception', (error) => {
      expect(error).toBe(ERROR.GAME_DOES_NOT_EXIST);
      done();
    });
  });

  test('should receive an error that user with that name is already joined', (done) => {
    // Create new game with user 'player1'
    clientSocket.emit('game:new', 90);
    clientSocket.on('gameId', (gameId) => {
      // Join the game with user 'player1'
      const player = new Client('http://localhost:4000', { auth: { user: 'player1' } });
      player.emit('game:join', gameId);
      player.on('exception', (error) => {
        expect(error).toBe(ERROR.USER_TAKEN);
        player.close();
        done();
      });
    });
  });

  test('should successfully join the game', (done) => {
    // Create new game with user 'player1'
    clientSocket.emit('game:new', 90);
    clientSocket.on('gameId', (gameId) => {
      // Join the game with user 'player2'
      const player = new Client('http://localhost:4000', { auth: { user: 'player2' } });
      player.emit('game:join', gameId);
      player.on('game', (game) => {
        expect(game.time).toBe(90);
        expect(game.players).toEqual(['player1', 'player2']);
        player.close();
        done();
      });
    });
  });
});
