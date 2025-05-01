// server.js
const express = require('express');
const cors = require('cors');
const btsData = require('./bts-data');
const subscribers = require('./subscribers');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Mobile Device Tracking Endpoint
 * POST /api/track
 * Body: { imsi: string }
 */
app.post('/api/track', (req, res) => {
  const { imsi } = req.body;
  const result = btsData.locateSubscriber(imsi);
  res.json(result);
});

/**
 * System Health Check Endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    mscLoad: ${(btsData.msc.subscribers.length / btsData.msc.capacity * 100).toFixed(1)}%,
    lastUpdated: new Date().toISOString()
  });
});

app.listen(3000, () => console.log('Tracking API active on port 3000'));