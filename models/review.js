const mongoose = require('mongoose');

//this is just to shorten
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model('Review', reviewSchema);
