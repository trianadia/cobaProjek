import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';

// Better Auth request handler for Express
export const authHandler = toNodeHandler(auth);

// Auth middleware to protect routes
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach session to request
        (req as any).session = session.session;
        (req as any).user = session.user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

// Admin-only middleware
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Check if user is admin (we'll check the role from our users table)
        const user = session.user as any;
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admin access required' });
        }

        (req as any).session = session.session;
        (req as any).user = session.user;
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
