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

function getAlbum(req, res) {
  let albumID = req.params.id;

  Album.findById(albumID).populate({path: 'artist'}).exec((err, album) => {
  //Album.findById(albumID, (err, album) => {
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else if (!album) {
      res.status(404).send({
        message:'The album is not exist'
      })
    } else {
      res.status(200).send({
        album: album
      })
    }
  })
}

function getAlbums(req,res) {
  const artistID = req.params.artist
  let findAlbums

  let page
  if (req.params.page) {
    page = req.params.page;
  } else {
    page = 1;
  }
  let itemsPerPage = 3;

  if (!artistID) {
    //sacar todos los albunes
    findAlbums = Album.find().sort('title').paginate(page, itemsPerPage);

  } else {
    //Sacar solo los de el artista selecionado.
    findAlbums = Album.find({artist: artistID}).sort('year').paginate(page, itemsPerPage);

  }

  findAlbums.populate({path: 'artist'}).exec((err, albums) => {
  //findAlbums.populate({path: 'artist'}).paginate(page, itemsPerPage, (err, albums, total) => {
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else if (!albums) {
      res.status(404).send({
        message:'The album are not exist'
      })
    } else {

      res.status(200).send({
        total: findAlbums.total,
        page: parseInt(page),
        albums: albums
      })
    }
  })
}

function updateAlbum(req, res) {
  const albumId = req.params.id;
  let update = req.body

  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else if (!albumUpdated) {
      res.status(404).send({
        message:'The album are not exist'
      })
    } else {
      res.status(200).send({
        message: 'The album is already update',
        data: albumUpdated
      })
    }
  })
}

function deleteAlbum(req, res){
  const AlbumId = req.params.id


  Album.findOneAndDelete({_id:AlbumId},(err, albumDeleted) => {
  //Album.deleteMany({albu:AlbumId}, (err, albumDeleted) => {
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else if (!albumDeleted) {
      res.status(404).send({
        message:'The album are not deleted'
      })
    } else {
      Song.deleteMany({album: albumDeleted._id}, (err, songDeleted) => {
        if (err) {
          res.status(500).send({
            message:'Request error'
          })
        } else if (!songDeleted) {
          res.status(404).send({
            message:'The album are not deleted'
          })
        } else {
          console.log({
            Albums:albumDeleted,
            Songs: songDeleted
          });
          res.status(200).send({
            Albums:albumDeleted,
            Songs: songDeleted
          })
        }
      })
    }
  })
}

function uploadImage(req, res){
  let albumID = req.params.id;

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
      Album.findByIdAndUpdate(albumID, {image: infoImage.newName()}, (err, albumUpdated) => {
        if (err) {
          res.status(500).send({
            message: 'Error to update the Album'
          })
        } else {
          if (!albumUpdated) {
            res.status(404).send({
              message: 'Not possible to update the user'
            })
          } else {
            res.status(200).send({
              album: albumUpdated
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
  let pathFile = './uploads/albums/'+imageFile

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
  saveAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFile
};
