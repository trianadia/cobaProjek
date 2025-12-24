import { Router } from 'express';
import { adminService } from '../services/admin.service.js';
import { pollService } from '../services/poll.service.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// All admin routes require admin authentication
router.use(requireAdmin);

// GET /api/admin/stats - Get dashboard statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await adminService.getStats();
        res.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

// GET /api/admin/polls/recent - Get recent polls
router.get('/polls/recent', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 5;
        const polls = await adminService.getRecentPolls(limit);
        res.json(polls);
    } catch (error) {
        console.error('Error getting recent polls:', error);
        res.status(500).json({ error: 'Failed to get recent polls' });
    }
});

// POST /api/admin/polls - Create new poll
router.post('/polls', async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const { title, description, startDate, endDate, totalEligible } = req.body;

        if (!title || !startDate || !endDate) {
            return res.status(400).json({ error: 'title, startDate, and endDate are required' });
        }

        const poll = await pollService.createPoll({
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            createdBy: userId,
            totalEligible,
        });

        res.status(201).json(poll);
    } catch (error) {
        console.error('Error creating poll:', error);
        res.status(500).json({ error: 'Failed to create poll' });
    }
});

// PUT /api/admin/polls/:id - Update poll
router.put('/polls/:id', async (req, res) => {
    try {
        const { title, description, startDate, endDate, totalEligible } = req.body;

        const updated = await pollService.updatePoll(req.params.id, {
            title,
            description,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            totalEligible,
        });

        if (!updated) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        res.json(updated);
    } catch (error) {
        console.error('Error updating poll:', error);
        res.status(500).json({ error: 'Failed to update poll' });
    }
});

// PUT /api/admin/polls/:id/status - Change poll status
router.put('/polls/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['draft', 'active', 'closed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updated = await adminService.updatePollStatus(req.params.id, status);
        if (!updated) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        res.json(updated);
    } catch (error) {
        console.error('Error updating poll status:', error);
        res.status(500).json({ error: 'Failed to update poll status' });
    }
});

// DELETE /api/admin/polls/:id - Delete poll (draft only)
router.delete('/polls/:id', async (req, res) => {
    try {
        const poll = await pollService.getPollById(req.params.id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        if (poll.status !== 'draft') {
            return res.status(400).json({ error: 'Can only delete draft polls' });
        }

        await pollService.deletePoll(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting poll:', error);
        res.status(500).json({ error: 'Failed to delete poll' });
    }
});

// POST /api/admin/polls/:id/candidates - Add candidate
router.post('/polls/:id/candidates', async (req, res) => {
    try {
        const { name, tagline, visiMisi, photoUrl, displayOrder } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'name is required' });
        }

        const candidate = await pollService.addCandidate({
            pollId: req.params.id,
            name,
            tagline,
            visiMisi,
            photoUrl,
            displayOrder,
        });

        res.status(201).json(candidate);
    } catch (error) {
        console.error('Error adding candidate:', error);
        res.status(500).json({ error: 'Failed to add candidate' });
    }
});

// PUT /api/admin/candidates/:id - Update candidate
router.put('/candidates/:id', async (req, res) => {
    try {
        const { name, tagline, visiMisi, photoUrl, displayOrder } = req.body;

        const updated = await pollService.updateCandidate(req.params.id, {
            name,
            tagline,
            visiMisi,
            photoUrl,
            displayOrder,
        });

        if (!updated) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.json(updated);
    } catch (error) {
        console.error('Error updating candidate:', error);
        res.status(500).json({ error: 'Failed to update candidate' });
    }
});

// DELETE /api/admin/candidates/:id - Remove candidate
router.delete('/candidates/:id', async (req, res) => {
    try {
        await pollService.deleteCandidate(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting candidate:', error);
        res.status(500).json({ error: 'Failed to delete candidate' });
    }
});

// GET /api/admin/students - List all students
router.get('/students', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const result = await adminService.listStudents(page, limit);
        res.json(result);
    } catch (error) {
        console.error('Error listing students:', error);
        res.status(500).json({ error: 'Failed to list students' });
    }
});

// GET /api/admin/participation/:pollId - Get participation trend
router.get('/participation/:pollId', async (req, res) => {
    try {
        const trend = await adminService.getParticipationTrend(req.params.pollId);
        res.json(trend);
    } catch (error) {
        console.error('Error getting participation trend:', error);
        res.status(500).json({ error: 'Failed to get participation trend' });
    }
});

export default router;
