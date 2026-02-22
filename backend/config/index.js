// Centralized configuration - all hardcoded values in one place
export const config = {
  PORT: process.env.PORT || 3001,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  DB_FILE: process.env.DB_FILE || './data.json',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
