const router = require("express").Router();


router.get("/", (req, res) => {
    //#swagger.tags=['Hello from Routes']
    res.send("Hello from Routes")
})

router.use('/connection', require('./connection'))

router.use('/books', require('./books.js'))

module.exports = router