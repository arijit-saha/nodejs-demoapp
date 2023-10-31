const express = require('express');
const app = express();  // Binds the express module into 'app'

app.get('/', (req, res) => res.send(`Landing Page. Made changes`));

app.listen(3000, "localhost", () =>
  console.log(`Local server listening on port 3000`));