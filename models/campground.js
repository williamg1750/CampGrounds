const mongoose = require('mongoose');
const Review = require('./review');
//this is just to shorten
const Schema = mongoose.Schema;

//defining the model
const ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.remove({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

//making a schema out of the model
module.exports = mongoose.model('Campground', CampgroundSchema);
