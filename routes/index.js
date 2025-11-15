const router = require("express").Router();


router.get("/", (req, res) => {
    //#swagger.tags=['Hello from Routes']
    res.send("Hello from Routes")
})

router.use('/connection', require('./connection'))
    //swagger tags = ['Friendship Connection']

router.use('/books', require('./books'))
    //swagger tags = ['Books']

module.exports = router