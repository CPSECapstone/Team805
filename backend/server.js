require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Database connection (ensure env variables are set for username/password)
const db = 'mongodb+srv://' + process.env.dbuser + ':' + process.env.dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority';
mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // react app
  credentials: true,
}));

// Routes
app.use(require('./routes/userRoutes'));
app.use(require('./routes/serviceRoutes'));
app.use(require('./routes/authRoutes'));

app.listen(3001, () => console.log('API on port 3001'));
