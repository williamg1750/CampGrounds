const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

consr UserSchema = new Schema({
  email:{
    tpye:String,
    required: true,
    unique: true
  }
})
//and this is going to add on to our schema a user name.
// It's going to add on a field for password.
// It's going to make sure those user names are unique.
// They're not duplicated.
//It's also going to give us some additional methods that we can use.
userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', UserSchema)
