const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const produceRoutes = require('./routes/produce');

app.use('/api/auth', authRoutes);
app.use('/api/produce', produceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
