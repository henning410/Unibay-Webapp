const router = require("express").Router();
const Conversation = require("../models/Conversation.schema");

//new concv
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
        offercardId: req.body.offercardId
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get cov of user
router.get("/:user", async (req, res) => {

    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.user] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
})

//get Conv by Offercard
router.get("/byoid/:offercardId", async (req, res) => {

    try {
        const conversation = await Conversation.find({ offercardId: req.params.offercardId });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

//search for conversation of two users
//get cov of user
router.get("/:user1/:user2", async (req, res) => {

    try {
        const conversation = await Conversation.find({
            $and: [{
                members: { $in: [req.params.user1] }
            }, { members: { $in: [req.params.user2] } }],
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})


module.exports = router;