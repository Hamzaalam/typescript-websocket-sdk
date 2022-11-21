
export interface ServerMessage {
  id: string;
  content: ClientMessage;
  sentAt: Date;
}

export type ClientMessage = string | Record<string, string>;

export interface ConfigType {
  url: string;
  element: HTMLElement;
}

export interface WebSocketClientSdk {
  on: (event: string, callback: (msg: ServerMessage) => void) => void;
  send: (msg: ClientMessage) => void;
  disconnect: () => void;
}