// backend/middleware/ratelimit.js
import rateLimit from 'express-rate-limit';

// Simple in-memory rate limiting for development
// In production, use Redis-backed rate limiting
export const ratelimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default ratelimit;