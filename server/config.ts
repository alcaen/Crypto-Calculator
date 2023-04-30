import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const BASE_URL =
  process.env.BASE_URL || 'https://data.messari.io/api/v1';
