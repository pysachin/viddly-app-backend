const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

// Create Schema or Table Structure

const movieSchema = new mongoose.Schema({
    title: {
            type:String,
            required:true,
            minlength: 3,
            trim:true,
            maxlength: 20 
    },
    genre:{type:genreSchema,required:true},
    numberInStock:{ type: Number, required:true, min: 0, max:5,default:0 },
    dailyRentalRate:{ type: Number, required:true, min: 0, max:255, default:0 }
});

// Create Model
const Movie =  mongoose.model('Movie',movieSchema);


// Front-End Schema
const schema = {
    title: Joi.string().min(3).max(20).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(5).required(),
    dailyRentalRate: Joi.number().required()
};


function validateMovie(body){
    return Joi.validate(body,schema);
}


module.exports.Movie = Movie;
module.exports.validate = validateMovie;