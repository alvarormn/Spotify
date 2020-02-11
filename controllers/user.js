'use strict'
//Controlador de usuarios

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt')
var fs = require('fs');
var path = require('path')


function test(req, res){
  res.status(200).send({
    message: 'Testing the controller'
  })
}

function saveUser(req, res){
  var user = new User();
  var params = req.body;

  user.name= params.name;
  user.surname= params.surname;
  user.email= params.email;
  user.role= 'ROLE_ADMIN';
  user.image= 'null';

  //Encriptar contraseña, revisar datos no null y guardar datos
  if (params.password) {
    console.log(user)
    bcrypt.hash(params.password,null,null,function(err,hash){
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null) {
        //guardar el usuarios
        user.save((err,userStored) => {
          if (err) {
            res.status(500).send({
              message: 'Error a guardar el usuario'
            })
          } else {
            if (!userStored) {
              res.status(404).send({
                message: 'No se ha registrado el usuario'
              })
            } else {
              res.status(200).send({
                user: userStored
              })
            }
          }
        })
      } else {
        res.status(205).send({
          message: 'Introduce los datos requeridos'
        })
      }
    })
  } else {
    res.status(205).send({
      message: 'Introduce la contraseña'
    })
  }
}

function loginUser(req, res) {
  var params = req.body;

  var email = params.email;
  var password = params.password

  User.findOne({email: email.toLowerCase()}, (err, user) => {
    if (err) {
      res.status(500).send({
        messge: 'Error en la petición'
      })
    } else {
      if (!user) {
        res.status(404).send({
          message: 'El usuario no existe'
        })
      } else {
        //Comprobar la contraseña
        bcrypt.compare(password, user.password, function(err, check) {
          if(err){
            res.status(404).send({
              message: 'No se ha podido logear el usuario'
            })
          } else {
            if (params.gethash) {
              //devolver un token de jwt
              res.status(200).send({
                token: jwt.createToken(user)
              })
            } else {
              res.status(200).send({user})
            }
          }
        })
      }
    }
  })

}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Error to update the user'
      })
    } else {
      if (!userUpdated) {
        res.status(404).send({
          message: 'Not possible to update the user'
        })
      } else {
        res.status(200).send({
          user: userUpdated
        })
      }
    }
  })
};

function uploadImage(req, res){
  var userID = req.params.id;

  if (req.files) {
    var infoImage = {
      path: req.files.image.path,
      originalName: req.files.name,
      newName: function(){
        var fileSplit = this.path.split('/');
        var fileName = fileSplit[2];
        return fileName
      },
      ext: function() {
        var extSplit = this.newName().split('.');
        var typeExt = extSplit[1];
        return typeExt
      }
    }

    if (infoImage.ext() == 'png' || infoImage.ext() == 'jpg' || infoImage.ext() == 'gif') {
      User.findByIdAndUpdate(userID, {image: infoImage.newName()}, (err, userUpdated) => {
        if (err) {
          res.status(500).send({
            message: 'Error to update the user'
          })
        } else {
          if (!userUpdated) {
            res.status(404).send({
              message: 'Not possible to update the user'
            })
          } else {
            res.status(200).send({
              user: userUpdated
            })
          }
        }
      })
    } else {
      res.status(200).send({
        message: 'Extension is not allowed'
      })
    }

    console.log(infoImage.ext);

  } else {
    res.status(200).send({
      message: 'The image is not upload'
    })
  }
};

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var pathFile = './uploads/users/'+imageFile

  fs.exists(pathFile, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(pathFile))
    } else {
      res.status(200).send({
        message: 'Image do not exist'
      })
    }
  })
}

module.exports = {
  test,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
};
