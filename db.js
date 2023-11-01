const mongoose = require('mongoose');
const connection = mongoose.connect(
  "mongodb://localhost:27017/nodejs-demoapp-db", {
    family: 4,
  });

module.exports = {connection};
