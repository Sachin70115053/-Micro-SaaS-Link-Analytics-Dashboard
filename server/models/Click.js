// // server/models/Click.js
// const mongoose = require('mongoose');

// const ClickSchema = new mongoose.Schema({
//   linkId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Link',
//     required: true,
//   },
//   clickedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   ipAddress: {
//     type: String,
//   },
//   deviceType: {
//     type: String,
//     enum: ['desktop', 'mobile', 'tablet', 'other'],
//   },
//   browser: {
//     type: String,
//   },
//   os: {
//     type: String,
//   },
//   country: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
// });

// module.exports = mongoose.model('Click', ClickSchema);


const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'other'],
  },
  browser: {
    type: String,
  },
  os: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model('Click', ClickSchema);
