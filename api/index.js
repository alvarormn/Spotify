'use strict'

const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');
const app = require('./app');
const port = process.env.PORT || 3977;


/*const config = {
    username:'ubuntu',
    host:'3.21.164.220',
    agent : process.env.SSH_AUTH_SOCK,
    privateKey:require('fs').readFileSync('./ssh/securityKey.pem'),
    port:22,
    dstHost:'127.0.0.1',
    dstPort:27017,
    localHost:'127.0.0.1',
    //password:'mypassword',
    localPort: 27017
};

let server = tunnel(config, function (error,server) {
  if(error){
      console.log("SSH connection error: " + error);
  } else {
    //console.log(server.connection);
    //console.log(server);
    mongoose.connect('mongodb://localhost:27017/spotify',
    {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useNewUrlParser: true },
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
  }
})*/

mongoose.connect('mongodb://localhost:27017/spotify',
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useNewUrlParser: true },
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
