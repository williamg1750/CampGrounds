const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

//this function is use to clear the db and reseed it
const random = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = await new Campground({
      author: '60ca53c4293e3713b76402b2',
      title: `${random(descriptors)} ${random(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est neque similique eligendi quae, magni consectetur ea vel vitae eveniet ipsam!',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/wgcloud/image/upload/v1624040308/YelpCamp/jktaeppikhk2zqsyosdl.jpg',
          filename: 'YelpCamp/jktaeppikhk2zqsyosdl',
        },
        {
          url: 'https://res.cloudinary.com/wgcloud/image/upload/v1624040308/YelpCamp/wleycsv0ai7aygkzf8tz.jpg',
          filename: 'YelpCamp/wleycsv0ai7aygkzf8tz',
        },
      ],
    });
    await camp.save();
  }
};

//seeds then closes the connection
seedDB().then(() => {
  mongoose.connection.close();
});
