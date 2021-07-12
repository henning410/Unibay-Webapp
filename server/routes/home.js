const router = require('express').Router();

router.route('/').get((req, res) => {
    console.log("Home!")
})

module.exports = router;