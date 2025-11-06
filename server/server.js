// server/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// 🧠 Mock quotes for testing
const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Don’t let yesterday take up too much of today.",
  "It always seems impossible until it’s done.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Opportunities don’t happen. You create them.",
  "Sometimes later becomes never. Do it now.",
  "Don’t be afraid to give up the good to go for the great.",
  "If you want to achieve greatness, stop asking for permission.",
  "The future depends on what you do today.",
  "Doubt kills more dreams than failure ever will.",
  "Discipline is the bridge between goals and accomplishment.",
  "Work hard in silence, let your success make the noise.",
  "Believe you can and you're halfway there.",
  "Failure is simply the opportunity to begin again, this time more intelligently."
];


// ✅ Quote API
app.get("/api/quote", (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

// 🌤️ Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Bengaluru";
    const apiKey = process.env.WEATHER_API_KEY;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    // const { temp } = response.data.main;
    const weather = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    };
    // const description = response.data.weather[0].description;
    // res.json({ city, temperature: temp, condition: description });
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// 💱 Currency Converter API
app.get("/api/currency", async (req, res) => {
  const { amount = 100 } = req.query;
  try {
    const url = `https://api.exchangerate-api.com/v4/latest/INR`;
    const response = await axios.get(url);
    const usdRate = response.data.rates.USD;
    const eurRate = response.data.rates.EUR;
    res.json({
      amount: Number(amount),
      usd: (amount * usdRate).toFixed(2),
      eur: (amount * eurRate).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});

// 🏃 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
