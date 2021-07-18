
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {        
    // Connect With Mongo DB
    const db = config.get('db');
    mongoose.connect(db)
    .then(() => { winston.info(`Connect To ${db}...`); });
}