// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import redis from 'redis';
import helmet from 'helmet';
import chatRoutes from './routes/chat.js';

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Redis client for caching and rate limiting
let redisClient = null;
let redisAvailable = false;

async function initializeRedis() {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    
    await redisClient.connect();
    redisAvailable = true;
    console.log('✅ Redis connection established');
  } catch (err) {
    console.warn('⚠️  Redis connection failed, continuing without Redis:', err.message);
    redisAvailable = false;
  }
}

// Middleware
app.use(helmet()); // Security headers

// CORS configuration - allow requests from frontend
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.LOCAL_FRONTEND_URL || 'http://localhost:3000',
    process.env.LOCAL_FRONTEND_URL_ALT || 'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://vidyaraut.vercel.app',
    'https://www.vidyaraut.vercel.app',
    process.env.GITHUB_PAGES_URL || 'https://vidyaraut17297.github.io/vidyaraut'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb', strict: false }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Vidya Raut Portfolio Backend API',
    version: '2.0.0',
    status: redisAvailable ? 'Redis Connected' : 'Redis Unavailable',
    endpoints: {
      health: '/health',
      chat: '/api/chat'
    },
    features: [
      'Enhanced AI Chat with Fallbacks',
      'Rate Limiting',
      'Response Caching',
      'Input Validation',
      'Security Headers'
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    redis: redisAvailable ? 'connected' : 'unavailable',
    version: '2.0.0'
  });
});

// API routes
app.use('/api', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error handling middleware:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Start server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize Redis connection
  await initializeRedis();
  
  // Check for required environment variables
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey) {
    console.log('✅ OpenRouter API key configured');
  } else {
    console.log('⚠️  No OpenRouter API key found - using fallback responses only');
  }
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please try a different port or free up the port.`);
    process.exit(1);
  } else {
    throw err;
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  if (redisClient && redisAvailable) {
    await redisClient.quit();
  }
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  if (redisClient && redisAvailable) {
    await redisClient.quit();
  }
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err);
  process.exit(1);
});

export { app, redisClient, redisAvailable };