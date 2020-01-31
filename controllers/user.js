'use strict'
//Controlador de usuarios

function pruebas(req, res){
  res.status(200).send({
    message: 'Testing the controller'
  })
}

module.exports = {
  pruebas
};
