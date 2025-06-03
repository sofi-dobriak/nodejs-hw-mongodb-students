import { initMongoDB } from './db/initMongoDB';
import { startServer } from './server';

const bootstrap = async (): Promise<void> => {
  await initMongoDB();
  startServer();
};

bootstrap();
