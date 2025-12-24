import { Router } from 'express';
import { pollService } from '../services/poll.service.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// All poll routes require authentication
router.use(requireAuth);

// GET /api/polls - List all polls
router.get('/', async (req, res) => {
    try {
        const status = req.query.status as 'draft' | 'active' | 'closed' | undefined;
        const polls = await pollService.listPolls(status);
        res.json(polls);
    } catch (error) {
        console.error('Error listing polls:', error);
        res.status(500).json({ error: 'Failed to list polls' });
    }
});

// GET /api/polls/active - Get active polls with user's vote status
router.get('/active', async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const polls = await pollService.getActivePolls(userId);
        res.json(polls);
    } catch (error) {
        console.error('Error getting active polls:', error);
        res.status(500).json({ error: 'Failed to get active polls' });
    }
});

// GET /api/polls/history - Get user's voting history
router.get('/history', async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const history = await pollService.getVotingHistory(userId);
        res.json(history);
    } catch (error) {
        console.error('Error getting voting history:', error);
        res.status(500).json({ error: 'Failed to get voting history' });
    }
});

// GET /api/polls/:id - Get poll by ID with candidates
router.get('/:id', async (req, res) => {
    try {
        const poll = await pollService.getPollById(req.params.id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }
        res.json(poll);
    } catch (error) {
        console.error('Error getting poll:', error);
        res.status(500).json({ error: 'Failed to get poll' });
    }
});

// GET /api/polls/:id/candidates - Get candidates for a poll
router.get('/:id/candidates', async (req, res) => {
    try {
        const poll = await pollService.getPollById(req.params.id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }
        res.json(poll.candidates);
    } catch (error) {
        console.error('Error getting candidates:', error);
        res.status(500).json({ error: 'Failed to get candidates' });
    }
});

export default router;
