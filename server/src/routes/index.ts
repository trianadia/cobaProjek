import { Router } from 'express';
import pollsRouter from './polls.routes.js';
import votesRouter from './votes.routes.js';
import resultsRouter from './results.routes.js';
import adminRouter from './admin.routes.js';
import { authHandler } from '../middleware/auth.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount route modules
router.use('/polls', pollsRouter);
router.use('/votes', votesRouter);
router.use('/results', resultsRouter);
router.use('/admin', adminRouter);

export { authHandler };
export default router;
