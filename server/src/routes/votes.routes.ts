import { Router } from 'express';
import { voteService } from '../services/vote.service.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// All vote routes require authentication
router.use(requireAuth);

// POST /api/votes - Cast a vote
router.post('/', async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const { pollId, candidateId } = req.body;

        if (!pollId || !candidateId) {
            return res.status(400).json({ error: 'pollId and candidateId are required' });
        }

        const receipt = await voteService.castVote(userId, pollId, candidateId);
        res.status(201).json({
            success: true,
            receipt,
        });
    } catch (error: any) {
        console.error('Error casting vote:', error);
        res.status(400).json({ error: error.message || 'Failed to cast vote' });
    }
});

// GET /api/votes/check/:pollId - Check if user has voted in a poll
router.get('/check/:pollId', async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const hasVoted = await voteService.hasVoted(userId, req.params.pollId);

        let record = null;
        if (hasVoted) {
            record = await voteService.getVoteRecord(userId, req.params.pollId);
        }

        res.json({
            hasVoted,
            record,
        });
    } catch (error) {
        console.error('Error checking vote:', error);
        res.status(500).json({ error: 'Failed to check vote status' });
    }
});

export default router;
