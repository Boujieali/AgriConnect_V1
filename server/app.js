const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const produceRoutes = require('./routes/produce');

const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Static folder
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);
app.use('/produce', produceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
