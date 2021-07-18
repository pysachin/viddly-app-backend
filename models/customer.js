const mongoose = require('mongoose');
const Joi = require('joi');

// Create Schema or Table Structure

const customerSchema = new mongoose.Schema({
    name: {
            type:String,
            required:true,
            minlength: 3,
            maxlength: 20 
    },
    isGold: Boolean,
    phone: {
        type:String,
        required:true,
        minlength: 10,
        maxlength: 10 
    }
});

// Create Model
const Customer =  mongoose.model('Customer',customerSchema);


// Front-End Schema
const schema = {
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(10).max(10).required()
};


function validateCustomer(body){
    return Joi.validate(body,schema);
}


module.exports.Customer = Customer;
module.exports.validate = validateCustomer;