// Vercel API Route for Health Check
// This will be deployed as a serverless function at /api/health

export default async function handler(req, res) {
  // Allow GET requests for health checks
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed. Use GET for health checks.'
    });
  }

  try {
    // Basic health check response
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Vidya Raut Portfolio API',
      version: '2.1.0',
      environment: process.env.NODE_ENV || 'production',
      uptime: process.uptime ? `${Math.floor(process.uptime())}s` : 'N/A',
      region: process.env.VERCEL_REGION || 'unknown',
      deployment: process.env.VERCEL_URL || 'localhost',
      features: [
        'AI Chatbot with OpenRouter',
        'Portfolio Context Integration',
        'Rate Limiting',
        'Error Handling',
        'CORS Support'
      ],
      endpoints: {
        chat: '/api/chat (POST)',
        health: '/api/health (GET)'
      }
    };

    // Check if OpenRouter API key is configured
    const hasApiKey = !!process.env.OPENROUTER_API_KEY;
    healthData.ai_status = hasApiKey ? 'configured' : 'fallback_only';

    res.status(200).json(healthData);

  } catch (error) {
    console.error('Health check error:', error);

    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
}
