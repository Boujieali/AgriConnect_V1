const express = require('express');
const { addProduce, getAllProduce } = require('../models/produce');

const router = express.Router();

router.post('/add', (req, res) => {
    const { produceName, description, price } = req.body;
    try {
        addProduce(produceName, description, price, (err, produce) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ message: 'Produce added' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', (req, res) => {
    try {
        getAllProduce((err, produce) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(produce);
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
