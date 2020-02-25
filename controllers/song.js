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
  song.file = null;
  song.image = params.image;
  song.album = params.album;

  if (song.number != 'null' &&
  song.name != 'null' &&
  song.duration != 'null' &&
  song.album != 'null') {
    song.save((err, songStored) => {
      if (err) {
        res.status(500).send({
          message: 'Error to save the song'
        })
      } else if (!songStored) {
        res.status(404).send({
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

function getSong(req,res){
  let albumID = req.params.id;

  Song.findById(albumID).populate({path: 'album'}).exec((err, song) => {
    if (err) {
      res.status(500).send({
        message: 'Request error'
      })
    } else if (!song) {
      res.status(404).send({
        message:'The song was not exist'
      })
    } else {
      res.status(200).send({
        song
      })
    }
  })

}

function getSongs(req, res) {
  const albumId = req.params.album;
  let find

  if (!albumId) {
    find = Song.find({}).sort('number');
  } else {
    find = Song.find({album: albumId}).sort('number');
  }

  find.populate({
    path: 'album',
    populate: {
      path: 'artist',
      model: 'Artist'
    }
  }).exec(function(err, songs) {
    if (err) {
      res.status(500).send({
        message: 'Request error'
      })
    } else if (!songs) {
      res.status(404).send({
        message:'The song was not exist'
      })
    } else {
      res.status(200).send({
        songs
      })
    }
  })
}

function updateSong(req, res) {
  const songId = req.params.id;
  const update = req.body;

  Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Request error'
      })
    } else if (!songUpdated) {
      res.status(404).send({
        message:'The song was not exist'
      })
    } else {
      res.status(200).send({
        songUpdated
      })
    }
  })
}

function deleteSong(req, res) {
  const songId = req.params.id;

  Song.findOneAndDelete(songId, (err, songDeleted) => {
    if (err) {
      res.status(500).send({
        message: 'Request error'
      })
    } else if (!songDeleted) {
      res.status(404).send({
        message:'The song was not deleted'
      })
    } else {
      res.status(200).send({
        songDeleted
      })
    }
  })
}

function uploadFile(req, res){
  let songID = req.params.id;

  if (req.files) {
    let infoFile = {
      path: req.files.file.path,
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
    if (infoFile.ext() == 'mp3' || infoFile.ext() == 'ogg') {
      Song.findByIdAndUpdate(songID, {file: infoFile.newName()}, (err, songUpdated) => {
        if (err) {
          res.status(500).send({
            message: 'Error to update the song'
          })
        } else {
          if (!songUpdated) {
            res.status(404).send({
              message: 'Not possible to update the song'
            })
          } else {
            res.status(200).send({
              song: songUpdated
            })
          }
        }
      })
    } else {
      res.status(200).send({
        message: 'Extension is not allowed'
      })
    }

  } else {
    res.status(200).send({
      message: 'The image is not upload'
    })
  }
};

function getSongFile(req, res) {
  let songFile = req.params.songFile;
  let pathFile = './uploads/songs/'+songFile

  fs.exists(pathFile, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(pathFile))
    } else {
      res.status(200).send({
        message: 'Song do not exist'
      })
    }
  })
}




module.exports = {
  saveSong,
  getSong,
  getSongs,
  updateSong,
  deleteSong,
  uploadFile,
  getSongFile
};
