import { db } from '../db/index.js';
import { votes, voteRecords } from '../db/schema/votes.js';
import { polls, candidates, Candidate } from '../db/schema/polls.js';
import { eq, sql, count, desc } from 'drizzle-orm';

export interface CandidateResult extends Candidate {
    votes: number;
    percentage: number;
}

export interface PollResults {
    poll: {
        id: string;
        title: string;
        status: string;
        totalVotes: number;
        totalEligible: number;
        closedAt?: Date;
    };
    candidates: CandidateResult[];
    winner: CandidateResult | null;
    participation: number;
}

export const resultService = {
    // Get poll results with vote tallies
    async getResults(pollId: string): Promise<PollResults | null> {
        const [poll] = await db.select().from(polls).where(eq(polls.id, pollId));
        if (!poll) return null;

        // Get candidates with vote counts
        const candidateVotes = await db
            .select({
                candidate: candidates,
                voteCount: count(votes.id),
            })
            .from(candidates)
            .leftJoin(votes, eq(votes.candidateId, candidates.id))
            .where(eq(candidates.pollId, pollId))
            .groupBy(candidates.id)
            .orderBy(desc(count(votes.id)));

        // Total votes
        const [voteCount] = await db
            .select({ count: count() })
            .from(voteRecords)
            .where(eq(voteRecords.pollId, pollId));

        const totalVotes = voteCount?.count || 0;

        // Calculate percentages
        const candidatesWithPercentage: CandidateResult[] = candidateVotes.map(({ candidate, voteCount }) => ({
            ...candidate,
            votes: voteCount,
            percentage: totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0,
        }));

        // Determine winner (highest votes)
        const winner = candidatesWithPercentage.length > 0 ? candidatesWithPercentage[0] : null;

        return {
            poll: {
                id: poll.id,
                title: poll.title,
                status: poll.status,
                totalVotes,
                totalEligible: poll.totalEligible || 0,
                closedAt: poll.status === 'closed' ? poll.endDate : undefined,
            },
            candidates: candidatesWithPercentage,
            winner,
            participation: poll.totalEligible ? Math.round((totalVotes / poll.totalEligible) * 100) : 0,
        };
    },

    // Get participation statistics
    async getParticipationStats(pollId: string) {
        const [poll] = await db.select().from(polls).where(eq(polls.id, pollId));
        if (!poll) return null;

        const [voteCount] = await db
            .select({ count: count() })
            .from(voteRecords)
            .where(eq(voteRecords.pollId, pollId));

        const totalVotes = voteCount?.count || 0;
        const totalEligible = poll.totalEligible || 0;
        const notVoted = totalEligible - totalVotes;

        return {
            totalVotes,
            totalEligible,
            notVoted,
            participationRate: totalEligible > 0 ? Math.round((totalVotes / totalEligible) * 100) : 0,
        };
    },

    // Export results as CSV
    async exportResults(pollId: string): Promise<string> {
        const results = await this.getResults(pollId);
        if (!results) throw new Error('Poll not found');

        const headers = ['Rank', 'Candidate', 'Votes', 'Percentage'];
        const rows = results.candidates.map((c, i) => [
            i + 1,
            c.name,
            c.votes,
            `${c.percentage}%`,
        ]);

        const csv = [
            `Poll: ${results.poll.title}`,
            `Total Votes: ${results.poll.totalVotes}`,
            `Participation: ${results.participation}%`,
            '',
            headers.join(','),
            ...rows.map(r => r.join(',')),
        ].join('\n');

        return csv;
    },
};
