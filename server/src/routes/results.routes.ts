import { Router } from 'express';
import { resultService } from '../services/result.service.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// All result routes require authentication
router.use(requireAuth);

// GET /api/results/:pollId - Get poll results
router.get('/:pollId', async (req, res) => {
    try {
        const results = await resultService.getResults(req.params.pollId);
        if (!results) {
            return res.status(404).json({ error: 'Poll not found' });
        }
        res.json(results);
    } catch (error) {
        console.error('Error getting results:', error);
        res.status(500).json({ error: 'Failed to get results' });
    }
});

// GET /api/results/:pollId/participation - Get participation stats
router.get('/:pollId/participation', async (req, res) => {
    try {
        const stats = await resultService.getParticipationStats(req.params.pollId);
        if (!stats) {
            return res.status(404).json({ error: 'Poll not found' });
        }
        res.json(stats);
    } catch (error) {
        console.error('Error getting participation stats:', error);
        res.status(500).json({ error: 'Failed to get participation stats' });
    }
});

// GET /api/results/:pollId/export - Export results as CSV (admin only)
router.get('/:pollId/export', requireAdmin, async (req, res) => {
    try {
        const csv = await resultService.exportResults(req.params.pollId);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=poll-results-${req.params.pollId}.csv`);
        res.send(csv);
    } catch (error: any) {
        console.error('Error exporting results:', error);
        res.status(500).json({ error: error.message || 'Failed to export results' });
    }
});

export default router;
