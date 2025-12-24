import 'dotenv/config';

export const env = {
    DATABASE_URL: process.env.DATABASE_URL!,
    PORT: parseInt(process.env.PORT || '3001'),
    NODE_ENV: process.env.NODE_ENV || 'development',
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
