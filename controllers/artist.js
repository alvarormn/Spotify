'use strict'


const path = require('path');
const fs = require('fs');
const mogoosePagination = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function saveArtist(req, res) {
  let artist = new Artist();
  let params = req.body;

  artist.name = params.name;
  artist.description = params.description;
  //artist.image = 'null';
  /*Cuando podamos campturar la imagen del artista hay que añadir tambien la comprobación
  en la condición
  if (artist.name != null && artist.description != null && artist.image != null) {
  */
  if (artist.name != null && artist.description != null) {
    artist.save((err, artistStored) => {
      if (err) {
        res.status(500).send({
          message:'Error to save the artist'
        })
      } else {
        if (!artistStored) {
          res.status(404).send({
            message:'The artist was not save'
          })
        } else {
          res.status(200).send({
            artistStored
          })
        }
      }
    })
  } else {
    res.status(205).send({
      message: 'Introduce los datos requeridos'
    })
  }
}

function getArtist(req, res) {
  let artistID = req.params.id;

  Artist.findById(artistID, (err, artist) => {
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else {
      if (!artist) {
        res.status(404).send({
          message:'The artist is not exist'
        })
      } else {
        res.status(200).send({
          artist
        })
      }
    }
  })
}

function getArtists(req, res) {
  let page = req.params.page;
  let itemsPerPage = 3;


}



module.exports = {
  saveArtist,
  getArtist
};
