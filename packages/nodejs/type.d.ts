import { EventEmitter } from 'events';
import WebSocket from 'ws';

export interface ServerMessage {
  id: string;
  content: ClientMessage;
  sentAt: Date;
}

export type ClientMessage = string | Record<string, string>;

export interface ConfigType {
  url: string;
  filePath: string;
}

export interface WebSocketClientSdk {
  on: (event: string, callback: (msg: ServerMessage) => void) => void;
  send: (msg: ClientMessage) => void;
  disconnect: () => void;
  getWebSocketClient: WebSocket;
  getEventListener: EventEmitter;
}