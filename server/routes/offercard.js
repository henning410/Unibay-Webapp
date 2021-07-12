const router = require("express").Router();
const mongoose = require("mongoose");
const Offercard = require("../models/Offercard.schema");
const passport = require("passport");
const config = require("../config/config");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

//Gibt alle Offercards zurück
router.route("/get").get((req, res) => {
  Offercard.find()
    .then((offercard) => res.json(offercard))
    .catch((error) => res.status(404).json("Error: " + error));
});

router.route("/get/:id").get((req, res) => {
  Offercard.find({ _id: req.params.id })
    .then((offercard) => res.json(offercard))
    .catch((error) => res.status(404).json("Error" + error));
});

router.route("/add").post(upload.single("photo"), (req, res, next) => {
  let newoffercardData = req.body;
  if (req.file) {
    newoffercardData.photo = req.file.filename;
  }
  const newoffercard = new Offercard(req.body);
  newoffercard
    .save()
    .then(() => res.status(201).json(newoffercard))
    .catch((error) => res.status(409).json("Error: " + error));
});

//Löscht eine Offercard abhängig von ihrer ObjectID
router.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Keine Anzeige mit id: ${id}`);
  Offercard.findByIdAndDelete(id).exec();
  res.json({ message: "offercard erfolgreich gelöscht." });
});

//Gibt die Offercards abhängig von ihrem User zurück
router.route("/getown").get((req, res) => {
  Offercard.find({ username: req.query.username })
    .then((offercard) => res.json(offercard))
    .catch((error) => res.status(404).json("Error: " + error));
});

//Gibt die Offercards abhängig von ihrem Typ und ihrem User zurück
router.route("/gettype").get((req, res) => {
  Offercard.find({ type: req.query.type, username: req.query.username })
    .then((offercard) => res.json(offercard))
    .catch((error) => res.status(404).json("Error: " + error));
});

router.route("/getfilter").get((req, res) => {
  var type = req.query.type;
  var categories = req.query.categories;
  if (type !== "" && categories !== undefined) {
    Offercard.find({ type: req.query.type, category: { $in: categories } })
      .then((offercard) => res.json(offercard))
      .catch((error) => res.status(404).json("Error: " + error));
  } else if (type === "" && categories !== undefined) {
    Offercard.find({ category: { $in: categories } })
      .then((offercard) => res.json(offercard))
      .catch((error) => res.status(404).json("Error: " + error));
  } else if (type !== "" && categories === undefined) {
    Offercard.find({ type: req.query.type })
      .then((offercard) => res.json(offercard))
      .catch((error) => res.status(404).json("Error: " + error));
  }
});

router.route("/getOffercards").get((req, res) => {
  var type = req.query.type;
  var categories = req.query.categories;
  console.log(req.query.username)
  if (type !== "" && categories !== undefined) {
    Offercard.find({ type: req.query.type, category: { $in: categories }, username: { $ne: req.query.username } })
      .then((offercard) => res.json(offercard))
      .catch((error) => res.status(404).json("Error: " + error));
  } else if (type === "" && categories !== undefined) {
    Offercard.find({ category: { $in: categories }, username: { $ne: req.query.username } })
      .then((offercard) => res.json(offercard))
      .catch((error) => res.status(404).json("Error: " + error));
  } else if (type !== "" && categories === undefined) {
    Offercard.find({ type: req.query.type, username: { $ne: req.query.username } })
      .then((offercard) => res.json(offercard))
      .catch((error) => res.status(404).json("Error: " + error));
  } else {
    Offercard.find({ username: { $ne: req.query.username } })
      .then((offercard) => res.json(offercard))
      .catch((error) => res.status(404).json("Error: " + error));
  }
});

module.exports = router;
