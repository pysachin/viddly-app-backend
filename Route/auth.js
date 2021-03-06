const config = require('config');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express =  require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/',async (req,res) =>{

    const {error} = validate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');
   
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);

});

function validate(body){

    // Front-End Schema
    const schema = {        
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(3).max(1024).required(),    
    };
    return Joi.validate(body,schema);
}


module.exports = router;