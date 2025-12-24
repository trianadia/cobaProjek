import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import routes, { authHandler } from './routes/index.js';

const app = express();

app.get('/', (req, res) => {
  res.send('VoteKampus API is running 🚀');
});


// Middleware
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

// Better Auth handler - must be before API routes
app.all('/api/auth/*', authHandler);

// API routes
app.use('/api', routes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 VoteKampus API running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${env.NODE_ENV}`);
});

export default app;
