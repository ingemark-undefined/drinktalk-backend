const { io: Client } = require('socket.io-client');
require('../index');
const { httpServer } = require('../misc/server');
const { ERROR } = require('../ts/types');

describe('join game module', () => {
  let player1, player2;

  beforeEach((done) => {
    player1 = new Client('http://localhost:4000', { auth: { user: 'player1' } });
    player2 = new Client('http://localhost:4000', { auth: { user: 'player2' }, autoConnect: false });
    done();
  });

  afterEach(() => {
    player1.close();
    player2.close();
  });

  afterAll(() => {
    httpServer.close();
  });

  test('should receive an error that gameId does not exist', (done) => {
    player1.emit('game:join', '123456');
    player1.on('exception', (error) => {
      expect(error).toBe(ERROR.GAME_DOES_NOT_EXIST);
      done();
    });
  });

  test('should receive an error that user with that name is already joined', (done) => {
    // Create new game with user 'player1'
    player1.emit('game:new', 90);
    player1.on('gameId', (gameId) => {
      // Join the game with user 'player1'
      player2.auth.user = 'player1';
      player2.connect();
      player2.emit('game:join', gameId);
      player2.on('exception', (error) => {
        expect(error).toBe(ERROR.USER_TAKEN);
        done();
      });
    });
  });

  test('should successfully join the game', (done) => {
    // Create new game with user 'player1'
    player1.emit('game:new', 90);
    player1.on('gameId', (gameId) => {
      // Join the game with user 'player2'
      player2.connect();
      player2.emit('game:join', gameId);
      player2.on('game', (game) => {
        expect(game.time).toBe(90);
        expect(game.players).toEqual(['player1', 'player2']);
        done();
      });
    });
  });

  test('receive joined event when other player joins', (done) => {
    // Create new game with user 'player1'
    player1.emit('game:new', 90);
    player1.on('gameId', (gameId) => {
      // Join the game with user 'player2'
      player2.connect();
      player2.emit('game:join', gameId);
      player1.on('joined', (user) => {
        expect(user).toBe('player2');
        done();
      });
    });
  });

  test('receive left event when other player joins', (done) => {
    // Create new game with user 'player1'
    player1.emit('game:new', 90);
    player1.on('gameId', (gameId) => {
      // Join the game with user 'player2'
      player2.connect();
      player2.emit('game:join', gameId);
      player2.on('game', () => player2.disconnect());
      player1.on('left', (user) => {
        expect(user).toBe('player2');
        done();
      });
    });
  });
});
