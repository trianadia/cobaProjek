import { mysqlTable, varchar, text, int, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './users.js';

// Poll status enum
export const pollStatusEnum = mysqlEnum('status', ['draft', 'active', 'closed']);

// Polls table
export const polls = mysqlTable('polls', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    status: pollStatusEnum.default('draft').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    createdBy: varchar('created_by', { length: 36 }).references(() => users.id).notNull(),
    totalEligible: int('total_eligible').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Candidates table
export const candidates = mysqlTable('candidates', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    pollId: varchar('poll_id', { length: 36 }).references(() => polls.id, { onDelete: 'cascade' }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    tagline: varchar('tagline', { length: 500 }),
    visiMisi: text('visi_misi'),
    photoUrl: varchar('photo_url', { length: 500 }),
    displayOrder: int('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const pollsRelations = relations(polls, ({ one, many }) => ({
    creator: one(users, {
        fields: [polls.createdBy],
        references: [users.id],
    }),
    candidates: many(candidates),
}));

export const candidatesRelations = relations(candidates, ({ one }) => ({
    poll: one(polls, {
        fields: [candidates.pollId],
        references: [polls.id],
    }),
}));

// Type exports
export type Poll = typeof polls.$inferSelect;
export type NewPoll = typeof polls.$inferInsert;
export type Candidate = typeof candidates.$inferSelect;
export type NewCandidate = typeof candidates.$inferInsert;
