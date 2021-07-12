const router = require('express').Router();
const saml = require('passport-saml');
const passport = require('passport');
router.route('/', passport.authenticate('samlStrategy', { successRedirect: '/home', failureRedirect: '/auth/fail' })).get((req, res) => {
    console.log("Login!");
});

router.route('/callback', passport.authenticate('samlStrategy', { failureRedirect: '/auth/fail' })).post((req, res, next) => {
    console.log('SSO Login ################', req.user);
    res.redirect('/saml');
});

module.exports = router

