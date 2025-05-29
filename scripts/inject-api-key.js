const fs = require('fs');
const path = require('path');
require('dotenv').config();

const weatherPath = path.join(__dirname, '../src/weather.js');
const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  console.error('❌ API key not found in environment.');
  process.exit(1);
}

let jsContent = fs.readFileSync(weatherPath, 'utf8');
jsContent = jsContent.replace('__API_KEY__', apiKey);
fs.writeFileSync(weatherPath, jsContent);

console.log('✅ API key injected successfully.');
