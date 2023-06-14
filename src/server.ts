import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { errorLogger, logger } from './common/logger';
import { Server } from 'http';

process.on('uncaughtException', err => {
  errorLogger.error(
    'Unhandled rejection is detected. Shutting down the server ...',
    err
  );
  process.exit(1);
});
let server: Server;
const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect to MongoDB:', error);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
connectDB();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received')
//   if (server) {
//     server.close()
//   }
// })
