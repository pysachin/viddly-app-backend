const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
            type:String,
            required:true,
            minlength: 3,
            maxlength: 20 
    },   
    phone: {
        type:String,
        required:true,
        minlength: 10,
        maxlength: 10 
    }
});

const movieSchema = new mongoose.Schema({
    title: {
            type:String,
            required:true,
            minlength: 3,
            trim:true,
            maxlength: 20 
    },
    dailyRentalRate:{ type: Number, required:true, min: 0, max:255, default:0 }
});

const rentalSchema = new mongoose.Schema({
    customer:{type:customerSchema,required:true},
    movie:{type:movieSchema,required:true},
    dateOut:{type:Date,required:true,default:Date.now},
    dateReturned:{type:Date},
    rentalFee:{type:Number,min:0}
});

const Rental =  mongoose.model('Rental',rentalSchema);

// Front-End Schema
const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
};

function validateRental(body){
    return Joi.validate(body,schema);
}


exports.Rental = Rental;
exports.validate = validateRental;