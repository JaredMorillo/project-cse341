const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
    //#swagger.tags=['Hello from Routes']
    res.send("Hello from Routes")
});

router.use('/connection', require('./connection'));

router.use('/books', require('./books'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next){
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router