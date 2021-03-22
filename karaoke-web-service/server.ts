import express from 'express';
import router from './lib/routes/v1';
import cors from 'cors';
import config from 'config';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

const app = express();
const port = process.env.PORT || 5000;

const originCors = new RegExp(config.get('origin'));

const corsOptions = {
  origin: originCors,
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/', router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'https://localhost:3008',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
});

io.on('connection', (_socket: Socket) => {
  console.log('on connect');
});

httpServer.listen(port);
