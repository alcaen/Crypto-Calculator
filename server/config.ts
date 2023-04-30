import dotenv from 'dotenv';

// Config the enviroment variables
dotenv.config();

// use the .env {PORT} if no one is there use 8000
export const PORT = process.env.PORT || 8000;

// use the .env {BASE_URL} if no one is there use https://data.messari.io/api/v2 this is used for the all coin fetch
export const BASE_URL =
  process.env.BASE_URL || 'https://data.messari.io/api/v2';

// use the .env {PORT} if no one is there use https://data.messari.io/api/v1 this is used for the single coin fetch
export const BASE_URL_V1 =
  process.env.BASE_URL_V1 || 'https://data.messari.io/api/v1';
