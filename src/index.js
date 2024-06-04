const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const app = express();
const url=require('url')

const PORT = process.env.PORT || 4500;

// Environment variables for better configuration
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';
const WEATHER_API_ENDPOINT = 'current.json';

app.use(bodyParser.json());
app.use(cors());

// Centralized function to fetch weather data
async function getWeatherData(req) {
  const targetUrl = `${WEATHER_API_BASE_URL}/${WEATHER_API_ENDPOINT}`;

}

// Handle all requests and delegate weather data fetching
app.all('*', async (req, res) => {
  try {
    const url = req.url; // More concise variable name
    console.log(`Request URL: ${url}`);

    // Extract query parameters more robustly
    const queryParams = new URLSearchParams(url.split('?')[1] || ''); // Handle missing query string
    const queryObject = {};
    for (const [key, value] of queryParams.entries()) {
      queryObject[key] = value;
    }

    console.log(`Query Parameters:`, queryObject); // Print as an object

    const urlPath = url.split('?')[0];

    res.json({ url, queryObject }); // Send response as JSON

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' }); // More informative error response
  }
});

app.listen(PORT, () => {
  console.log(`Weather API Proxy listening on port ${PORT}`);
});
