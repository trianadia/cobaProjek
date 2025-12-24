import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/index.js';
import { env } from '../config/env.js';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'mysql',
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    session: {
        expiresIn: 60 * 60 * 24, // 24 hours
        updateAge: 60 * 60, // Refresh every hour
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    trustedOrigins: [env.FRONTEND_URL],
});
