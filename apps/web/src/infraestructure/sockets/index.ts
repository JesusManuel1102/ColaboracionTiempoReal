import { createSocketClient } from '@repo/realtime/socket/client';

export const socketClient = createSocketClient('http://localhost:3001');
