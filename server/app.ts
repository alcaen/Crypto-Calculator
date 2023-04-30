import type { Express } from 'express';
import express from 'express';
import priceRouter from './routes/price.routes';
import returnsRouter from './routes/monthReturn.routes';

import morgan from 'morgan';
import { Server as ServerIO } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { getAllAssets, getSelectedCoins } from './services/price.service';

const app: Express = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(priceRouter);
app.use(returnsRouter);

const server = http.createServer(app);
const io = new ServerIO(server, {
  cors: {
    origin: '*',
  },
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loop() {
  while (true) {
    const selectedCoins = await getSelectedCoins();
    io.sockets.emit('prices', selectedCoins);
    await delay(600000);
  }
}

void loop();

io.on('connection', (socket) => {
  console.log(`User ${socket.id} Connected`);
});

export default server;
