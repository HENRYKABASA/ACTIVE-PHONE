// bts-data.js
const turf = require('@turf/turf');

/**
 * Core BTS network configuration and management system
 * Contains MSC configuration, BTS tower data, and geospatial operations
 */
module.exports = {
  msc: {
    id: "MSC-001",
    name: "Safaricom Central MSC",
    location: [-1.286389, 36.817223], // [lat, lng]
    capacity: 100000,
    subscribers: []
  },

  btsTowers: [
    {
      id: "BTS-001",
      name: "CBD Tower",
      location: [-1.2833, 36.8167],
      coverageRadius: 1500, // meters
      connectedSubscribers: [],
      sector: 1
    },
    {
      id: "BTS-002",
      name: "Westlands Hub",
      location: [-1.2653, 36.8052],
      coverageRadius: 1800,
      connectedSubscribers: [],
      sector: 2
    }
  ],

  /**
   * Automatically map subscriber to nearest BTS tower
   * @param {Object} subscriber - Subscriber device information
   */
  autoMapSubscriber(subscriber) {
    const subscriberPoint = turf.point([subscriber.location[1], subscriber.location[0]]);
    let nearestBTS = null;
    let minDistance = Infinity;

    this.btsTowers.forEach(bts => {
      const btsPoint = turf.point([bts.location[1], bts.location[0]]);
      const distance = turf.distance(subscriberPoint, btsPoint, {units: 'kilometers'});
      
      if (distance * 1000 <= bts.coverageRadius && distance < minDistance) {
        minDistance = distance;
        nearestBTS = bts;
      }
    });

    if (nearestBTS && this.msc.subscribers.length < this.msc.capacity) {
      nearestBTS.connectedSubscribers.push(subscriber.imsi);
      this.msc.subscribers.push(subscriber.imsi);
      subscriber.servingBTS = nearestBTS.id;
      subscriber.status = "CONNECTED";
    }
  },

  /**
   * Locate subscriber device within network
   * @param {string} imsi - Subscriber's International Mobile Subscriber Identity
   */
  locateSubscriber(imsi) {
    const subscriber = this.findSubscriber(imsi);
    if (!subscriber) return { error: "Subscriber not found" };

    const servingBTS = this.btsTowers.find(bts => bts.id === subscriber.servingBTS);
    return {
      imsi,
      location: this._calculateLocation(servingBTS),
      accuracy: ±${Math.round(servingBTS.coverageRadius/2)}m,
      timestamp: new Date().toISOString()
    };
  },

  // Private helper methods
  _calculateLocation(bts) {
    return [
      bts.location[0] + (Math.random() * 0.002 - 0.001),
      bts.location[1] + (Math.random() * 0.002 - 0.001)
    ];
  }
};