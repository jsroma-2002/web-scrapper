import express from 'express';
import { searchEntities } from '../controllers/search-controller.js';
import rateLimiter from '../middlewares/rate-limiter.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/search', authMiddleware, rateLimiter, searchEntities);

export default router;
