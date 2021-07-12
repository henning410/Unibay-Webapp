const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Datamodel einer offercard
const OffercardSchema = new Schema({
  //Titel der offercard
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 60,
  },
  //Typ der Anzeige. "Ich suche", oder "Ich biete"
  type: {
    type: String,
    requiered: true,
  },
  //Beschreibung der offercard
  description: {
    type: String,
    required: true,
    minLength: 3,
  },
  //Preisvorschlag der offercard
  price: {
    type: Number,
    required: false,
  },
  //Datum der Erstellung der offercard
  publishDate: {
    type: Date,
    required: true,
    default: new Date().getTime(),
  },
  //Kategorien, in denen die offercard steht
  category: {
    type: String,
    required: false,
  },
  //Tags, mit denen die offercard versehen ist
  tags: {
    type: [String],
    required: false,
  },
  //KeycloakID des Users, der die offercard erstellt hat
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
  },
  photo: {
    type: String,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
  },
});

const Offercard = mongoose.model("Offercard", OffercardSchema);

module.exports = Offercard;
