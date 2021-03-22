import React from 'react';
import { io } from 'socket.io-client';

const API_ENDPOINT = 'http://localhost:5000/';

const socket = io(API_ENDPOINT, {
  transports: ['websocket', 'polling'],
});

export const SocketContext = React.createContext(socket);
