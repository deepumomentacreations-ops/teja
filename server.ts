import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Gemini client server-side
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// 1. AI Trip Advisor Chat API
app.post('/api/chat-advisor', async (req: Request, res: Response) => {
  try {
    const { message, tripContext, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (aiClient) {
      try {
        const systemPrompt = `You are TravelMate AI, an expert, enthusiastic, and highly knowledgeable travel orchestrator and tourist guide.
You are helping a traveller with their trip.
Current Trip Context:
- Starting Location: ${tripContext?.startingLocation || 'Not specified'}
- Destination: ${tripContext?.destination || 'Goa'}
- Duration: ${tripContext?.durationDays || 5} Days
- Travellers: ${tripContext?.travellers?.adults || 2} Adults, ${tripContext?.travellers?.children || 0} Children
- Budget: ${tripContext?.budget?.currency || 'INR'} ${tripContext?.budget?.userBudget || 50000} (Estimated: ${tripContext?.budget?.totalEstimated || 42000})
- Travel Styles: ${(tripContext?.travelStyles || ['Couple', 'Food']).join(', ')}
- Interests: ${(tripContext?.interests || ['Beaches', 'Culture']).join(', ')}

Brand colors for tone: Warm, premium, friendly, highly practical.
Always provide concrete, actionable advice with estimated costs, realistic timings, local food recommendations, safety tips, or transport options.
Keep responses concise, clear, beautifully formatted with bullet points and bold highlights. If asked to modify an itinerary or reduce costs, explain clearly how they can save money or what specific activities to swap.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${systemPrompt}\n\nUser Question: ${message}`,
        });

        const reply = response.text || 'I am ready to help you plan and navigate every step of your trip!';
        return res.json({ reply, status: 'success' });
      } catch (geminiError) {
        console.warn('Gemini generateContent error in chat:', geminiError);
      }
    }

    // Smart algorithmic fallback response when Gemini is busy or API key is not active
    const fallbackReplies: Record<string, string> = {
      budget: `💡 **Budget Optimization Tips for ${tripContext?.destination || 'your destination'}:**\n- **Stay:** Switching to boutique guesthouses or heritage homestays saves ~₹3,500/night with complimentary local breakfast.\n- **Transit:** Rent a self-drive scooter (₹450/day) or use local electric autos instead of multiple point-to-point cabs.\n- **Dining:** Mix 1 fine-dining sunset dinner with iconic beach shacks / local thali places (avg ₹350/person).\n- **Estimated Total Savings:** ₹8,500 – ₹12,000 without sacrificing comfort!`,
      food: `🍴 **Must-Try Local Culinary Delicacies in ${tripContext?.destination || 'this region'}:**\n- **Authentic Specialties:** Local Spiced Fish Curry, Butter Garlic Crab, and Goan Poi / Nizami Biryani.\n- **Vegetarian Delights:** Paneer Ghee Roast, Tender Coconut Payasam, and Wood-fired Truffle Flatbreads.\n- **Top Spots:** Fisherman's Wharf, Green Leaf Organic, and Clifftop Sunset Roasteries.`,
      tomorrow: `📅 **Recommended Next Day Plan:**\n- **08:30 AM:** Morning seaside walk & fresh tropical smoothie.\n- **10:00 AM:** Clifftop Portuguese Fort & Lighthouse exploration (best lighting for photos).\n- **01:00 PM:** Authentic seaside lunch.\n- **04:30 PM:** Catamaran sunset cruise with live acoustic music.\n- **08:30 PM:** Candlelit beachside dinner.`
    };

    const msgLower = message.toLowerCase();
    let reply = `Here is your TravelMate recommendation for **${tripContext?.destination || 'your journey'}**:\n\nFor your party of **${tripContext?.travellers?.adults || 2} travellers**, we recommend pacing your days with morning exploration, relaxing afternoon cafes, and scenic sunset viewpoints.\n\nLet me know if you would like me to adjust your budget, swap any day's activities, or find specific vegetarian or luxury spots!`;

    if (msgLower.includes('cheap') || msgLower.includes('budget') || msgLower.includes('save') || msgLower.includes('afford')) {
      reply = fallbackReplies.budget;
    } else if (msgLower.includes('food') || msgLower.includes('eat') || msgLower.includes('restaurant') || msgLower.includes('vegetarian')) {
      reply = fallbackReplies.food;
    } else if (msgLower.includes('tomorrow') || msgLower.includes('next') || msgLower.includes('do') || msgLower.includes('itinerary')) {
      reply = fallbackReplies.tomorrow;
    }

    return res.json({ reply, status: 'fallback' });
  } catch (error) {
    console.error('Chat advisor error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// 2. Flight Tracking API Simulation & Live Telemetry
app.post('/api/flight-tracker', (req: Request, res: Response) => {
  const { flightNumber } = req.body;
  const num = flightNumber || '6E-428';

  // Return realistic telemetry
  const randomAltitude = 31000 + Math.floor(Math.random() * 2000);
  const randomSpeed = 450 + Math.floor(Math.random() * 30);
  const randomProgress = Math.min(95, Math.max(15, Math.floor(40 + Math.random() * 25)));

  res.json({
    flightNumber: num,
    status: 'In Flight',
    altitudeFt: randomAltitude,
    speedKts: randomSpeed,
    progressPercent: randomProgress,
    currentCoordinates: { lat: 16.45, lng: 77.8 },
    eta: '11:12 AM',
    gate: 'Gate 4B',
    terminal: 'T2',
    baggageClaim: 'Belt 3',
    weatherAtDestination: '28°C Clear Skies',
    lastRadarPing: new Date().toLocaleTimeString()
  });
});

// 3. Health & Status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString(), aiReady: Boolean(aiClient) });
});

// Mount Vite or static build
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`TravelMate AI server running at http://0.0.0.0:${port}`);
  });
}

startServer();
