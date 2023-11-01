const bodyParser = require('body-parser');
const express = require('express');
const app = express();  // Binds the express module into 'app'
const {connection} = require('./db');
const {UserRoute} = require('./routes/user.route');
const PORT = 3000;

app.use(bodyParser.json());

app.use("/user", UserRoute);
app.get('/', (req, res) => res.send(`Landing Page`));

app.listen(3000, "localhost", async () => {
  try {
    await connection;
    console.log(`DB connection established`);
  } catch (error) {
    console.log(`DB connection failure`);
  }
  console.log(`Local server listening on port ${PORT}`);
});
