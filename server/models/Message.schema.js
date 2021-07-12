const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var MessageSchmema = new Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date().getTime(),
  }
});

module.exports = mongoose.model("Message", MessageSchmema);
