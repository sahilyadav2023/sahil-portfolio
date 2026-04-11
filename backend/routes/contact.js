import express from 'express';
import { submitContact } from '../controllers/contactController.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/contact
// Rate limiter runs first → then controller handles the DB write
router.post('/', contactRateLimiter, submitContact);

export default router;
