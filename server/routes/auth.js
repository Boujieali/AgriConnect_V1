const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register Page
router.get('/signup', (req, res) => res.render('signup'));

// Register
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    let errors = [];

    if (!username || !email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('signup', {
            errors,
            username,
            email,
            password
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('signup', {
                    errors,
                    username,
                    email,
                    password
                });
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/auth/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/produce/listings',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
});

// Forgot Password Page
router.get('/forgot-password', (req, res) => res.render('forgot-password'));

// Forgot Password
router.post('/forgot-password', (req, res) => {
    // Handle forgot password logic here
});

module.exports = router;
