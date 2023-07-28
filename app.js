const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
app.use(express.json())
app.use(cors());
require('dotenv').config()

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}));

var indexRouter = require('./routes/index');

app.use(bodyParser.json())
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }
).then(() => {
  console.log('connection successfull');
  app.use('/', indexRouter);
}).catch((err) => console.log('no connection'))

app.listen(4000);

module.exports = app;
