import BrowserClientSdk, { DEFAULT_URL } from '@hamzaalam/browser';
import type { ServerMessage } from '@hamzaalam/browser';

const listElement = document.getElementById('list-element') as HTMLUListElement;
const status = document.getElementById('status') as HTMLDivElement;
const disconnectBtn = document.getElementById('disconnect') as HTMLButtonElement;
const sendBtn = document.getElementById('send') as HTMLButtonElement;

const sdk = new BrowserClientSdk({url: DEFAULT_URL, element: listElement });

sdk.on('message', (message:ServerMessage) => {
  console.log('Received', message.id, message.content, message.sentAt);
});

sendBtn.addEventListener('click', () => {
  const input = document.getElementById('message') as HTMLInputElement | null;
  const message = input?.value;
    if(message){
        sdk.send(message);
    }
});

disconnectBtn.addEventListener('click', () => {
  sdk.disconnect();
  status.innerText = 'Sdk Client is disconnected from server!';
});