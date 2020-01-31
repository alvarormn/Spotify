'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
  name: String,
  description: String,
  image: String
});

module.export = mongodb.model('Artist', ArtistSchema)
