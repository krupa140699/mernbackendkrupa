const express = require('express');
const mongoose  = require('mongoose');
const app = express();
require('dotenv').config()

const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

mongoose.connect(process.env.MONGO_DB).then(() =>{
  console.log('connection successfull')
}).catch((err)=>console.log('no connection'))
require('./routes')(app);

  app.listen(4000);