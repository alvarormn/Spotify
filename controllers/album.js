'use strict'

const path = require('path');
const fs = require('fs');
const mogoosePag = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function saveAlbum(req, res) {
  let album = new Album();
  const params = req.body;

  album.title = params.title;
  album.description = params.description;
  album.year = params.year;
  album.image = params.image;
  album.artist = params.artist

  if (album.title != 'null' &&
  album.description != 'null' &&
  album.year != 'null' &&
  album.artist != 'null') {
    album.save((err, albumStored) => {
      if (err) {
        res.status(500).send({
          message: 'Error to save the Album'
        })
      } else if (!albumStored) {
        es.status(404).send({
          message:'The album was not save'
        })
      } else {
        res.status(200).send({
          albumStored
        })
      }
    })
  } else {
    res.status(205).send({
      message: 'Input the required data'
    })
  }
}

module.exports = {
  saveAlbum
};
