

import NodeClientSdk, { DEFAULT_URL, DEFAULT_FILE_PATH } from '@hamzaalam/nodejs';
import type { ServerMessage } from '@hamzaalam/nodejs';

function NodeClientSdkExample () {

  const sdk = new NodeClientSdk({ url:DEFAULT_URL, filePath: DEFAULT_FILE_PATH });

  setInterval(() => {
    sdk.send("Hello, I am connected from nodejs sdk");
  }, 3000);
  
  sdk.on('message', (message: ServerMessage) => {
    console.log('Received', message.id, message.content, message.sentAt);
  });
}

NodeClientSdkExample();



