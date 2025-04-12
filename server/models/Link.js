// // server/models/Link.js
// const mongoose = require('mongoose');

// const LinkSchema = new mongoose.Schema({
//   longUrl: {
//     type: String,
//     required: true,
//   },
//   shortCode: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   customAlias: {
//     type: String,
//     unique: true,
//     sparse: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   clicks: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   expiresAt: {
//     type: Date,
//   },
//   qrCode: {
//     type: String,
//   },
// });

// module.exports = mongoose.model('Link', LinkSchema);




const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  customAlias: {
    type: String,
    unique: true,
    sparse: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
  qrCode: {
    type: String,
  },
});

module.exports = mongoose.model('Link', LinkSchema);
