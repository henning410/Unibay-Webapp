const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const saml = require("passport-saml");

const config = require("./config/config");
const Serializer = require("./config/passport");
const http = require("http");

const offercardRoute = require("./routes/offercard");
const userRoute = require("./routes/user");
const conversationRoute = require("./routes/Conversation");
const messageRoute = require("./routes/Message");


const router = express();

/** Parse the body of the request / Passport */
router.use(session(config.session));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.urlencoded({ extended: false })); // Replaces Body Parser
router.use(express.json()); // Replaces Body Parser
router.use(cors());

router.use("/offercard", offercardRoute);
router.use("/user", userRoute);

router.use("/conversation", conversationRoute);
router.use("/message", messageRoute);

// *Server Handling
const httpServer = http.createServer(router);

// * Request Logging
router.use((req, res, next) => {
  console.log(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    console.log(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Rules of our API */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  console.log(req.header("origin"));
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// * Serving static files from images folder
router.use("/uploads", express.static("images"));

/ *SAML Configuration */;
//TODO: Diesen Teil in config/passport.js auslagern

const savedUsers = [];

const CALLBACK_URL = `http://localhost:5000/login/callback`;
const ISSUER = "uniBuy";

// passed as option to docker
const ENTRY_POINT = "http://localhost:8080/auth/realms/hse/protocol/saml";

const publicKey = fs.readFileSync(__dirname + "/certs/server.crt", "utf8");
const privateKey = fs.readFileSync(__dirname + "/certs/key.pem", "utf8");

const saml_options = {
  callbackUrl: CALLBACK_URL,
  issuer: ISSUER,
  entryPoint: ENTRY_POINT,
  identifierFormat: null,
  // The decryptionPvK and privateCert both refer to the local private key
  // downloaded from keycloak - client - SAML keys - export (format: pks12)
  privateCert: privateKey,
  decryptionPvk: privateKey,

  // IDP public key from the servers meta data
  cert: fs.readFileSync(__dirname + "/certs/idp_cert.pem", "utf8"),
  validateInResponseTo: false,
  disableRequestedAuthnContext: true,
};

const samlStrategy = new saml.Strategy(saml_options, (expressUser, done) => {
  if (!savedUsers.includes(expressUser)) {
    savedUsers.push(expressUser);
  }

  return done(null, expressUser);
});
passport.use("samlStrategy", samlStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/ * Passport & SAML Routes */;
// TODO: Refactoring in Router Struktur wie bei MERN Stack Tutorial
router.get(
  "/login",
  passport.authenticate("samlStrategy", config.saml.options),
  (req, res, next) => {
    return res.redirect("http://localhost:3000");
  }
);

router.post(
  "/login/callback",
  passport.authenticate("samlStrategy", config.saml.options),
  (req, res, next) => {
    console.log(res);
    return res.redirect("http://localhost:3000");
  }
);

router.get("/whoami", (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("User not authenticated");

    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    console.log("User authenticated");
    console.log(req.user);

    return res.status(200).json({ user: req.user });
  }
});

/** Health Check */
router.get("/healthcheck", (req, res, next) => {
  return res.status(200).json({ messgae: "Server is running!" });
});

/ * Error handling */;
router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

httpServer.listen(config.server.port, () =>
  console.log(`Server is running on port ${config.server.port}`)
);

// * Mongo Connection
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


