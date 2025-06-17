import { MONGO } from '../types/mongo';
export const MONGO_CONSTANTS: MONGO = {
  PORT: 'PORT',
  USER: 'MONGODB_USER',
  PASSWORD: 'MONGODB_PASSWORD',
  URL: 'MONGODB_URL',
  DB: 'MONGODB_DB',
};

interface SORT {
  ASC: string;
  DESC: string;
}

export const SORT_ORDER: SORT = {
  ASC: 'asc',
  DESC: 'desc',
};
