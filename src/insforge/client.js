const { createClient } = require('@insforge/sdk');

// Configuration InsForge
const insforge = createClient({
  baseUrl: 'https://qh9ipgt6.us-west.insforge.app',
  anonKey: 'ik_e19f8363ba08bb4efae4e513aa031843'
});

module.exports = insforge;