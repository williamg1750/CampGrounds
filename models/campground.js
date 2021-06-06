const mongoose = require('mongoose');

//this is just to shorten
const Schema = mongoose.Schema;

//defining the model
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});
//making a schema out of the model
module.exports = mongoose.model('Campground', CampgroundSchema);
