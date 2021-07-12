const router = require("express").Router();
const User = require("../models/User.schema");

router.route("/").get(async (req, res) => {
  console.log(req.query);
  try {
    const users = await User.find({ username: req.query.nameId });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/").post(async (req, res) => {
  console.log(req.body.username)
  const newUser = new User({
    username: req.body.username,
    mail: req.body.email
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.route("/getWatchlist/:userid").get((req, res) => {
  User.find({ username: req.params.userid })
    .then((user) => res.json(user))
    .catch((error) => res.status(404).json("Error: " + error));
});

router.route("/addToWatchlist/:userid/:offerid").put((req, res) => {
  //let content = req.body.id;
  var conditions = { username: req.params.userid };
  User.findOneAndUpdate(conditions, {
    $addToSet: {
      watchlist: req.params.offerid,
    },
  }).then((doc) => {
    if (!doc) {
      return res.status(404).end();
    }
    return res.status(200).json(doc);
  });
});

router.route("/deleteFromWatchlist/:userid/:offerid").put((req, res) => {
  console.log("Hier was machen");
  //let content = req.body.id;
  var conditions = { username: req.params.userid };
  User.findOneAndUpdate(conditions, {
    $pull: {
      watchlist: req.params.offerid,
    },
  }).then((doc) => {
    if (!doc) {
      return res.status(409).end();
    }
    return res.status(200).json(doc);
  });
});

module.exports = router;
