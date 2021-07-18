const Joi = require('joi');
const mongoose = require('mongoose');

// Create Schema or Table Structure

const genreSchema = new mongoose.Schema({
    name: {
            type:String,
            required:true,
            minlength: 3,
            maxlength: 20 
    }
});

// Create Model
const Genre =  mongoose.model('Genre',genreSchema);

exports.Genre = Genre;
exports.genreSchema = genreSchema;