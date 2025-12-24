import { mysqlTable, varchar, timestamp, unique } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './users.js';
import { polls, candidates } from './polls.js';

// Anonymous vote tallies (no user link - maintains ballot secrecy)
export const votes = mysqlTable('votes', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    pollId: varchar('poll_id', { length: 36 }).references(() => polls.id).notNull(),
    candidateId: varchar('candidate_id', { length: 36 }).references(() => candidates.id).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Vote records - tracks WHO voted, but NOT for whom (for eligibility checking)
export const voteRecords = mysqlTable('vote_records', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: varchar('user_id', { length: 36 }).references(() => users.id).notNull(),
    pollId: varchar('poll_id', { length: 36 }).references(() => polls.id).notNull(),
    transactionId: varchar('transaction_id', { length: 50 }).unique().notNull(),
    votedAt: timestamp('voted_at').defaultNow().notNull(),
}, (table) => ({
    uniqueUserPoll: unique('unique_user_poll').on(table.userId, table.pollId),
}));

// Relations
export const votesRelations = relations(votes, ({ one }) => ({
    poll: one(polls, {
        fields: [votes.pollId],
        references: [polls.id],
    }),
    candidate: one(candidates, {
        fields: [votes.candidateId],
        references: [candidates.id],
    }),
}));

export const voteRecordsRelations = relations(voteRecords, ({ one }) => ({
    user: one(users, {
        fields: [voteRecords.userId],
        references: [users.id],
    }),
    poll: one(polls, {
        fields: [voteRecords.pollId],
        references: [polls.id],
    }),
}));

// Type exports
export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;
export type VoteRecord = typeof voteRecords.$inferSelect;
export type NewVoteRecord = typeof voteRecords.$inferInsert;
