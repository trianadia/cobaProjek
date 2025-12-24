import { db } from '../db/index.js';
import { polls } from '../db/schema/polls.js';
import { users } from '../db/schema/users.js';
import { voteRecords } from '../db/schema/votes.js';
import { count, eq, sql, desc } from 'drizzle-orm';

export const adminService = {
    // Get dashboard statistics
    async getStats() {
        // Total polls
        const [totalPolls] = await db.select({ count: count() }).from(polls);

        // Active polls
        const [activePolls] = await db
            .select({ count: count() })
            .from(polls)
            .where(eq(polls.status, 'active'));

        // Total students
        const [totalStudents] = await db
            .select({ count: count() })
            .from(users)
            .where(eq(users.role, 'student'));

        // Average participation (for closed polls)
        const closedPolls = await db
            .select()
            .from(polls)
            .where(eq(polls.status, 'closed'));

        let avgParticipation = 0;
        if (closedPolls.length > 0) {
            let totalParticipation = 0;
            for (const poll of closedPolls) {
                const [voteCount] = await db
                    .select({ count: count() })
                    .from(voteRecords)
                    .where(eq(voteRecords.pollId, poll.id));

                const participation = poll.totalEligible
                    ? (voteCount.count / poll.totalEligible) * 100
                    : 0;
                totalParticipation += participation;
            }
            avgParticipation = Math.round(totalParticipation / closedPolls.length);
        }

        return {
            totalPolls: totalPolls.count,
            activePolls: activePolls.count,
            totalVoters: totalStudents.count,
            avgParticipation,
        };
    },

    // Get recent polls for admin dashboard
    async getRecentPolls(limit = 5) {
        const recentPolls = await db
            .select()
            .from(polls)
            .orderBy(desc(polls.createdAt))
            .limit(limit);

        const result = [];
        for (const poll of recentPolls) {
            const [voteCount] = await db
                .select({ count: count() })
                .from(voteRecords)
                .where(eq(voteRecords.pollId, poll.id));

            result.push({
                ...poll,
                votes: voteCount.count,
            });
        }

        return result;
    },

    // List all students
    async listStudents(page = 1, limit = 20) {
        const offset = (page - 1) * limit;

        const students = await db
            .select({
                id: users.id,
                nim: users.nim,
                name: users.name,
                email: users.email,
                faculty: users.faculty,
                major: users.major,
                createdAt: users.createdAt,
            })
            .from(users)
            .where(eq(users.role, 'student'))
            .limit(limit)
            .offset(offset);

        const [total] = await db
            .select({ count: count() })
            .from(users)
            .where(eq(users.role, 'student'));

        return {
            students,
            pagination: {
                page,
                limit,
                total: total.count,
                totalPages: Math.ceil(total.count / limit),
            },
        };
    },

    // Get participation trend (last 30 days)
    async getParticipationTrend(pollId: string) {
        const trend = await db
            .select({
                date: sql<string>`DATE(${voteRecords.votedAt})`,
                count: count(),
            })
            .from(voteRecords)
            .where(eq(voteRecords.pollId, pollId))
            .groupBy(sql`DATE(${voteRecords.votedAt})`)
            .orderBy(sql`DATE(${voteRecords.votedAt})`);

        return trend;
    },

    // Update poll status
    async updatePollStatus(pollId: string, status: 'draft' | 'active' | 'closed') {
        await db
            .update(polls)
            .set({ status, updatedAt: new Date() })
            .where(eq(polls.id, pollId));

        const [updated] = await db.select().from(polls).where(eq(polls.id, pollId));
        return updated;
    },
};
