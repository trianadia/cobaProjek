import { db } from '../db/index.js';
import { polls, candidates, Poll, Candidate } from '../db/schema/index.js';
import { voteRecords } from '../db/schema/votes.js';
import { eq, and, count, sql, desc } from 'drizzle-orm';

export interface PollWithCandidates extends Poll {
    candidates: Candidate[];
    totalVotes: number;
    hasVoted?: boolean;
}

export const pollService = {
    // Get all polls with optional status filter
    async listPolls(status?: 'draft' | 'active' | 'closed'): Promise<Poll[]> {
        if (status) {
            return db.select().from(polls).where(eq(polls.status, status));
        }
        return db.select().from(polls);
    },

    // Get poll by ID with candidates
    async getPollById(pollId: string): Promise<PollWithCandidates | null> {
        const [poll] = await db.select().from(polls).where(eq(polls.id, pollId));
        if (!poll) return null;

        const pollCandidates = await db
            .select()
            .from(candidates)
            .where(eq(candidates.pollId, pollId))
            .orderBy(candidates.displayOrder);

        // Count total votes
        const [voteCount] = await db
            .select({ count: count() })
            .from(voteRecords)
            .where(eq(voteRecords.pollId, pollId));

        return {
            ...poll,
            candidates: pollCandidates,
            totalVotes: voteCount?.count || 0,
        };
    },

    // Get active polls with user's vote status
    async getActivePolls(userId: string): Promise<PollWithCandidates[]> {
        const activePolls = await db
            .select()
            .from(polls)
            .where(eq(polls.status, 'active'));

        const result: PollWithCandidates[] = [];

        for (const poll of activePolls) {
            const pollCandidates = await db
                .select()
                .from(candidates)
                .where(eq(candidates.pollId, poll.id))
                .orderBy(candidates.displayOrder);

            const [voteCount] = await db
                .select({ count: count() })
                .from(voteRecords)
                .where(eq(voteRecords.pollId, poll.id));

            // Check if user has voted
            const [userVote] = await db
                .select()
                .from(voteRecords)
                .where(and(eq(voteRecords.userId, userId), eq(voteRecords.pollId, poll.id)));

            result.push({
                ...poll,
                candidates: pollCandidates,
                totalVotes: voteCount?.count || 0,
                hasVoted: !!userVote,
            });
        }

        return result;
    },

    // Get user's voting history
    async getVotingHistory(userId: string) {
        return db
            .select({
                transactionId: voteRecords.transactionId,
                votedAt: voteRecords.votedAt,
                poll: {
                    id: polls.id,
                    title: polls.title,
                    status: polls.status,
                },
            })
            .from(voteRecords)
            .innerJoin(polls, eq(voteRecords.pollId, polls.id))
            .where(eq(voteRecords.userId, userId))
            .orderBy(desc(voteRecords.votedAt));
    },

    // Create a new poll (admin)
    async createPoll(data: {
        title: string;
        description?: string;
        startDate: Date;
        endDate: Date;
        createdBy: string;
        totalEligible?: number;
    }): Promise<Poll> {
        const id = crypto.randomUUID();
        await db.insert(polls).values({ ...data, id });
        const [newPoll] = await db.select().from(polls).where(eq(polls.id, id));
        return newPoll;
    },

    // Update poll (admin)
    async updatePoll(pollId: string, data: Partial<Poll>): Promise<Poll | null> {
        await db
            .update(polls)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(polls.id, pollId));
        const [updated] = await db.select().from(polls).where(eq(polls.id, pollId));
        return updated || null;
    },

    // Delete poll (admin, draft only)
    async deletePoll(pollId: string): Promise<boolean> {
        await db.delete(polls).where(eq(polls.id, pollId));
        return true;
    },

    // Add candidate to poll
    async addCandidate(data: {
        pollId: string;
        name: string;
        tagline?: string;
        visiMisi?: string;
        photoUrl?: string;
        displayOrder?: number;
    }): Promise<Candidate> {
        const id = crypto.randomUUID();
        await db.insert(candidates).values({ ...data, id });
        const [newCandidate] = await db.select().from(candidates).where(eq(candidates.id, id));
        return newCandidate;
    },

    // Update candidate
    async updateCandidate(candidateId: string, data: Partial<Candidate>): Promise<Candidate | null> {
        await db
            .update(candidates)
            .set(data)
            .where(eq(candidates.id, candidateId));
        const [updated] = await db.select().from(candidates).where(eq(candidates.id, candidateId));
        return updated || null;
    },

    // Delete candidate
    async deleteCandidate(candidateId: string): Promise<boolean> {
        await db.delete(candidates).where(eq(candidates.id, candidateId));
        return true;
    },
};
