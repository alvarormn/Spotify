'use strict'

const path = require('path');
const fs = require('fs');
const mogoosePag = require('mongoose-pagination');

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
      message: 'Input the required data'
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
          artist: artist
        })
      }
    }
  })
}

function getArtists(req, res) {
  let page
  if (req.params.page) {
    page = req.params.page;
  } else {
    page = 1;
  }
  let itemsPerPage = 3;

  Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else {
      if (!artists) {
        res.status(404).send({
          message:'The artists are not exist'
        })
      } else {
        return res.status(200).send({
          total: total,
          page: parseInt(page),
          artists: artists
        })
      }
    }
  })
}

function updateArtist(req, res) {
  const artistID = req.params.id;
  const updateData = req.body;

  Artist.findByIdAndUpdate(artistID, updateData, (err, artistUpdated) => {
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else {
      if (!artistUpdated) {
        res.status(404).send({
          message:'The artists are not exist'
        })
      } else {
        res.status(200).send({
          artist: artistUpdated
        })
      }
    }
  })
}

function deleteArtist(req, res) {
  const artistID = req.params.id;

  Artist.findByIdAndRemove(artistID, (err, artistRemoved) => {
    console.log(artistRemoved)
    if (err) {
      res.status(500).send({
        message:'Request error'
      })
    } else {
      if (!artistRemoved) {
        res.status(404).send({
          message:'The artists are not deleted'
        })
      } else {
        Album.deleteMany({artist: artistRemoved._id}, (err, albumsDeleted) => {
          if (err) {
            res.status(500).send({
              message:'Request error'
            })
          } else {
            if (!albumsDeleted) {
              res.status(404).send({
                message:'The albums are not deleted'
              })
            } else {
              //No está completo ya que falta elimininar
              res.status(200).send({
                message: 'Se borraria el artistia y ekl albun',
              })
            }
          }
        })
      }
    }
  });

        /*Album.deleteMany({artist: artistRemoved._id}, (err, albumsDeleted) => {
            if (err) {
              res.status(500).send({
                message:'Request error'
              })
            } else {
              if (!albumsDeleted) {
                res.status(404).send({
                  message:'The albums are not deleted'
                })
              } else {
                for(album for albumsDeleted){
                  Song.deleteMany({album: album._id})
                }
                Song.deleteMany({album: })
                res.status(200).send({
                  message: 'Artist`s already removed',
                  artist: artistRemoved
                })
              }
            }
        })
      }
    }
  })*/
}

function uploadImage(req, res){
  let artistID = req.params.id;

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
      Artist.findByIdAndUpdate(artistID, {image: infoImage.newName()}, (err, artistUpdated) => {
        if (err) {
          res.status(500).send({
            message: 'Error to update the user'
          })
        } else {
          if (!artistUpdated) {
            res.status(404).send({
              message: 'Not possible to update the user'
            })
          } else {
            res.status(200).send({
              artist: artistUpdated
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
  let pathFile = './uploads/artists/'+imageFile

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
  saveArtist,
  getArtist,
  getArtists,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFile
};
