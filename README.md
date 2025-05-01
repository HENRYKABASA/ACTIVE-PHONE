# Mobile Network Tracking System (Nairobi)

![Screenshot](map-screenshot.png)

A cellular network visualization and tracking system for Nairobi, Kenya using OpenStreetMap and Leaflet.js.

## Features

- **Network Visualization**
  - BTS Towers with coverage hexagons
  - MSC (Mobile Switching Center) tracking
  - 100,000+ simulated subscribers
  - Automatic subscriber-to-BTS mapping

- **Core Functionality**
  - Real-time device tracking
  - Location approximation algorithms
  - Network capacity monitoring
  - Geospatial calculations (Turf.js)

- **Security**
  - JWT authentication
  - API endpoint protection
  - Encrypted communications

## Tech Stack

**Frontend**
- Leaflet.js (OpenStreetMap)
- HTML5/CSS3
- JavaScript (ES6+)

**Backend**
- Node.js/Express
- Turf.js (geospatial analysis)
- SQLite3 (database)

## Installation

### Prerequisites
- Node.js v16+
- npm v8+
- Google Maps API Key (optional)

```bash
# Clone repository
git clone https://github.com/yourusername/nairobi-mobile-tracking.git
cd nairobi-mobile-tracking

# Install dependencies
npm install
