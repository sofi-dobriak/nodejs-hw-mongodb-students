import { initMongoDB } from './db/initMongoDB';
import { startServer } from './server';

await initMongoDB();
startServer();
