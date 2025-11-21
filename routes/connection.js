const express = require('express');
const router = express.Router();

const connectionController = require('../controllers/connection');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

router.get('/', connectionController.getAll);

router.get('/:id', connectionController.getSingle);

router.post('/', auth.isAuthenticated, validation.saveConnection, connectionController.createConnection);

router.put('/:id', auth.isAuthenticated, validation.saveConnection, connectionController.updateConnection);

router.delete('/:id', auth.isAuthenticated, connectionController.deleteConnection);


module.exports = router;