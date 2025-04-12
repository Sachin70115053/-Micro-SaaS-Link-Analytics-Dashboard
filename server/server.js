// server/server.js
const app = require('./app.js');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});