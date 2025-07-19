const fs = require('fs');
const path = require('path');
require('dotenv').config();

const weatherPath = path.join(__dirname, '../src/weather.js');
const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  console.error('❌ API key not found in environment (OPENWEATHER_API_KEY).');
  console.error('ℹ️  Create a .env file or set the variable in your CI/CD environment.');
  process.exit(1);
}

try {
  let jsContent = fs.readFileSync(weatherPath, 'utf8');

  if (!jsContent.includes('__API_KEY__')) {
    console.error('❌ Placeholder "__API_KEY__" not found in src/weather.js.');
    process.exit(1);
  }

  jsContent = jsContent.replace('__API_KEY__', apiKey);
  fs.writeFileSync(weatherPath, jsContent);

  console.log('✅ API key injected successfully into src/weather.js');
} catch (err) {
  console.error('❌ Failed to inject API key:', err.message);
  process.exit(1);
}
