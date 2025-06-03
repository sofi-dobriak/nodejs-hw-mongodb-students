import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name: string): string | undefined {
  const value: string | undefined = process.env[name];

  if (value) return value;

  throw new Error(`Missing: process.env['${name}'].`);
}
