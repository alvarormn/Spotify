'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Secret key'

exports.createToken = function(user){
  var payLoad = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payLoad, secret);

}
/*
De la forma que se realiza en las lineas de arriba para exportar el contenido de
la función es igual a como se realiza a continuación y como se ha realizado en
todos los componentes. Se puede realizar de ambas formas, es mas comoda de la
forma de arriba pero más ordenada y comprensible en la forma de abajo.

function createToken(user) {
  var payLoad = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payLoad, secret);
}


module.exports ={
  createToken
}
*/
