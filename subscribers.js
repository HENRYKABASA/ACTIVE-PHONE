// subscribers.js
const { faker } = require('@faker-js/faker');

/**
 * Generates realistic mobile subscriber dataset
 * @param {number} count - Number of subscribers to generate
 */
function generateSubscribers(count = 100000) {
  return Array.from({length: count}, (_, i) => ({
    imsi: `63902${String(i).padStart(10, '0')}`,
    msisdn: `+2547${String(i).padStart(8, '0')}`,
    location: this._randomBtsLocation(),
    deviceType: this._randomDeviceType(),
    imei: this._generateIMEI(i),
    lastActivity: faker.date.recent()
  }));
}

// Private generation helpers
function _randomBtsLocation() {
  const bts = this.btsTowers[Math.floor(Math.random() * this.btsTowers.length)];
  return [
    bts.location[0] + (Math.random() * 0.01 - 0.005),
    bts.location[1] + (Math.random() * 0.01 - 0.005)
  ];
}

module.exports = generateSubscribers();