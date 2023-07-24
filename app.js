const express = require('express');
const mongoose  = require('mongoose');
const DB = 'mongodb+srv://krupabhatt14061999:Krupa%401406@cluster0.5lbqkpo.mongodb.net/'
const app = express();

const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

mongoose.connect(DB).then(() =>{
  console.log('connection successfull')
}).catch((err)=>console.log('no connection'))
require('./routes')(app);

  app.listen(4000);