const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

// Create Schema or Table Structure

const userSchema = new mongoose.Schema({
    name: {
            type:String,
            required:true,
            minlength: 3,
            trim:true,
            maxlength: 20 
    },
    email: {
        type:String,
        required:true,
        minlength: 3,
        trim:true,
        maxlength: 255,
        unique:true 
    },
    password: {
        type:String,
        required:true,
        minlength: 3,
        trim:true,
        maxlength: 1024        
    },
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id, isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
    return token;
};

// Create Model
const User =  mongoose.model('User',userSchema);


// Front-End Schema
const schema = {
    name: Joi.string().min(3).max(20).required(),    
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(3).max(1024).required(),
    isAdmin: Joi.boolean().required()   
};


function validateuser(body){
    return Joi.validate(body,schema);
}


module.exports.User = User;
module.exports.validate = validateuser;