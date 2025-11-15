const express = require('express');
const router = express.Router();

const connectionController = require('../controllers/connection');
const validation = require('../middleware/validate');

/**
 * @route GET /connection
 * @group Friendship Connection
 */
router.get('/', connectionController.getAll);

/**
 * @route GET /connection/{:id}
 * @group Friendship Connection
 */
router.get('/:id', connectionController.getSingle);

/**
 * @route POST /connection
 * @group Friendship Connection
 */
router.post('/', validation.saveConnection, connectionController.createConnection);

/**
 * @route PUT /connection/{:id}
 * @group Friendship Connection
 */
router.put('/:id', validation.saveConnection, connectionController.updateConnection);

/**
 * @route DELETE /connection/{:id}
 * @group Friendship Connection
 */
router.delete('/:id', connectionController.deleteConnection);


module.exports = router;