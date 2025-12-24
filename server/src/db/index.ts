import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '../config/env.js';
import * as schema from './schema/index.js';

const pool = mysql.createPool({
    uri: env.DATABASE_URL,
});

export const db = drizzle(pool, { schema, mode: 'default' });
