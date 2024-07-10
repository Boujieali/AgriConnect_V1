const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Produce = require('../models/produce');

// Listings Page
router.get('/listings', ensureAuthenticated, (req, res) => {
    Produce.find().then(produce => {
        res.render('listings', {
            produce: produce
        });
    });
});

// Request Produce Page
router.get('/request-produce', ensureAuthenticated, (req, res) => res.render('request-produce'));

// Add Produce
router.post('/add-produce', ensureAuthenticated, (req, res) => {
    const { name, description, image } = req.body;
    const newProduce = new Produce({
        name,
        description,
        image
    });

    newProduce.save()
        .then(produce => {
            req.flash('success_msg', 'Produce added successfully');
            res.redirect('/produce/listings');
        })
        .catch(err => console.log(err));
});

// Request Produce
router.post('/request-produce', ensureAuthenticated, (req, res) => {
    const { produce, quantity, deliveryAddress } = req.body;
    // Handle produce request logic here
    req.flash('success_msg', 'Produce requested successfully');
    res.redirect('/produce/listings');
});

module.exports = router;
