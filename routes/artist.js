'use strict'

const express = require('express');
const ArtistCtrl = require('../controllers/artist');
const api = express.Router();
const md_auth = require('../middlewares/authenticate');

api.get('/getArtist/:id', md_auth.ensureAuth, ArtistCtrl.getArtist);
api.post('/registerArtist', md_auth.ensureAuth, ArtistCtrl.saveArtist);
api.get('/getArtists/:page?', md_auth.ensureAuth, ArtistCtrl.getArtists);
api.put('/updateArtist/:id', md_auth.ensureAuth, ArtistCtrl.updateArtist);
api.delete('/deleteArtist/:id', md_auth.ensureAuth, ArtistCtrl.deleteArtist);

module.exports = api;
