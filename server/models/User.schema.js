const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Datamodel eines Users
const UserSchema = new Schema({
  //Name des Users, der anderen angezeigt wird
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8,
  },
  //E-Mailadresse des Users
  mail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 24,
  },
  //Vorname des Users
  firstName: {
    type: String,

    unique: false,
    trim: true,
    minlength: 2,
  },
  //Nachname des Users
  lastName: {
    type: String,

    unique: false,
    trim: true,
    minlength: 2,
  },
  //Profilbild des Users
  photo: {
    type: String,
    required: false,
  },
  //Merkliste des Users
  watchlist: {
    type: [String],
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
