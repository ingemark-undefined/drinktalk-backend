const { io: Client } = require('socket.io-client');
require('../index');
const { httpServer } = require('../misc/server');

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

  test('should receive started event after successfully starting the game', (done) => {
    // Create new game and start it
    player1.emit('game:new');
    player1.on('gameId', (a) => {
      player1.emit('game:start', 90);
      player1.on('started', (time) => {
        expect(time).toBe(90);
        done();
      });
    });
  });
});
