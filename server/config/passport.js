// const fs = require('fs');
// const passport = require('passport');
// const saml = require('passport-saml');
// const config = require('./config');




// passport.serializeUser((expressUser, done) => {
//     console.log(expressUser, 'Serialize User');
//     done(null, expressUser);
// });

// passport.deserializeUser((expressUser, done) => {
//     console.log(expressUser, 'Deserialize User');

//     done(null, expressUser);
// });

// passport.use(
//     new saml.Strategy(
//         {
//             issuer: config.saml.issuer,
//             protocol: 'http://',
//             path: '/login/callback',
//             entryPoint: config.saml.entryPoint,
//             cert: fs.readFileSync(config.saml.cert, 'utf-8')
//         },

//     )
// );