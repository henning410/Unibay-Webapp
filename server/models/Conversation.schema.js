const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Datamodel einer offercard
const ConversationSchema = new Schema({
    members: {
        type: Array,
        required: true
    },
    offercardId: {
        type: String
    }
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
