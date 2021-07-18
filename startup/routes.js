const generes = require('../Route/genres');
const customers = require('../Route/customers');
const movies = require('../Route/movies');
const rentals = require('../Route/rentals');
const users = require('../Route/users');
const auth = require('../Route/auth');
const express =  require('express');
const error = require('../Middleware/error');

module.exports = function(app) {
    //Express Middleware
    app.use(express.json());
    app.use('/api/generes',generes);
    app.use('/api/customers',customers);
    app.use('/api/movies',movies);
    app.use('/api/rentals',rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use(error);
}