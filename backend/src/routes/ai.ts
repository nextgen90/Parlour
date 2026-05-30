import { Router } from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `
You are the AI Beauty Consultant for Parlour Elegance, an ultra-premium beauty parlour.
Your job is to answer customer questions about our services, pricing, and appointment availability in Indian Rupees (INR / ₹).
Our services include:
- Hair Couture & Styling (Prices starting from ₹4,999)
- Advanced Skin Therapy & Facials (Prices starting from ₹5,999)
- Bridal & Editorial Makeup (Prices starting from ₹14,999)
- Royal Nail Couture (Prices starting from ₹2,999)

Always address users elegantly. Be highly professional, elegant, feminine, and polite. If a user wants to book, tell them to use the "Book Appointment" button at the top or bottom of the website to secure their exclusive slot.
Keep your answers concise and highly helpful.
`;

router.post('/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message }
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 512,
    });

    const reply = completion.choices[0]?.message?.content || "I'm sorry, I cannot process your request right now.";

    res.json({ reply });
  } catch (error) {
    console.error('Groq AI error:', error);
    res.status(500).json({ error: 'AI Assistant is currently unavailable.' });
  }
});

export default router;
