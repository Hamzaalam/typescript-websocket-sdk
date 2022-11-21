import { EventEmitter } from 'events';
import {v4 as uuidv4} from 'uuid';
import type { ConfigType, ServerMessage, ClientMessage, WebSocketClientSdk } from './type';

export type { ConfigType, ServerMessage, ClientMessage, WebSocketClientSdk }
export const DEFAULT_URL = 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';

class BrowerClientSdk implements WebSocketClientSdk {
  private element: HTMLElement;
  private readonly url: string;
  private readonly  ws: WebSocket;
  private readonly eventEmitter: EventEmitter;

  constructor(private config: ConfigType) {
    this.url = this.config.url;
    this.element = this.config.element;
    this.eventEmitter = new EventEmitter();
    this.ws = new WebSocket(this.url);
    this.init();
  }

  private init() {

    this.ws.addEventListener('open', () => {
      this.eventEmitter.emit('Nodejs WebSocket sdk is ready');
    });

    this.ws.addEventListener('close', (event) => {
        console.info('Nodejs WebSocket connection closed', event);
    });

    this.ws.addEventListener('error', (event) => {
      console.error('Something went wrong!', event);
    });
  }


  get getWebSocketClient() {
    return this.ws;
  }


  public send(msg: ClientMessage) {
    const id = Date.now();
    const data = typeof msg === 'string' ? msg : JSON.stringify(msg);

    const listElement = document.createElement('li');
    listElement.setAttribute('id', id.toString());
    listElement.appendChild(document.createTextNode(`SEND: ${data}`));
    this.element.appendChild(listElement);

    this.ws.send(data);
  }

  public on(eventCalled: string, callback: (message: ServerMessage) => void) {
    this.ws.addEventListener(eventCalled, (event) => {
    const msg = (event as MessageEvent).data;
    const listElement = document.createElement('li');  
    const id =  uuidv4();
    listElement.setAttribute('id', id);
    listElement.appendChild(document.createTextNode(`RECV: ${msg}`));
    this.element.appendChild(listElement);
      const inBoundEvent: ServerMessage = {
        id: uuidv4(),
        content: msg,
        sentAt: new Date(),
      };
      callback(inBoundEvent);
    });
  }
  public disconnect() {
    this.ws.close();
  }
}

export default BrowerClientSdk;
