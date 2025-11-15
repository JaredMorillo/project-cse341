const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getSingleBook);

router.post('/', validation.saveBooks, booksController.createBook);

router.put('/:id', validation.saveBooks, booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;