import type { Express } from 'express';
import express from 'express';
import priceRouter from './routes/price.routes';
import returnsRouter from './routes/monthReturn.routes';

import morgan from 'morgan';
import { Server as ServerIO } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { getAllAssets, getSelectedCoins } from './services/price.service';

// Init express
const app: Express = express();

// Midlewate and routes to the rest api
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(priceRouter);
app.use(returnsRouter);

// Configure the Cross-origin resource sharing (cors)
const server = http.createServer(app);
const io = new ServerIO(server, {
  cors: {
    origin: '*',
  },
});

// This is the timer that handles the delay
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Init a variable that handles the amount of user connected in this way we only send data if is someone listening
let numConnectedUsers = Object.keys(io.sockets.sockets).length;

// If we want to send all coins instead of the selected ones update the getSelectedCoins() to getAllAssets()
async function emitSelectedAssets({ delay }: { delay: number }) {
  // loop infinite
  while (true) {
    // Only fetch and emit fresh data if at least one user is connect
    if (numConnectedUsers > 0) {
      // Log the proccess of sending (Connected > 0)
      console.log(
        `Sending selected coins. Delay:${delay}. Users:${numConnectedUsers}`
      );
      const selectedCoins = await getSelectedCoins();
      io.sockets.emit('prices', selectedCoins);
    } else {
      // Log the proccess of sending (Connected == 0)
      console.log(`No users connected. Delay:${delay}`);
    }
    await wait(delay);
  }
}

// emit selected assets to all clients every {delay} time
// delay is in ms so 600000 is 10 minutes
void emitSelectedAssets({ delay: 6000 });

io.on('connection', async (socket) => {
  // When a client connects update the user count (+1) and print the id on the server console
  numConnectedUsers++;
  console.log(`User ${socket.id} Connected. Total Users ${numConnectedUsers}`);
  // Emit the selected coins to the connected client
  socket.emit('prices', await getSelectedCoins());
  // When a client connects update the user count (-1) and print the id on the server console
  socket.on('disconnect', function () {
    numConnectedUsers--;
    console.log(
      `User ${socket.id} Disconnected. Total Users ${numConnectedUsers}`
    );
  });
});

export default server;
