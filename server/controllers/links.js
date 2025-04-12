// // server/controllers/links.js
// const Link = require('../models/Link');
// const Click = require('../models/Click');
// const ErrorResponse = require('../utils/errorResponse');
// const asyncHandler = require('../middleware/async');
// const { generateShortCode } = require('../utils/generateShortCode');
// const QRCode = require('qrcode');
// const { parseDevice, parseBrowser } =require( '../utils/geoUtils');
// // @desc    Create a short link
// // @route   POST /api/v1/links
// // @access  Private
// exports.createLink = asyncHandler(async (req, res, next) => {
//   const { longUrl, customAlias, expiresAt } = req.body;
  
//   // Generate short code
//   const shortCode = customAlias || generateShortCode(6);
  
//   // Check if custom alias is already taken
//   if (customAlias) {
//     const existingLink = await Link.findOne({ shortCode });
//     if (existingLink) {
//       return next(new ErrorResponse('Custom alias is already taken', 400));
//     }
//   }
  
//   // Generate QR code
//   const qrCode = await QRCode.toDataURL(`${process.env.BASE_URL}/${shortCode}`);
  
//   const link = await Link.create({
//     longUrl,
//     shortCode,
//     customAlias: customAlias || undefined,
//     userId: req.user.id,
//     expiresAt: expiresAt || undefined,
//     qrCode
//   });
  
//   res.status(201).json({
//     success: true,
//     data: link
//   });
// });



// // @desc    Redirect to original URL
// // @route   GET /:shortCode
// // @access  Public
// exports.redirectLink = asyncHandler(async (req, res, next) => {
//   const { shortCode } = req.params;
  
//   const link = await Link.findOne({ shortCode });
  
//   if (!link) {
//     return next(new ErrorResponse('Link not found', 404));
//   }
  
//   // Check if link is expired
//   if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
//     return next(new ErrorResponse('Link has expired', 410));
//   }
  
//   // Increment click count
//   link.clicks += 1;
//   await link.save();
  
//   // Log click data asynchronously
//   logClickData(link._id, req);
  
//   res.redirect(link.longUrl);
// });

// // @desc    Get all links for a user
// // @route   GET /api/v1/links
// // @access  Private
// exports.getLinks = asyncHandler(async (req, res, next) => {
//   const { page = 1, limit = 10, search = '' } = req.query;
  
//   const query = {
//     userId: req.user.id
//   };
  
//   if (search) {
//     query.$or = [
//       { longUrl: { $regex: search, $options: 'i' } },
//       { shortCode: { $regex: search, $options: 'i' } },
//       { customAlias: { $regex: search, $options: 'i' } }
//     ];
//   }
  
//   const links = await Link.find(query)
//     .sort({ createdAt: -1 })
//     .skip((page - 1) * limit)
//     .limit(parseInt(limit));
  
//   const total = await Link.countDocuments(query);
  
//   res.status(200).json({
//     success: true,
//     count: links.length,
//     total,
//     data: links,
//     page: parseInt(page),
//     pages: Math.ceil(total / limit)
//   });
// });

// // @desc    Get analytics for a link
// // @route   GET /api/v1/links/:id/analytics
// // @access  Private
// exports.getLinkAnalytics = asyncHandler(async (req, res, next) => {
//   const link = await Link.findOne({
//     _id: req.params.id,
//     userId: req.user.id
//   });
  
//   if (!link) {
//     return next(new ErrorResponse('Link not found', 404));
//   }
  
//   // Get clicks data
//   const clicks = await Click.find({ linkId: link._id });
  
//   // Get clicks by day for the last 30 days
//   const clicksByDay = await Click.aggregate([
//     {
//       $match: {
//         linkId: link._id,
//         clickedAt: {
//           $gte: new Date(new Date().setDate(new Date().getDate() - 30))
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           $dateToString: { format: "%Y-%m-%d", date: "$clickedAt" }
//         },
//         count: { $sum: 1 }
//       }
//     },
//     { $sort: { _id: 1 } }
//   ]);
  
//   // Get clicks by device
//   const clicksByDevice = await Click.aggregate([
//     {
//       $match: { linkId: link._id }
//     },
//     {
//       $group: {
//         _id: "$deviceType",
//         count: { $sum: 1 }
//       }
//     }
//   ]);
  
//   // Get clicks by browser
//   const clicksByBrowser = await Click.aggregate([
//     {
//       $match: { linkId: link._id }
//     },
//     {
//       $group: {
//         _id: "$browser",
//         count: { $sum: 1 }
//       }
//     }
//   ]);
  
//   // Get clicks by country
//   const clicksByCountry = await Click.aggregate([
//     {
//       $match: { linkId: link._id }
//     },
//     {
//       $group: {
//         _id: "$country",
//         count: { $sum: 1 }
//       }
//     }
//   ]);
  
//   res.status(200).json({
//     success: true,
//     data: {
//       link,
//       totalClicks: link.clicks,
//       clicksByDay,
//       clicksByDevice,
//       clicksByBrowser,
//       clicksByCountry
//     }
//   });
// });

// // Helper function to log click data asynchronously
// const logClickData = async (linkId, req) => {
//   try {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     const userAgent = req.headers['user-agent'];
    
//     // Parse user agent for device and browser info
//     const deviceType = parseDeviceType(userAgent);
//     const browser = parseBrowser(userAgent);
//     const os = parseOS(userAgent);
    
//     // Get location data (simplified - in production use a service like ipstack)
//     const location = await getLocationFromIP(ip);

    
//     await Click.create({
//       linkId,
//       ipAddress: ip,
//       deviceType: parseDevice(userAgent),
//       browser: parseBrowser(userAgent),
//       os,
//       country: location?.country || 'Unknown',
//       city: location?.city || 'Unknown'
//     });
//   } catch (err) {
//     console.error('Error logging click data:', err);
//   }
// };

// // Helper functions for parsing user agent
// const parseDeviceType = (userAgent) => {
//   if (/mobile/i.test(userAgent)) return 'mobile';
//   if (/tablet/i.test(userAgent)) return 'tablet';
//   if (/desktop/i.test(userAgent)) return 'desktop';
//   return 'other';
// };

// const parseBrowser = (userAgent) => {
//   if (/chrome/i.test(userAgent)) return 'Chrome';
//   if (/firefox/i.test(userAgent)) return 'Firefox';
//   if (/safari/i.test(userAgent)) return 'Safari';
//   if (/edge/i.test(userAgent)) return 'Edge';
//   if (/opera/i.test(userAgent)) return 'Opera';
//   return 'Other';
// };

// const parseOS = (userAgent) => {
//   if (/windows/i.test(userAgent)) return 'Windows';
//   if (/macintosh/i.test(userAgent)) return 'Mac OS';
//   if (/linux/i.test(userAgent)) return 'Linux';
//   if (/android/i.test(userAgent)) return 'Android';
//   if (/ios/i.test(userAgent)) return 'iOS';
//   return 'Unknown';
// };

// // Simplified location lookup (in production use a proper IP geolocation service)
// const getLocationFromIP = async (ip) => {
//   // This is a mock - replace with actual IP geolocation service
//   return {
//     country: 'Unknown',
//     city: 'Unknown'
//   };
// };










// const Link = require('../models/Link');
// const Click = require('../models/Click');
// const ErrorResponse = require('../utils/errorResponse');
// const asyncHandler = require('../middleware/async');
// const { generateShortCode } = require('../utils/generateShortCode');
// const QRCode = require('qrcode');
// const { parseDevice, parseBrowser, getLocationFromIP } = require('../utils/geoUtils');

// // @desc    Create a short link
// // @route   POST /api/v1/links
// // @access  Private
// exports.createLink = asyncHandler(async (req, res, next) => {
//   const { longUrl, customAlias, expiresAt } = req.body;

//   const shortCode = customAlias || generateShortCode(6);

//   if (customAlias) {
//     const existingLink = await Link.findOne({ shortCode });
//     if (existingLink) {
//       return next(new ErrorResponse('Custom alias is already taken', 400));
//     }
//   }

//   const qrCode = await QRCode.toDataURL(`${process.env.BASE_URL}/${shortCode}`);

//   const link = await Link.create({
//     longUrl,
//     shortCode,
//     customAlias: customAlias || undefined,
//     userId: req.user.id,
//     expiresAt: expiresAt || undefined,
//     qrCode
//   });

//   res.status(201).json({
//     success: true,
//     data: link
//   });
// });

// // @desc    Redirect to original URL
// // @route   GET /:shortCode
// // @access  Public
// exports.redirectLink = asyncHandler(async (req, res, next) => {
//   const { shortCode } = req.params;

//   const link = await Link.findOne({ shortCode });

//   if (!link) {
//     return next(new ErrorResponse('Link not found', 404));
//   }

//   if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
//     return next(new ErrorResponse('Link has expired', 410));
//   }

//   link.clicks += 1;
//   await link.save();

//   logClickData(link._id, req);

//   res.redirect(link.longUrl);
// });

// // @desc    Get all links for a user
// // @route   GET /api/v1/links
// // @access  Private
// exports.getLinks = asyncHandler(async (req, res, next) => {
//   const { page = 1, limit = 10, search = '' } = req.query;

//   const query = {
//     userId: req.user.id
//   };

//   if (search) {
//     query.$or = [
//       { longUrl: { $regex: search, $options: 'i' } },
//       { shortCode: { $regex: search, $options: 'i' } },
//       { customAlias: { $regex: search, $options: 'i' } }
//     ];
//   }

//   const links = await Link.find(query)
//     .sort({ createdAt: -1 })
//     .skip((page - 1) * limit)
//     .limit(parseInt(limit));

//   const total = await Link.countDocuments(query);

//   res.status(200).json({
//     success: true,
//     count: links.length,
//     total,
//     data: links,
//     page: parseInt(page),
//     pages: Math.ceil(total / limit)
//   });
// });

// // @desc    Get analytics for a link
// // @route   GET /api/v1/links/:id/analytics
// // @access  Private
// exports.getLinkAnalytics = asyncHandler(async (req, res, next) => {
//   const link = await Link.findOne({
//     _id: req.params.id,
//     userId: req.user.id
//   });

//   if (!link) {
//     return next(new ErrorResponse('Link not found', 404));
//   }

//   const clicks = await Click.find({ linkId: link._id });

//   const clicksByDay = await Click.aggregate([
//     {
//       $match: {
//         linkId: link._id,
//         clickedAt: {
//           $gte: new Date(new Date().setDate(new Date().getDate() - 30))
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           $dateToString: { format: "%Y-%m-%d", date: "$clickedAt" }
//         },
//         count: { $sum: 1 }
//       }
//     },
//     { $sort: { _id: 1 } }
//   ]);

//   const clicksByDevice = await Click.aggregate([
//     { $match: { linkId: link._id } },
//     {
//       $group: {
//         _id: "$deviceType",
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   const clicksByBrowser = await Click.aggregate([
//     { $match: { linkId: link._id } },
//     {
//       $group: {
//         _id: "$browser",
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   const clicksByCountry = await Click.aggregate([
//     { $match: { linkId: link._id } },
//     {
//       $group: {
//         _id: "$country",
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   res.status(200).json({
//     success: true,
//     data: {
//       link,
//       totalClicks: link.clicks,
//       clicksByDay,
//       clicksByDevice,
//       clicksByBrowser,
//       clicksByCountry
//     }
//   });
// });

// // Helper to log click info
// const logClickData = async (linkId, req) => {
//   try {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
//     const userAgent = req.headers['user-agent'];

//     const deviceType = parseDevice(userAgent);
//     const browser = parseBrowser(userAgent);

//     const location = await getLocationFromIP(ip);

//     await Click.create({
//       linkId,
//       ipAddress: ip,
//       deviceType,
//       browser,
//       country: location?.country || 'Unknown',
//       city: location?.city || 'Unknown'
//     });
//   } catch (err) {
//     console.error('Error logging click data:', err.message);
//   }
// };
















const Link = require('../models/Link');
const Click = require('../models/Click');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { generateShortCode } = require('../utils/generateShortCode');
const QRCode = require('qrcode');
const { parseDevice, parseBrowser, getLocationFromIP } = require('../utils/geoUtils');

// @desc    Create a short link
// @route   POST /api/v1/links
// @access  Private
exports.createLink = asyncHandler(async (req, res, next) => {
  const { longUrl, customAlias, expiresAt } = req.body;
  const shortCode = customAlias || generateShortCode(6);

  if (customAlias) {
    const existingLink = await Link.findOne({ shortCode });
    if (existingLink) {
      return next(new ErrorResponse('Custom alias is already taken', 400));
    }
  }

  const qrCode = await QRCode.toDataURL(`${process.env.BASE_URL}/${shortCode}`);

  const link = await Link.create({
    longUrl,
    shortCode,
    customAlias: customAlias || undefined,
    userId: req.user.id,
    expiresAt: expiresAt || undefined,
    qrCode
  });

  res.status(201).json({
    success: true,
    data: link
  });
});

// @desc    Redirect to original URL
// @route   GET /:shortCode
// @access  Public
exports.redirectLink = asyncHandler(async (req, res, next) => {
  const { shortCode } = req.params;
  console.log(shortCode)
  const link = await Link.findOne({ shortCode : shortCode });

  if (!link) {
    return next(new ErrorResponse('Link not found', 404));
  }

  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return next(new ErrorResponse('Link has expired', 410));
  }

  // Increment the clicks counter and save
  link.clicks += 1;
  await link.save();

  // Log click data asynchronously without delaying the redirect
  logClickData(link._id, req).catch(err => console.error('Error logging click data:', err.message));

  res.redirect(link.longUrl);
});

// @desc    Get all links for a user with pagination and search
// @route   GET /api/v1/links
// @access  Private
exports.getLinks = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  const query = { userId: req.user.id };

  if (search) {
    query.$or = [
      { longUrl: { $regex: search, $options: 'i' } },
      { shortCode: { $regex: search, $options: 'i' } },
      { customAlias: { $regex: search, $options: 'i' } }
    ];
  }

  const links = await Link.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Link.countDocuments(query);

  res.status(200).json({
    success: true,
    count: links.length,
    total,
    data: links,
    page: parseInt(page),
    pages: Math.ceil(total / limit)
  });
});

// @desc    Get analytics for a link
// @route   GET /api/v1/links/:id/analytics
// @access  Private
exports.getLinkAnalytics = asyncHandler(async (req, res, next) => {
  const link = await Link.findOne({ _id: req.params.id, userId: req.user.id });

  if (!link) {
    return next(new ErrorResponse('Link not found', 404));
  }

  const clicks = await Click.find({ linkId: link._id });

  // Aggregate clicks by day for the past 30 days
  const clicksByDay = await Click.aggregate([
    {
      $match: {
        linkId: link._id,
        clickedAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$clickedAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const clicksByDevice = await Click.aggregate([
    { $match: { linkId: link._id } },
    {
      $group: { _id: "$deviceType", count: { $sum: 1 } }
    }
  ]);

  const clicksByBrowser = await Click.aggregate([
    { $match: { linkId: link._id } },
    {
      $group: { _id: "$browser", count: { $sum: 1 } }
    }
  ]);

  const clicksByCountry = await Click.aggregate([
    { $match: { linkId: link._id } },
    {
      $group: { _id: "$country", count: { $sum: 1 } }
    }
  ]);

  res.status(200).json({
    success: true,
    data: {
      link,
      totalClicks: link.clicks,
      clicksByDay,
      clicksByDevice,
      clicksByBrowser,
      clicksByCountry
    }
  });
});

// Helper to log click info asynchronously
const logClickData = async (linkId, req) => {
  try {
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      '';
    const userAgent = req.headers['user-agent'];

    const deviceType = parseDevice(userAgent);
    const browser = parseBrowser(userAgent);
    const location = await getLocationFromIP(ip);

    await Click.create({
      linkId,
      ipAddress: ip,
      deviceType,
      browser,
      country: location?.country || 'Unknown',
      city: location?.city || 'Unknown'
    });
  } catch (err) {
    // Log error without affecting user redirect
    console.error('Error logging click data:', err.message);
  }
};

