const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));// Parses HTML form data
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'session-key-for-testing',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Routes
const indexRoutes = require('./routes/index');
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', indexRoutes);
app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;