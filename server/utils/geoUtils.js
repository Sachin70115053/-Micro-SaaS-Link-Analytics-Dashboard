// exports.parseDevice = (userAgent) => {
//     if (/mobile/i.test(userAgent)) return 'mobile';
//     if (/tablet/i.test(userAgent)) return 'tablet';
//     return 'desktop';
//   };
  
//   exports.parseBrowser = (userAgent) => {
//     const matches = {
//       'Chrome': /chrome|chromium/i,
//       'Firefox': /firefox/i,
//       'Safari': /safari/i
//     };
//     return Object.entries(matches).find(([_, regex]) => regex.test(userAgent))?.[0] || 'Other';
//   };

// const axios = require('axios');

// exports.parseDevice = (userAgent) => {
//   if (/mobile/i.test(userAgent)) return 'mobile';
//   if (/tablet/i.test(userAgent)) return 'tablet';
//   return 'desktop';
// };

// exports.parseBrowser = (userAgent) => {
//   const matches = {
//     'Chrome': /chrome|chromium/i,
//     'Firefox': /firefox/i,
//     'Safari': /safari/i
//   };
//   return Object.entries(matches).find(([_, regex]) => regex.test(userAgent))?.[0] || 'Other';
// };

// exports.getLocationFromIP = async (ip) => {
//   try {
//     const response = await axios.get(`http://ip-api.com/json/${ip}`);
//     const { country, city } = response.data;
//     return { country, city };
//   } catch (err) {
//     console.error('Geo lookup failed:', err.message);
//     return { country: 'Unknown', city: 'Unknown' };
//   }
// };




const axios = require('axios');

exports.parseDevice = (userAgent) => {
  if (/mobile/i.test(userAgent)) return 'mobile';
  if (/tablet/i.test(userAgent)) return 'tablet';
  return 'desktop';
};

exports.parseBrowser = (userAgent) => {
  const matches = {
    'Chrome': /chrome|chromium/i,
    'Firefox': /firefox/i,
    'Safari': /safari/i
  };
  return Object.entries(matches).find(([_, regex]) => regex.test(userAgent))?.[0] || 'Other';
};

exports.getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { country, city } = response.data;
    return { country, city };
  } catch (err) {
    console.error('Geo lookup failed:', err.message);
    return { country: 'Unknown', city: 'Unknown' };
  }
};
