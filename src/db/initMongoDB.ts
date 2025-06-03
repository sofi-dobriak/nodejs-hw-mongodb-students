import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar';

export const initMongoDB = async (): Promise<void> => {
  try {
    const user: string | undefined = getEnvVar('MONGODB_USER');
    const password: string | undefined = getEnvVar('MONGODB_PASSWORD');
    const url: string | undefined = getEnvVar('MONGODB_URL');
    const db: string | undefined = getEnvVar('MONGODB_DB');

    if (!user || !password || !url || !db) {
      throw new Error(
        'Missing one or more environment variables for MongoDB connection',
      );
    }

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error: unknown) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
