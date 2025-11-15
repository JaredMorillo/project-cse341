const db = require("../database/db");
const { ObjectId } = require('mongodb');

const getAllBooks = async (req, res) => {
    try {
        const lists = await db.getDatabase().collection('books').find().toArray();
        res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error finding your book', error: err.message });
    }
};

const getSingleBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid book id' });
    }
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await db.getDatabase().collection('books').findOne({ _id: bookId });
        if (!result) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error finding book', error: err.message });
    }
};

const createBook = async (req, res) => {
    try {
        const book = {
            genre: req.body.genre,
            title: req.body.title,
            author: req.body.author,
            code: req.body.code,
        };
        const response = await db.getDatabase().collection('books').insertOne(book);
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating book', error: err.message });
    }
};

const updateBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid book id' });
    }
    try {
        const bookId = new ObjectId(req.params.id);
        const book = {
            genre: req.body.genre,
            title: req.body.title,
            author: req.body.author,
            code: req.body.code,
        };
        const response = await db.getDatabase().collection('books').replaceOne({ _id: bookId }, book);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Book not found or no changes made' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};

const deleteBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid book ID" });
    }
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await db.getDatabase().collection('books').deleteOne({ _id: bookId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};

module.exports = { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };
