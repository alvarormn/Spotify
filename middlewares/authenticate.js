'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Secret key'

exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'the request has not the authorization´s header'
    })
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    var payLoad = jwt.decode(token, secret);

    if (payLoad.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'Token is expired'
      })
    }

  } catch (ex) {
    return res.status(404).send({
      message: 'Token not valid'
    })
  }

  req.user = payLoad;

  next();

};
