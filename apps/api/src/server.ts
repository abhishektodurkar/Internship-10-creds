import 'dotenv/config';
import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { registerRoutes } from './routes';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));

registerRoutes(app);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: process.env.CORS_ORIGIN } });
io.on('connection', (socket) => socket.emit('connected', { id: socket.id }));

const port = Number(process.env.PORT ?? 4000);
httpServer.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
