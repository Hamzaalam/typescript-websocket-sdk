import WebSocket from 'ws';
import fs from 'fs';
import { EventEmitter } from 'events';
import {v4 as uuidv4} from 'uuid';
import type { ConfigType, ServerMessage, ClientMessage, WebSocketClientSdk } from './type';

export type { ConfigType, ServerMessage, ClientMessage, WebSocketClientSdk }
export const DEFAULT_URL = 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';
export const DEFAULT_FILE_PATH = './logs/log.txt';

class NodeClientSdk implements WebSocketClientSdk {

  private readonly url: string;
  private readonly  ws: WebSocket;
  private readonly eventEmitter: EventEmitter;
  private readonly filePath: string;

  constructor(private config: ConfigType) {
    this.url = this.config.url;
    this.filePath = this.config.filePath;
    this.eventEmitter = new EventEmitter();
    this.ws = new WebSocket(this.url);
    this.init();
  }

  private init() {

    this.ws.on('open', () => {
      this.eventEmitter.emit('Nodejs WebSocket sdk is ready');
    });

    this.ws.on('close', (event) => {
        console.info('Nodejs WebSocket connection closed', event);
    });

    this.ws.addEventListener('error', (event) => {
      console.error('Something went wrong!', event);
    });
  }

  get getEventListener() {
    return this.eventEmitter;
  }
  get getWebSocketClient() {
    return this.ws;
  }

  private saveLogs(msg: string) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, `${msg}\n`);
      return;
    }
    else {
        fs.appendFileSync(this.filePath, `${msg}\n`);
    }
  }

  public send(msg: ClientMessage) {
    const message = typeof msg === 'string' ? msg : JSON.stringify(msg);
    this.saveLogs(`SENT: ${message}`);
    this.ws.send(message);
  }

  public on(event: string, callback: (message: ServerMessage) => void) {
    this.ws.on(event, (msg, isSingle) => {
      const message = isSingle ? msg : msg.toString();
      const inBoundEvent: ServerMessage = {
        id: uuidv4(),
        content: message,
        sentAt: new Date(),
      };
      this.saveLogs(`RECV: ${message}`);
      callback(inBoundEvent);
    });
  }

  public disconnect() {
    this.ws.close();
  }
}

export default NodeClientSdk;
