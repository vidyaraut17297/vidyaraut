// backend/routes/chat.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Rate limiting for pattern-based responses (lightweight)
const requestLog = new Map();
const REQUEST_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute

// Simple in-memory cache for responses
const responseCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Input sanitization function
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 500); // Limit length
}

// Rate limit check
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = requestLog.get(ip) || [];

  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < REQUEST_WINDOW);

  if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, resetTime: REQUEST_WINDOW - (now - validRequests[0]) };
  }

  validRequests.push(now);
  requestLog.set(ip, validRequests);
  return { allowed: true };
}

// Cache management
function getCachedResponse(key) {
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.response;
  }
  if (cached) responseCache.delete(key);
  return null;
}

function setCachedResponse(key, response) {
  responseCache.set(key, {
    response,
    timestamp: Date.now()
  });
}

// ✅ CORRECTED Portfolio Context - Based on LinkedIn Profile
const portfolioKnowledge = {
  name: "Vidya Raut",
  title: "M.Tech in Energy Technology | Market Analyst | Energy Storage & Power Markets | Physics (MSc) | B.Ed (Science & Maths)",
  location: "Pimpri-Chinchwad, Pune-411027, Maharashtra, India",
  area: "Pune/Pimpri-Chinchwad Area",
  
  contact: {
    phone: "8446495690",
    phoneType: "Mobile",
    email: "vidyaraut17297@gmail.com",
    linkedin: "www.linkedin.com/in/vidyaraut17",
    portfolio: "vidyaraut17297.github.io/vidyaraut/",
    github: "github.com/vidyaraut17297"
  },
  
  topSkills: [
    "Laboratory Safety",
    "Battery Management Systems", 
    "Quantitative Research"
  ],
  
  summary: {
    tagline: "I'm an energy & power market analyst with experience turning sector data into concise insights and decision-ready dashboards.",
    background: "My background spans Physics (BSc/MSc), B.Ed (Science/Maths), and the current M.Tech in Energy Technology (2025–2027), plus hands-on stints in energy storage (ESS) market research, lab support for battery R&D, and data analysis using Excel/Power BI.",
    value: "I provide detailed reports that save leaders time and increase clarity for stakeholders who are not technical, such as quarterly or yearly briefs, competitor and policy trackers, and target views.",
    focus: ["Energy storage & power markets", "Hydrogen fuel", "Solar PV management", "Competitive intelligence", "Policy/tariff tracking", "Market sizing", "Dashboards"],
    tools: ["Excel (Advanced)", "PowerPoint Presentation"],
    seeking: "Market/Energy Analyst roles where I can improve reporting speed/quality and support data-driven strategy"
  },
  
  experience: [
    {
      company: "Customized Energy Solutions",
      totalDuration: "1 year 6 months (across multiple roles)",
      roles: [
        {
          title: "Market Research Analyst",
          duration: "July 2023 - June 2024",
          length: "1 year",
          location: "Pune, Maharashtra, India",
          description: "Analyzed energy sector data to provide strategic insights into market trends, consumer behavior, and competitor activities, helping the company make informed decisions on market share growth. Gathers data through various methods, interprets it using analytical tools, and then presents findings in reports and presentations to guide the company's strategic planning and overall business objectives."
        },
        {
          title: "Laboratory Intern",
          duration: "January 2023 - June 2023",
          length: "6 months",
          location: "Pune, Maharashtra, India",
          description: "Here, I assist engineers with battery research and development, characterizing materials, assembling batteries, analyzing data, and maintaining lab equipment and records. I strictly follow all laboratory safety protocols, including proper handling, storage, and disposal of hazardous chemicals and materials, consistent use of Personal Protective Equipment (PPE), and keeping a clean and organized workspace to reduce risks."
        },
        {
          title: "Data Analyst",
          duration: "November 2017 - April 2018",
          length: "6 months",
          location: "Wakad, Pune",
          responsibilities: [
            "Develop and maintain interactive dashboards and reports using Microsoft Excel",
            "Present findings and recommendations to managers to support data-driven decision-making",
            "Collaborate with cross-functional teams to understand business challenges and develop data-driven solutions"
          ]
        }
      ]
    },
    {
      company: "S.S.V.M. & Jr. College",
      roles: [
        {
          title: "Teaching Professional",
          duration: "May 2021 - October 2021",
          length: "6 months",
          location: "Aundh, Pune",
          description: "This involves assisting lead teachers with lesson preparation and delivery, supporting students through one-on-one or small group interactions, managing classroom routines and behavior, maintaining records, and participating in professional development, all while gaining hands-on experience under supervision. Key qualifications include enrollment in an education degree program, strong communication skills, and a passion for working with students."
        }
      ]
    }
  ],
  
  education: [
    {
      institution: "Savitribai Phule Pune University",
      degree: "Master of Technology - MTech",
      field: "Energy Technology",
      duration: "July 2025 - May 2027",
      status: "In Progress"
    },
    {
      institution: "Shri Shivaji Maratha Society's Adhyapak Mahavidyalaya, Aranyeshwar, Pune 9",
      degree: "Bachelor of Education - BEd",
      field: "Science and mathematics",
      duration: "September 2020 - April 2022",
      status: "Completed"
    },
    {
      institution: "The Poona Gujrati Kelwani Mandal's H.V.Desai Senior College of Arts, Science & Commerce, Budhawar Peth, Pune 2",
      degree: "Master of Science - MS",
      field: "Physics",
      duration: "June 2018 - April 2020",
      status: "Completed"
    },
    {
      institution: "Progressive Education Society's Modern College of Arts, Science and Commerce, Shivajinagar, Pune 411005",
      degree: "Bachelor's degree",
      field: "Physics",
      duration: "August 2014 - October 2017",
      status: "Completed"
    }
  ],
  
  projects: [
    {
      title: "Synthesis & Characterization of Fe3O4 Thin Films",
      duration: "June 2019 - April 2020",
      description: "Used Chemical Bath Deposition Method to synthesize and characterize Fe3O4 thin films",
      tags: ["Physics", "Materials Science"]
    },
    {
      title: "Formation of Core Losses of Different Magnetic Materials",
      duration: "June 2016 - April 2017",
      description: "Studied core losses using transformer and hysteresis loop for various magnetic materials",
      tags: ["Physics", "Electrical"]
    }
  ],
  
  certifications: [
    "International Conference: MHMEE-2020 (January 2020)",
    "NCC Cadet - CATC participation (August 2014 & July 2015)",
    "MS-CIT (August 2012)"
  ]
};

// ✅ CORRECTED Pattern-based responses with ACCURATE LinkedIn information
const smartResponses = {
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening', 'namaste'],
    response: "Hi! 👋 I'm Vidya's AI assistant. I can tell you about:\n\n💼 Her 2+ years in energy sector\n📊 Top skills: Laboratory Safety, Battery Management, Excel\n🔋 Hands-on battery R&D experience\n🎓 Education: M.Tech in progress, B.Ed, MSc, BSc\n📍 Based in Pimpri-Chinchwad, Pune\n\nWhat would you like to know?"
  },
  
  skills: {
    patterns: ['her skill', 'vidya skill', 'what skill', 'her expertise', 'vidya expertise', 'technical skill', 'excel skill', 'laboratory safety skill', 'battery management skill', 'she proficient', 'vidya proficient', 'what can vidya do', 'vidya capabilities', 'her capabilities'],
    response: "<strong>Vidya's Top Skills (from LinkedIn):</strong> 📊\n\n🔹 <strong>Laboratory Safety</strong> - Strict protocol adherence\n🔹 <strong>Battery Management Systems</strong> - Hands-on experience\n🔹 <strong>Quantitative Research</strong> - Data-driven analysis\n\n<strong>Technical Skills:</strong>\n• Microsoft Excel (Advanced) - 6+ years\n• PowerPoint Presentation\n• Data Analysis\n• Quantitative Analytics\n• Energy Audits\n• Solar System Design\n\n<strong>Research & Market:</strong>\n• Market Research\n• Project Management\n• Report Writing\n• Competitive Intelligence\n\nShe excels at turning complex energy data into clear, actionable insights!"
  },
  
  experience: {
    patterns: ['experience', 'work', 'job', 'career', 'worked', 'roles', 'employment', 'background', 'history'],
    response: "<strong>Vidya's Work Experience:</strong> 💼\n\n<strong>Customized Energy Solutions</strong> (1 year 6 months total):\n\n✅ <strong>Market Research Analyst</strong><br>July 2023 - June 2024 (1 year) | Pune<br>→ Analyzed energy sector data for strategic insights<br>→ Tracked market trends, consumer behavior, competitors<br>→ Presented findings to guide strategic planning\n\n✅ <strong>Laboratory Intern</strong><br>January 2023 - June 2023 (6 months) | Pune<br>→ Battery R&D: characterizing materials, assembling batteries<br>→ Maintained lab equipment and records<br>→ Followed all safety protocols with PPE\n\n✅ <strong>Data Analyst</strong><br>November 2017 - April 2018 (6 months) | Wakad, Pune<br>→ Interactive dashboards using Excel<br>→ Data-driven insights for management<br>→ Cross-functional collaboration\n\n<strong>S.S.V.M. & Jr. College:</strong>\n\n✅ <strong>Teaching Professional</strong><br>May 2021 - October 2021 (6 months) | Aundh, Pune<br>→ Science & Mathematics education<br>→ Lesson prep, student support, classroom management"
  },
  
  battery: {
    patterns: ['battery', 'lab', 'laboratory', 'testing', 'r&d', 'research', 'material', 'characterization', 'ppe'],
    response: "<strong>Vidya's Battery R&D Experience:</strong> 🔋\n\n<strong>Laboratory Intern at Customized Energy Solutions</strong><br>January 2023 - June 2023 (6 months)\n\n<strong>Responsibilities:</strong>\n✓ Assisted engineers with battery research & development\n✓ Characterizing materials for batteries\n✓ Assembling batteries\n✓ Analyzing battery performance data\n✓ Maintaining lab equipment and records\n\n<strong>Safety Focus:</strong>\n✓ Strictly followed all laboratory safety protocols\n✓ Proper handling, storage, and disposal of hazardous chemicals\n✓ Consistent use of Personal Protective Equipment (PPE)\n✓ Maintained clean and organized workspace\n\n<strong>Top Skill:</strong> Laboratory Safety + Battery Management Systems\n\nShe combines hands-on lab experience with market analysis expertise!"
  },
  
  education: {
    patterns: ['education', 'degree', 'study', 'university', 'college', 'qualification', 'academic', 'mtech', 'bed', 'msc', 'bsc'],
    response: "<strong>Vidya's Education:</strong> 🎓\n\n📚 <strong>Master of Technology - MTech</strong><br>Energy Technology<br>Savitribai Phule Pune University<br><em>July 2025 - May 2027 (In Progress)</em>\n\n📚 <strong>Bachelor of Education - BEd</strong><br>Science and Mathematics<br>Shri Shivaji Maratha Society's Adhyapak Mahavidyalaya, Aranyeshwar, Pune 9<br><em>September 2020 - April 2022</em>\n\n📚 <strong>Master of Science - MS</strong><br>Physics<br>The Poona Gujrati Kelwani Mandal's H.V.Desai Senior College, Budhawar Peth, Pune 2<br><em>June 2018 - April 2020</em>\n\n📚 <strong>Bachelor's degree</strong><br>Physics<br>Progressive Education Society's Modern College, Shivajinagar, Pune 411005<br><em>August 2014 - October 2017</em>\n\n<strong>Unique combination:</strong> Physics background + Education degree + Energy Technology specialization!"
  },
  
  location: {
    patterns: ['location', 'where', 'based', 'live', 'pune', 'pimpri', 'chinchwad', 'city', 'area'],
    response: "<strong>Location:</strong> 📍\n\nVidya is based in <strong>Pimpri-Chinchwad, Pune-411027</strong>, Maharashtra, India 🇮🇳\n\nArea: Pune/Pimpri-Chinchwad Area\n\nAvailable for roles in the Pune/Pimpri-Chinchwad region."
  },
  
  contact: {
    patterns: ['contact vidya', 'vidya contact', 'email vidya', 'vidya email', 'phone vidya', 'vidya phone', 'reach vidya', 'get in touch with vidya', 'linkedin vidya', 'vidya linkedin', 'connect with vidya', 'portfolio vidya', 'vidya portfolio', 'github vidya', 'vidya github', 'how to contact vidya', 'contact information', 'contact details'],
    response: "<strong>Contact Vidya Raut:</strong> 📧\n\n📧 <strong>Email:</strong> vidyaraut17297@gmail.com\n📱 <strong>Mobile:</strong> 8446495690\n💼 <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/vidyaraut17' target='_blank'>www.linkedin.com/in/vidyaraut17</a>\n🌐 <strong>Portfolio:</strong> <a href='https://vidyaraut17297.github.io/vidyaraut/' target='_blank'>vidyaraut17297.github.io/vidyaraut/</a>\n💻 <strong>GitHub:</strong> <a href='https://github.com/vidyaraut17297' target='_blank'>github.com/vidyaraut17297</a>\n\nFeel free to reach out directly!"
  },
  
  availability: {
    patterns: ['available', 'hire', 'hiring', 'looking for', 'open to', 'job', 'opportunity', 'position', 'seeking', 'employment'],
    response: "<strong>Yes! Vidya is actively seeking new opportunities:</strong> 🚀\n\n<strong>Target Roles:</strong> Market/Energy Analyst positions where she can enhance reporting efficiency and support data-driven strategic initiatives.\n\n<strong>Professional Value Proposition:</strong>\n✅ <strong>2+ Years Energy Sector Experience</strong>\n✅ <strong>Advanced Excel & PowerPoint Proficiency</strong>\n✅ <strong>Energy Storage & Power Markets Expertise</strong>\n✅ <strong>Hands-on Battery R&D Experience</strong>\n✅ <strong>Quantitative Research & Data Analysis</strong>\n✅ <strong>Strong Physics Foundation (BSc, MSc)</strong>\n✅ <strong>Teaching Experience (B.Ed)</strong>\n✅ <strong>M.Tech in Energy Technology (In Progress)</strong>\n\n<strong>Key Focus Areas:</strong>\n• Energy storage system analysis\n• Hydrogen fuel market research\n• Solar PV performance management\n• Competitive intelligence\n• Policy and tariff analysis\n• Market sizing and forecasting\n• Dashboard development and reporting\n\n<strong>Ready to contribute her expertise to drive data-driven strategies and improve reporting quality.</strong>\n\n📧 <strong>Contact:</strong> vidyaraut17297@gmail.com<br>📱 <strong>Phone:</strong> 8446495690"
  },
  
  projects: {
    patterns: ['project', 'portfolio', 'work sample', 'example', 'research', 'thesis'],
    response: "<strong>Vidya's Projects:</strong> 🔬\n\n<strong>1. Synthesis & Characterization of Fe3O4 Thin Films</strong><br>June 2019 - April 2020<br>→ Used Chemical Bath Deposition Method<br>→ Synthesized and characterized Fe3O4 thin films<br>→ Tags: Physics, Materials Science\n\n<strong>2. Formation of Core Losses of Different Magnetic Materials</strong><br>June 2016 - April 2017<br>→ Studied core losses using transformer and hysteresis loop<br>→ Analyzed various magnetic materials<br>→ Tags: Physics, Electrical\n\n<strong>Professional Work:</strong>\n• Energy market analysis dashboards\n• Battery testing & characterization\n• Market research reports\n• Data visualization projects\n\n🌐 View full portfolio: <a href='https://vidyaraut17297.github.io/vidyaraut/' target='_blank'>vidyaraut17297.github.io/vidyaraut/</a>"
  },
  
  certifications: {
    patterns: ['certification', 'certificate', 'course', 'training', 'ncc', 'mscit', 'conference'],
    response: "<strong>Vidya's Certifications:</strong> 🏆\n\n✓ <strong>International Conference: MHMEE-2020</strong><br>Multifunctional & Hybrid Materials for Energy & Environment<br>Y. C. College, Satara<br><em>January 2020</em>\n\n✓ <strong>NCC Cadet</strong><br>Participated in CATC (Combined Annual Training Camp)<br><em>August 2014 & July 2015</em>\n\n✓ <strong>MS-CIT</strong><br>(Maharashtra State Certificate in Information Technology)<br><em>August 2012</em>"
  },
  
  summary: {
    patterns: ['about', 'who is', 'tell me about', 'summary', 'overview', 'profile', 'bio'],
    response: "<strong>About Vidya Raut:</strong>\n\n<em>\"I'm an energy & power market analyst with experience turning sector data into concise insights and decision-ready dashboards.\"</em>\n\n<strong>Professional Background:</strong>\nVidya combines academic excellence in Physics (BSc/MSc) with practical teaching experience (B.Ed) and advanced studies in Energy Technology (M.Tech in progress, 2025–2027). Her career includes hands-on experience in energy storage market research, battery R&D laboratory support, and advanced data analysis using Excel and Power BI.\n\n<strong>Core Value Proposition:</strong>\nVidya specializes in creating detailed, actionable reports that save leadership time and improve clarity for non-technical stakeholders. She delivers quarterly/yearly market briefs, competitor analysis, policy tracking reports, and strategic market intelligence.\n\n<strong>Specialized Expertise:</strong>\n• Energy storage & power market analysis\n• Hydrogen fuel market research\n• Solar PV system management\n• Competitive intelligence\n• Policy and tariff tracking\n• Market sizing and forecasting\n• Interactive dashboard development\n\n<strong>Technical Proficiency:</strong> Microsoft Excel (Advanced), PowerPoint Presentation, Data Visualization, Quantitative Analysis\n\n📍 <strong>Location:</strong> Pimpri-Chinchwad, Pune-411027, Maharashtra, India"
  },
  
  market: {
    patterns: ['market', 'analysis', 'analyst', 'research', 'competitive', 'intelligence', 'sector', 'energy storage', 'power market'],
    response: "<strong>Vidya's Market Analysis Expertise:</strong> 📊\n\n<strong>Market Research Analyst Experience:</strong><br>Customized Energy Solutions | July 2023 - June 2024 (1 year)\n\n<strong>Key Responsibilities:</strong>\n• Analyzed energy sector data to provide strategic insights into market trends\n• Monitored consumer behavior and competitor activities\n• Interpreted complex data using analytical tools\n• Presented findings in comprehensive reports and presentations\n• Supported strategic planning and business decision-making\n\n<strong>Specialized Areas:</strong>\n✓ Energy storage & power markets\n✓ Hydrogen fuel market analysis\n✓ Solar PV system management\n✓ Competitive intelligence gathering\n✓ Policy and tariff tracking\n✓ Market sizing and forecasting\n✓ Interactive dashboard development\n\n<strong>Core Skills:</strong>\n• Market Research & Analysis\n• Quantitative Research Methods\n• Technical Report Writing\n• Competitive Intelligence\n• Data Visualization & Analytics\n\n<strong>Impact:</strong> Vidya excels at transforming complex energy market data into clear, actionable business insights that drive strategic decision-making."
  },
  
  excel: {
    patterns: ['excel', 'spreadsheet', 'dashboard', 'pivot', 'formula', 'data visualization', 'powerpoint'],
    response: "<strong>Vidya's Advanced Excel Skills:</strong> 📊\n\n<strong>Experience:</strong> 2+ years working with Excel\n\n<strong>What she does:</strong>\n• Develops and maintains interactive dashboards\n• Creates reports using Microsoft Excel\n• Presents findings to support data-driven decisions\n• Collaborates with teams to solve business challenges\n• Data visualization and analysis\n\n<strong>Tools Expertise:</strong>\n✓ <strong>Microsoft Excel (Advanced)</strong>\n✓ <strong>PowerPoint Presentation</strong>\n✓ Data Analysis\n✓ Dashboard Development\n✓ Report Generation\n\n<strong>Real Experience:</strong>\n• Data Analyst role (Nov 2017 - Apr 2018): Built interactive dashboards\n• Market Research Analyst (Jul 2023 - Jun 2024): Interpreted data using analytical tools\n\nExcel is her core strength for turning data into insights!"
  },
  
  teaching: {
    patterns: ['teaching', 'teacher', 'education', 'student', 'classroom', 'bed', 'science', 'mathematics', 'mentor'],
    response: "<strong>Vidya's Teaching Experience:</strong> 👩‍🏫\n\n<strong>Teaching Professional</strong><br>S.S.V.M. & Jr. College, Aundh, Pune<br>May 2021 - October 2021 (6 months)\n\n<strong>Responsibilities:</strong>\n• Assisted lead teachers with lesson preparation and delivery\n• Supported students through one-on-one or small group interactions\n• Managed classroom routines and behavior\n• Maintained records\n• Participated in professional development\n\n<strong>Qualifications:</strong>\n✓ Bachelor of Education (B.Ed) in Science and Mathematics\n✓ Strong communication skills\n✓ Passion for working with students\n\n<strong>Subjects:</strong> Science & Mathematics\n\nThis teaching experience strengthens her ability to explain complex technical concepts clearly!"
  },
  
  customized: {
    patterns: ['customized energy', 'ces', 'employer', 'company'],
    response: "<strong>Experience at Customized Energy Solutions:</strong> 💼\n\n<strong>Total Duration:</strong> 1 year 6 months (across 3 roles)\n\n<strong>1. Market Research Analyst</strong><br>July 2023 - June 2024 (1 year) | Pune<br>• Energy sector data analysis\n• Market trends & competitor tracking\n• Strategic insights & presentations\n\n<strong>2. Laboratory Intern</strong><br>January 2023 - June 2023 (6 months) | Pune<br>• Battery R&D support\n• Material characterization\n• Lab safety & equipment maintenance\n\n<strong>3. Data Analyst</strong><br>November 2017 - April 2018 (6 months) | Wakad, Pune<br>• Interactive Excel dashboards\n• Management reporting\n• Data-driven decision support\n\nCustomized Energy Solutions is where she gained deep energy sector expertise!"
  }
};

// Enhanced AI system with proper model prioritization and metadata
async function tryAIResponse(message, isVidyaQuestion = false) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.log('⚠️ No OpenRouter API key found');
      return { success: false, reason: 'no_api_key' };
    }

    console.log('🤖 Attempting AI response with prioritized models...');

    // Use only working free tier models - primary and fallback
    const models = [
      'minimax/minimax-m2:free',
      'openrouter/polaris-alpha'
    ];

    let lastError = null;
    let triedModels = [];

    // System prompt based on question type
    const systemPrompt = isVidyaQuestion
      ? `You are a helpful AI assistant. You have knowledge about Vidya Raut, an energy and power market analyst with 2+ years of experience, battery R&D background, and expertise in Excel and market analysis. Keep responses under 150 words, be helpful and professional, and focus on accurate information about her background when relevant.`
      : `You are a helpful AI assistant. Provide accurate, informative responses to general questions on any topic. Keep responses under 150 words, be concise and helpful. Only mention Vidya Raut if the question is specifically about her background.`;

    for (const model of models) {
      try {
        console.log(`🔄 Trying model: ${model} (${isVidyaQuestion ? 'Vidya-specific' : 'general'})`);
        triedModels.push(model);

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'http://localhost:5001',
            'X-Title': 'Vidya Raut Portfolio Assistant'
          },
          body: JSON.stringify({
            model: model,
            messages: [{
              role: "system",
              content: systemPrompt
            }, {
              role: "user",
              content: message
            }],
            temperature: 0.7,
            max_tokens: 300,
            stream: false
          })
        });

        console.log(`📊 Model ${model} response status: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices?.[0]?.message?.content;

          if (aiResponse && aiResponse.trim().length > 10) {
            console.log(`✅ Model ${model} succeeded!`);

            return {
              success: true,
              response: aiResponse,
              metadata: {
                model: data.model || model,
                tokens_prompt: data.usage?.prompt_tokens || message.length,
                tokens_completion: data.usage?.completion_tokens || aiResponse.length,
                total_tokens: data.usage?.total_tokens || (message.length + aiResponse.length),
                finish_reason: data.choices?.[0]?.finish_reason || 'completed',
                tried_models: triedModels,
                success_model: model,
                question_type: isVidyaQuestion ? 'vidya-specific' : 'general',
                ai_provider: 'OpenRouter'
              }
            };
          }
        } else {
          // Handle 401 and 429 errors gracefully
          const errorText = await response.text();
          if (response.status === 401) {
            console.log(`🔄 Model ${model}: Auth required, trying next model...`);
            lastError = 'auth_required';
          } else if (response.status === 429) {
            console.log(`⏳ Model ${model}: Rate limited, trying next model...`);
            lastError = 'rate_limited';
          } else {
            console.log(`❌ Model ${model} failed: ${response.status} - ${errorText.substring(0, 100)}`);
            lastError = `http_${response.status}`;
          }
        }

      } catch (modelError) {
        console.warn(`💥 Model ${model} error:`, modelError.message);
        lastError = modelError.message;
        continue; // Try next model
      }
    }

    console.log(`🔄 All ${models.length} free models failed. Last error: ${lastError}`);
    console.log(`📋 Free models tested: ${triedModels.join(', ')}`);
    return {
      success: false,
      reason: lastError || 'all_models_failed',
      tried_models: triedModels
    };

  } catch (error) {
    console.error('💥 AI system error:', error.message);
    return { success: false, reason: 'system_error', error: error.message };
  }
}

// Main chat endpoint with AI fallback + pattern matching
router.post('/chat', async (req, res) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown';

  try {
    console.log(`📥 Chat request from ${clientIP}`);

    const { message } = req.body;

    // Enhanced input validation with better JSON handling
    if (!message || typeof message !== 'string') {
      console.log(`Invalid message type: ${typeof message}`);
      return res.status(400).json({
        success: false,
        error: 'Invalid message format - message must be a string'
      });
    }

    const sanitizedMessage = sanitizeInput(message);
    if (!sanitizedMessage) {
      console.log('Empty message after sanitization');
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty after sanitization'
      });
    }

    console.log(`Valid message received: "${sanitizedMessage.substring(0, 50)}..."`);

    // Rate limiting check
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      console.log(`🚫 Rate limit exceeded for ${clientIP}`);
      return res.status(429).json({
        success: false,
        error: 'Too many requests',
        message: `Please wait ${Math.ceil(rateLimitResult.resetTime / 1000)} seconds before trying again.`,
        retryAfter: Math.ceil(rateLimitResult.resetTime / 1000)
      });
    }

    console.log(`💬 Processing: "${sanitizedMessage.substring(0, 50)}..."`);

    // Check cache first
    const cacheKey = sanitizedMessage.toLowerCase().trim();
    const cachedResponse = getCachedResponse(cacheKey);
    if (cachedResponse) {
      console.log('✅ Cache hit');
      return res.status(200).json({
        ...cachedResponse,
        cached: true,
        responseTime: Date.now() - startTime
      });
    }

    let finalResponse = null;
    let responseSource = 'pattern';
    let matchedCategory = null;
    let confidence = 0.8;
    let responseMetadata = null;

    // Determine if this is a Vidya-related question with strict matching
    const lowerMessage = sanitizedMessage.toLowerCase().trim();
    
    // Strong Vidya indicators - must contain at least one
    const strongVidyaKeywords = [
      'vidya raut', 'about vidya', 'tell me about her', 'vidya\'s', 'vidya\'s',
      'her portfolio', 'her resume', 'her cv', 'vidya portfolio', 'vidya resume', 'vidya cv'
    ];
    
    // Medium Vidya indicators - must contain at least one with context
    const mediumVidyaKeywords = [
      'her experience', 'her skill', 'her education', 'her background', 'vidya experience', 
      'vidya skill', 'vidya education', 'vidya background', 'contact vidya', 'vidya contact', 
      'reach vidya', 'vidya linkedin', 'vidya github', 'vidya email', 'vidya phone', 
      'market analyst', 'battery r&d', 'laboratory intern', 'energy analyst'
    ];
    
    // Check for strong indicators first
    const hasStrongVidya = strongVidyaKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Check for medium indicators only if no strong indicator found
    const hasMediumVidya = !hasStrongVidya && mediumVidyaKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Only consider as Vidya question if we have a strong indicator OR (medium indicator AND contains Vidya context)
    const isVidyaQuestion = hasStrongVidya || (hasMediumVidya && (
      lowerMessage.includes('vidya') || 
      lowerMessage.includes('she ') || 
      lowerMessage.includes('her ') ||
      lowerMessage.includes('the analyst') ||
      lowerMessage.includes('the researcher')
    ));
    console.log(`🔍 Question analysis: ${isVidyaQuestion ? 'Vidya-related' : 'General question'}`);
    console.log(`🔍 Strong Vidya: ${hasStrongVidya}, Medium Vidya: ${hasMediumVidya}`);

    // Priority 1: Try AI for ALL questions (both general and Vidya-specific)
    console.log('🤖 Trying AI response...');
    const aiResult = await tryAIResponse(sanitizedMessage, isVidyaQuestion);

    if (aiResult.success) {
      finalResponse = aiResult.response;
      responseSource = 'ai';
      confidence = 0.95;
      responseMetadata = aiResult.metadata;
      console.log('✅ Using AI response');
    } else {
      console.log(`❌ AI failed with reason: ${aiResult.reason}`);
      console.log(`📋 Models attempted: ${aiResult.tried_models?.join(', ') || 'none'}`);
      
      // Priority 2: For Vidya questions, use pattern matching as fallback
      if (isVidyaQuestion) {
        console.log('📋 Vidya-related question, using pattern matching fallback');
        
        for (const [category, data] of Object.entries(smartResponses)) {
          const isMatch = data.patterns.some(pattern =>
            lowerMessage.includes(pattern) ||
            pattern.split(' ').every(word => lowerMessage.includes(word))
          );
          if (isMatch) {
            finalResponse = data.response;
            matchedCategory = category;
            confidence = 0.95;
            console.log(`✅ Matched pattern category: ${category}`);
            break;
          }
        }

        // Enhanced default response for Vidya questions
        if (!finalResponse) {
          finalResponse = "Hi! 👋 I'm Vidya's AI assistant. I can help you learn about her professional background:\n\n💼 **2+ years in Energy Sector**\n📊 **Top Skills**: Laboratory Safety, Battery Management, Excel\n🔋 **Battery R&D Experience**\n🎓 **Education**: M.Tech (in progress), B.Ed, MSc, BSc Physics\n📍 **Location**: Pimpri-Chinchwad, Pune\n\nTry asking about her experience, skills, education, or contact information!";
          matchedCategory = 'default';
          confidence = 0.7;
          console.log('ℹ️ Using default Vidya response');
        }
      } else {
        // Priority 3: For general questions when AI fails, provide helpful fallback
        console.log('🌐 General question with AI unavailable, using fallback response');
        finalResponse = "I apologize, but I'm currently unable to access AI services due to rate limits or connectivity issues. As Vidya Raut's portfolio assistant, I specialize in information about her professional background, energy sector experience, and technical skills. Please try asking about:\n\n• Her experience as a Market Research Analyst\n• Battery R&D laboratory work\n• Excel and data analysis skills\n• Education (M.Tech, B.Ed, MSc Physics)\n• Contact information\n\nFor general questions, I recommend trying again in a moment!";
        matchedCategory = 'general-fallback';
        confidence = 0.6;
      }
    }

    // Prepare response with comprehensive metadata
    const responseTime = Date.now() - startTime;
    const response = {
      success: true,
      answer: finalResponse,
      response: finalResponse,
      metadata: {
        // Core metadata
        source: responseSource === 'ai' ? '🤖 OpenRouter AI (Live)' :
                responseSource === 'pattern' ? '📋 Pattern Matching (Offline)' :
                '⚠️ Fallback Response',
        category: matchedCategory || 'general',
        confidence: confidence.toFixed(2),
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        dataSource: 'LinkedIn Profile (November 2024)',

        // Status indicators
        cached: false,
        aiEnhanced: responseSource === 'ai',
        responseType: responseSource,
        isOnline: responseSource === 'ai',
        quality: confidence >= 0.9 ? 'high' : confidence >= 0.7 ? 'medium' : 'low',

        // Performance metrics
        processingSpeed: responseTime < 1000 ? 'fast' : responseTime < 3000 ? 'normal' : 'slow',
        backendStatus: 'operational',

        // Include AI metadata if available
        ...(responseMetadata && {
          ai_provider: responseMetadata.ai_provider,
          ai_model_used: responseMetadata.success_model,
          question_type: responseMetadata.question_type,
          tokens_prompt: responseMetadata.tokens_prompt,
          tokens_completion: responseMetadata.tokens_completion,
          total_tokens: responseMetadata.total_tokens,
          finish_reason: responseMetadata.finish_reason,
          tried_models: responseMetadata.tried_models,
          model_status: 'active',
          api_status: 'connected'
        }),

        // Additional indicators
        rateLimitStatus: 'normal',
        cacheStatus: 'disabled',
        fallbackUsed: responseSource !== 'ai'
      }
    };

    // Cache the response
    setCachedResponse(cacheKey, response);

    console.log('✅ Response sent successfully');
    return res.status(200).json(response);

  } catch (error) {
    console.error(`❌ Chat error for ${clientIP}:`, error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.',
      responseTime: Date.now() - startTime
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    chatbot: 'operational',
    dataSource: 'LinkedIn-verified information',
    system: {
      uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      memoryUsage: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB used`,
      cachedResponses: responseCache.size,
      activeRateLimits: requestLog.size
    },
    version: '2.1.0'
  });
});

export default router;
