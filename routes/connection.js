const express = require('express');
const router = express.Router();

const connectionController = require('../controllers/connection');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', connectionController.getAll);

router.get('/:id', connectionController.getSingle);

router.post('/', isAuthenticated, validation.saveConnection, connectionController.createConnection);

router.put('/:id', isAuthenticated, validation.saveConnection, connectionController.updateConnection);

router.delete('/:id', isAuthenticated, connectionController.deleteConnection);


module.exports = router;