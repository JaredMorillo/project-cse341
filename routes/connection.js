const express = require('express');
const router = express.Router();

const connectionController = require('../controllers/connection');
const validation = require('../middleware/validate');

router.get('/', connectionController.getAll);

router.get('/:id', connectionController.getSingle);

router.post('/', validation.saveConnection, connectionController.createConnection);

router.put('/:id', validation.saveConnection, connectionController.updateConnection);

router.delete('/:id', connectionController.deleteConnection);


module.exports = router;