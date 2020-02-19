'use strict'

const path = require('path');
const fs = require('fs');
const mogoosePag = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function saveSong(req, res) {
  let song = new Song();
  const params = req.body;

  song.number = params.number;
  song.name = params.name;
  song.duration = params.duration;
  song.image = params.image;
  song.album = params.album

  if (song.number != 'null' &&
  song.name != 'null' &&
  song.duration != 'null' &&
  song.album != 'null') {
    song.save((err, songStored) => {
      if (err) {
        res.status(500).send({
          message: 'Error to save the Album'
        })
      } else if (!songStored) {
        es.status(404).send({
          message:'The song was not save'
        })
      } else {
        res.status(200).send({
          songStored
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
  saveSong
};
