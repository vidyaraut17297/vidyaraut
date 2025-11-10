// Vercel API Route for Chat
// This will be deployed as a serverless function at /api/chat

const portfolioContext = {
  name: "Vidya Raut",
  location: "Pune, Maharashtra, India",
  currentStatus: "Pursuing M.Tech in Energy Technology (2025-2027)",

  experience: [
    {
      role: "Market Research Analyst",
      company: "Customized Energy Solutions",
      duration: "Jul 2023 - Jun 2024 (1 year)",
      description: "Analyzed energy sector data, market trends, consumer behavior. Created strategic insights and decision-ready dashboards."
    },
    {
      role: "Laboratory Intern",
      company: "Customized Energy Solutions",
      duration: "Jan 2023 - Jun 2023 (6 months)",
      description: "Assisted with battery R&D, material characterization, battery assembly, data analysis."
    },
    {
      role: "Data Analyst",
      company: "Customized Energy Solutions",
      duration: "Nov 2017 - Apr 2018 (6 months)",
      description: "Developed interactive dashboards using Excel. Presented findings to management."
    },
    {
      role: "Teaching Professional",
      company: "S.S.V.M. & Jr. College",
      duration: "May 2021 - Oct 2021 (6 months)",
      description: "Assisted with lesson preparation and delivery for Science and Mathematics."
    }
  ],

  skills: {
    technical: ["Excel (Advanced)", "PowerPoint", "Data Analysis", "Battery Management Systems", "Energy Audits", "Solar System Design"],
    research: ["Market Research", "Project Management", "Report Writing", "Competitive Intelligence"],
    professional: ["Critical Thinking", "Communication", "Teamwork", "Problem Solving", "Analytical Skills", "Presentation Skills"]
  },

  education: [
    "M.Tech in Energy Technology - Savitribai Phule Pune University (2025-2027)",
    "B.Ed Science & Mathematics - Shri Shivaji Maratha Society (2020-2022)",
    "M.Sc Physics - H.V.Desai College (2018-2020)",
    "B.Sc Physics - PES Modern College (2014-2017)"
  ],

  projects: [
    "Synthesis & Characterization of Fe3O4 Thin Films (2019-2020)",
    "Formation of Core Losses of Different Magnetic Materials (2016-2017)"
  ],

  certifications: [
    "International Conference: MHMEE-2020",
    "NCC Cadet (CATC participation)",
    "MS-CIT"
  ],

  expertise: ["Energy storage markets", "Battery R&D", "Solar PV", "Market sizing", "Competitive intelligence", "Policy/tariff tracking"],

  availability: "Open to Market/Energy Analyst roles. Available for full-time positions.",

  contact: {
    email: "vidyaraut17297@gmail.com",
    phone: "+91 8446495690",
    linkedin: "linkedin.com/in/vidyaraut17/",
    github: "github.com/vidyaraut17297"
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // For Vercel, read the raw body if not already parsed
    let body;
    if (req.body) {
      body = req.body;
    } else {
      // Read raw body
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const rawBody = Buffer.concat(chunks).toString();
      try {
        body = JSON.parse(rawBody);
      } catch (parseError) {
        console.log('JSON parse error:', parseError);
        return res.status(400).json({ error: 'Invalid JSON body' });
      }
    }

    console.log('Final body object:', JSON.stringify(body));
    console.log('Body keys:', Object.keys(body || {}));

    const { message, context } = body || {};

    console.log('Extracted message:', message);
    console.log('Extracted context:', context);

    // Validate message
    const trimmedMessage = message?.toString().trim();
    console.log('Trimmed message:', trimmedMessage);

    if (!trimmedMessage) {
      return res.status(400).json({
        error: 'Message is required',
        debug: {
          bodyType: typeof body,
          bodyKeys: Object.keys(body || {}),
          receivedMessage: message,
          bodyString: JSON.stringify(body)
        }
      });
    }

    // Prepare the context for the AI
    const contextStr = JSON.stringify(portfolioContext);

    // Use working models based on testing
    const modelsToTry = [
      "minimax/minimax-m2:free",                  // MiniMax (primary - tested working)
      "openrouter/polaris-alpha",                 // Polaris Alpha (user's preferred fallback)
    ];

    let response;
    let lastError;
    
    // Try each model in sequence until one works
    for (const model of modelsToTry) {
      try {
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': process.env.VERCEL_URL || 'https://vidyaraut.vercel.app',
            'X-Title': 'Vidya Raut Portfolio AI Assistant',
            'User-Agent': 'Vidya-Raut-Portfolio/1.0'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "system",
                content: `You are Vidya Raut's AI assistant. You can help with questions about Vidya's portfolio and expertise, as well as general questions on various topics.

Guidelines:
- Be friendly, professional, and helpful
- For portfolio-related questions, reference the portfolio context provided
- Keep responses under 150 words for portfolio questions, under 100 words for general questions
- For general questions not related to the portfolio, provide helpful responses using your knowledge
- Emphasize Vidya's 6 years in energy sector when relevant
- Highlight Excel/data analysis expertise when appropriate
- If asked about availability, mention she's seeking Energy/Market Analyst roles
- Direct complex professional inquiries to the contact form
- Don't make up information not in the context for portfolio-specific details
- If you don't know something about Vidya specifically, say "I'd recommend checking the contact section to ask Vidya directly"
- For general questions, use your knowledge to provide helpful responses
- Maintain a conversational but professional tone
- If a question is inappropriate or outside your scope, politely decline to answer

Portfolio Context: ${contextStr}`
              },
              {
                role: "user",
                content: message
              }
            ],
            temperature: 0.8, // Slightly higher for more creativity
            max_tokens: 800, // Increased for more detailed responses
            top_p: 0.9,
            presence_penalty: 0.6,
            frequency_penalty: 0.5,
            stream: false
          })
        });

        // If this request was successful, break out of the loop
        if (response.ok) {
          break;
        } else {
          // Store the error but continue to try the next model
          const errorText = await response.text();
          console.warn(`Model ${model} failed with status ${response.status}:`, errorText);
          lastError = { status: response.status, errorText };
        }
      } catch (fetchError) {
        console.warn(`Failed to connect to model ${model}:`, fetchError.message);
        lastError = { status: 0, errorText: fetchError.message };
        continue; // Try next model
      }
    }

    // If all models failed
    if (!response || !response.ok) {
      console.error('All models failed, last error:', lastError);
      if (lastError.status === 429) {
        return res.status(429).json({
          error: 'AI model temporarily busy',
          message: 'All AI models are currently experiencing high demand. Please try again in a few minutes.',
          success: false
        });
      } else if (lastError.status === 401) {
        return res.status(401).json({
          error: 'API configuration error',
          message: 'Please check your API key configuration. Authorization failed.',
          success: false
        });
      } else {
        return res.status(500).json({
          error: 'AI service temporarily unavailable',
          message: `All AI models are temporarily unavailable. Last error: ${lastError.errorText}`,
          success: false
        });
      }
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I'm having trouble responding right now.";

    // Extract metadata from OpenRouter response
    const metadata = {
      generation_id: data.id,
      provider_name: data.provider_name || 'Unknown',
      model: data.model || modelsToTry[0], // Use the model that worked
      tokens_prompt: data.usage?.prompt_tokens || 0,
      tokens_completion: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0,
      generation_time: data.usage?.total_time || 0,
      finish_reason: data.choices[0]?.finish_reason || 'unknown'
    };

    res.status(200).json({
      response: aiResponse,
      metadata: metadata,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in chat API:', error);

    res.status(500).json({
      error: 'Unable to process your request',
      message: 'There was an issue with the AI service. Please try again.',
      success: false
    });
  }
}
