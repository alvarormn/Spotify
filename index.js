'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/spotify',
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
(err, res) => {
  if(err){
    throw err;
  } else {
    console.log('The spotify\'s BBDD conection is working successfully');

    app.listen(port, function() {
      console.log('API REST server is listening');
    })

  }
});
