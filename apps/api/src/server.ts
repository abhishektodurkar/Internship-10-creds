import 'dotenv/config';
import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { registerRoutes } from './routes';
import { errorHandler } from './middleware/error-handler';
import { env } from './configs/env';
import { logger } from './utils/logger';

const app = express();
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));

registerRoutes(app);
app.use(errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: env.CORS_ORIGIN } });
io.on('connection', (socket) => {
  logger.info('socket connected', { id: socket.id });
  socket.emit('connected', { id: socket.id });
});

httpServer.listen(env.PORT, () => {
  logger.info('API server started', { port: env.PORT });
});
