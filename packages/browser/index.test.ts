/**
 * @jest-environment jsdom
 */
import MockServer from 'jest-websocket-mock';
import BrowserClientSdk, { ServerMessage, DEFAULT_URL } from './index';

describe('Test Case for BrowserClientSdk', () => {
  
  let client: BrowserClientSdk;
  let server: MockServer;
  const mockUrl = 'ws://localhost:5000/';
  const parentElement = document.createElement('ul') as HTMLElement;

  beforeEach(() => {
    server = new MockServer(mockUrl);
    client = new BrowserClientSdk({ url: mockUrl,  element:parentElement});
  });

  afterEach(() => {
    jest.clearAllMocks();
    server.close();
  });

  test('Server listen for messages and match with client sent message!', () => {
    let message: ServerMessage;
    client.on('message', (msg:ServerMessage) => {
      message = msg;
    });
    server.send('hello everyone');
    expect(message!).toMatchObject({ content: 'hello everyone' });
  });

  test('Server listen for messages and match with client sent message!', async () => {
    client.send('Hello, from Browser Client');
    await expect(server).toReceiveMessage('Hello, from Browser Client');
    expect(server).toHaveReceivedMessages(['Hello, from Browser Client']);
  });

  test('check on, send, and disconnect functions exists', () => {
    expect(typeof client.on).toBe('function');
    expect(typeof client.send).toBe('function');
    expect(typeof client.disconnect).toBe('function');
  });

  test('disconnect  the client from server!', async () => {
    client.disconnect();
    await server.closed;
    expect(client.getWebSocketClient.readyState).toBe(WebSocket.CLOSED);
  });

});