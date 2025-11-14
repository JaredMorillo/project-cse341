const db = require("../database/db");
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const lists = await db.getDatabase().collection('connection').find().toArray();
        res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching connection', error: err.message });
    }
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid friend id' });
    }
    try {
        const connectionId = new ObjectId(req.params.id);
        const result = await db.getDatabase().collection('connection').findOne({ _id: connectionId });
        if (!result) return res.status(404).json({ message: 'Friend not found' });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching Connection', error: err.message });
    }
};

const createConnection = async (req, res) => {
    try {
        const connection = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            city: req.body.city,
            country: req.body.country,
            instagram: req.body.instagram,
            facebook: req.body.facebook
        };
        const response = await db.getDatabase().collection('connection').insertOne(connection);
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating connection', error: err.message });
    }
};

const updateConnection = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid Connection id' });
    }
    try {
        const connectionId = new ObjectId(req.params.id);
        const connection = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            city: req.body.city,
            country: req.body.country,
            instagram: req.body.instagram,
            facebook: req.body.facebook
        };
        const response = await db.getDatabase().collection('connection').replaceOne({ _id: connectionId }, connection);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Connection not found or no changes made' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating Connection', error: err.message });
    }
};

const deleteConnection = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid Connection ID" });
    }
    try {
        const connectionId = new ObjectId(req.params.id);
        const result = await db.getDatabase().collection('connection').deleteOne({ _id: connectionId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Connection deleted successfully' });
        } else {
            res.status(404).json({ message: 'Connection not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting Connection', error: err.message });
    }
};

module.exports = { getAll, getSingle, createConnection, updateConnection, deleteConnection };
