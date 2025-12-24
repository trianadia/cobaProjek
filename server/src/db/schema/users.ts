import { mysqlTable, varchar, boolean, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// User roles enum
export const userRoleEnum = mysqlEnum('role', ['student', 'admin']);

// Users table
export const users = mysqlTable('users', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    nim: varchar('nim', { length: 20 }).unique().notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    role: userRoleEnum.default('student').notNull(),
    faculty: varchar('faculty', { length: 255 }),
    major: varchar('major', { length: 255 }),
    emailVerified: boolean('email_verified').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
