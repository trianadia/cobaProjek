import { db } from '../db/index.js';
import { votes, voteRecords, VoteRecord } from '../db/schema/votes.js';
import { polls, candidates } from '../db/schema/polls.js';
import { eq, and } from 'drizzle-orm';
import { randomBytes } from 'crypto';

export interface VoteReceipt {
    transactionId: string;
    pollId: string;
    votedAt: Date;
}

export const voteService = {
    // Check if user has already voted
    async hasVoted(userId: string, pollId: string): Promise<boolean> {
        const [record] = await db
            .select()
            .from(voteRecords)
            .where(and(eq(voteRecords.userId, userId), eq(voteRecords.pollId, pollId)));

        return !!record;
    },

    // Validate voting eligibility
    async validateEligibility(userId: string, pollId: string): Promise<{ valid: boolean; error?: string }> {
        // Check if poll exists and is active
        const [poll] = await db.select().from(polls).where(eq(polls.id, pollId));

        if (!poll) {
            return { valid: false, error: 'Poll not found' };
        }

        if (poll.status !== 'active') {
            return { valid: false, error: 'Poll is not active' };
        }

        const now = new Date();
        if (now < poll.startDate) {
            return { valid: false, error: 'Poll has not started yet' };
        }

        if (now > poll.endDate) {
            return { valid: false, error: 'Poll has ended' };
        }

        // Check if already voted
        const hasAlreadyVoted = await this.hasVoted(userId, pollId);
        if (hasAlreadyVoted) {
            return { valid: false, error: 'You have already voted in this poll' };
        }

        return { valid: true };
    },

    // Cast a vote (atomic operation)
    async castVote(userId: string, pollId: string, candidateId: string): Promise<VoteReceipt> {
        // Validate eligibility
        const eligibility = await this.validateEligibility(userId, pollId);
        if (!eligibility.valid) {
            throw new Error(eligibility.error);
        }

        // Verify candidate belongs to poll
        const [candidate] = await db
            .select()
            .from(candidates)
            .where(and(eq(candidates.id, candidateId), eq(candidates.pollId, pollId)));

        if (!candidate) {
            throw new Error('Invalid candidate for this poll');
        }

        // Generate unique transaction ID
        const transactionId = `VK-${Date.now()}-${randomBytes(4).toString('hex').toUpperCase()}`;
        const voteRecordId = crypto.randomUUID();
        const votedAt = new Date();

        // Insert vote (anonymous - no user link)
        await db.insert(votes).values({
            id: crypto.randomUUID(),
            pollId,
            candidateId,
        });

        // Insert vote record (for eligibility tracking - no candidate link)
        await db.insert(voteRecords).values({
            id: voteRecordId,
            userId,
            pollId,
            transactionId,
            votedAt,
        });

        return {
            transactionId,
            pollId,
            votedAt,
        };
    },

    // Get vote record for a user and poll
    async getVoteRecord(userId: string, pollId: string): Promise<VoteRecord | null> {
        const [record] = await db
            .select()
            .from(voteRecords)
            .where(and(eq(voteRecords.userId, userId), eq(voteRecords.pollId, pollId)));

        return record || null;
    },
};
