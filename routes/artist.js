'use strict'

const express = require('express');
const ArtistCtrl = require('../controllers/artist');
const api = express.Router();
const md_auth = require('../middlewares/authenticate');

api.get('/getArtist/:id', md_auth.ensureAuth, ArtistCtrl.getArtist);
api.post('/registerArtist', md_auth.ensureAuth, ArtistCtrl.saveArtist);

module.exports = api;
