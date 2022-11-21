import MockServer from 'jest-websocket-mock';
import type { ServerMessage, WebSocketClientSdk } from './type';
import NodeClientSdk from './index';

describe('Test Case for NodeClientSdk', () => {
  let server: MockServer;
  let client: WebSocketClientSdk;
  const mockUrl = 'ws://localhost:5000/';

  beforeEach(() => {
    server = new MockServer(mockUrl);
    client = new NodeClientSdk({ url: mockUrl, filePath:'./logs/log.txt' });
  });

  afterEach(() => {
    jest.clearAllMocks();
    server.close();
  });

  test('check on, send, and disconnect functions exists', async () => {
    client.getWebSocketClient.on('open', () => {
      expect(typeof client.on).toBe('function');
      expect(typeof client.send).toBe('function');
      expect(typeof client.disconnect).toBe('function');
    });
  });

  test('Server listen for messages and match with client sent message!', async () => {
    client.getWebSocketClient.on('open', async () => {
      let message: ServerMessage;
      client.on('message', (msg) => {
        message = msg;
      });
      server.send('Hello, from nodejs client');
      await expect(message!).toMatchObject({ content: 'Hello, from nodejs client' });
    });
  });

  test('disconnect  the client from server!', async () => {
    client.getWebSocketClient.on('open', async () => {
      client.disconnect();
      await server.closed;
      expect(client.getWebSocketClient.readyState).toBe(client.getWebSocketClient.CLOSED);
    });
  });

});