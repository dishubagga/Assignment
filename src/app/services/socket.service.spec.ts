import { TestBed } from '@angular/core/testing';
import { Server } from 'mock-socket';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';

describe('SocketService', () => {
  let service: SocketService;
  const SERVER_URL = 'http://localhost:8080';
  const mockServer = new Server(SERVER_URL);

  mockServer.on('connection', socket => {
    mockServer.emit('server-message', 'test message 1');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test simple connection', async (done: DoneFn) => {

    const socket = io.connect(SERVER_URL);

    socket.on('server-message', (message) => {
      expect(message).toEqual('test message 1');
      mockServer.stop();
      done();
    });
  });
});
