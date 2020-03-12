'use strict'
//Controlador de usuarios

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt')
const fs = require('fs');
const path = require('path')


function test(req, res){
  res.status(200).send({
    message: 'Testing the controller'
  })
}

function saveUser(req, res){
  let user = new User();
  let params = req.body;

  user.name= params.name;
  user.surname= params.surname;
  user.email= params.email;
  user.role= 'ROLE_USER';
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
  let params = req.body;
  console.log(params);

  let email = params.email;
  let password = params.password

  if (email == undefined) {
    res.status(500).send({
      messge: 'No está el email'
    })
  }
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
          } else if(check != true) {
            res.status(404).send({
              message: 'Contraseña incorrecta'
            })
          } else {
            if (params.gethash) {
              //devolver un token de jwt
              res.status(200).send({
                token: jwt.createToken(user)
              })
            } else {
              res.status(200).send({
                user: user
              })
            }
          }
        })
      }
    }
  })

}

function updateUser(req, res) {
  let userId = req.params.id;
  let update = req.body;

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
  let userID = req.params.id;

  if (req.files) {
    let infoImage = {
      path: req.files.image.path,
      originalName: req.files.name,
      newName: function(){
        let fileSplit = this.path.split('/');
        let fileName = fileSplit[2];
        return fileName
      },
      ext: function() {
        let extSplit = this.newName().split('.');
        let typeExt = extSplit[1];
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
  let imageFile = req.params.imageFile;
  let pathFile = './uploads/users/'+imageFile

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
