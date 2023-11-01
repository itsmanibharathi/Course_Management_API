require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB Connetion Successfull");
    })
    .catch((err) => {
      console.log(err.message);
  });

app.get('/healthcheck', (req, res) => {
  res.send('Server is up and running.');
});

app.listen(port, (err) => {
    if (err) {
    console.log(err);
  } else {
    console.log(`Server Started Successfully at ${port}.`);
  }
});
app.use(express.json());

const courseRouter = require('./Router/index');
app.use('/api',courseRouter);