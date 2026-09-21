require('dotenv').config();

const path = require('path');
const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';

  if (!prompt) {
    return res.status(400).json({ error: 'অনুগ্রহ করে আগে একটি prompt লিখুন।' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'OPENAI_API_KEY পাওয়া যায়নি। .env.example কপি করে .env ফাইলে আপনার API key দিন।'
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Give clear, useful answers. Reply in the language used by the user when possible.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return res.json({ result: response.output_text || 'কোনো উত্তর পাওয়া যায়নি।' });
  } catch (error) {
    console.error('OpenAI request failed:', error.message);
    return res.status(error.status || 500).json({
      error: error.status === 401
        ? 'API key সঠিক নয়। আপনার .env ফাইলটি পরীক্ষা করুন।'
        : 'AI response আনা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।'
    });
  }
});

app.listen(port, () => {
  console.log(`Promptly AI চলছে: http://localhost:${port}`);
});
