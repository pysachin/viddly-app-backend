const interceptorAuth = require('../Middleware/interceptor');
const asyncMiddleWare = require('../Middleware/async');
const admin = require('../Middleware/admin');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express =  require('express');
const router = express.Router();
const Joi = require('joi');
const validateObjectId = require('../Middleware/validateObjectId');

router.get('/', async (req,res) =>{  
    const genres = await Genre.find().sort('name');  
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req,res) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid Id.')
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) 
    res.status(404).send('The genere not found');
    else
    res.send(genre);

});

router.post('/',interceptorAuth,async (req,res) =>{

    const schema = {
        name: Joi.string().min(3).required()
    };

    const {error} = Joi.validate(req.body,schema);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    
    let genre = new Genre({  
        name:req.body.name
    });

    try{
        //course.validate() ## validate before save
        genre = await genre.save();
        //console.log(result);
        res.send(genre);
    }
    catch(ex){
        //console.log(ex.message);

        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
        res.status(400).send('Server Error !!!');
    }

});

router.put('/:id',async (req,res) =>{

    const schema = {
        name: Joi.string().min(3).required()
    };

    const {error} = Joi.validate(req.body,schema);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},
        {new: true});

    if(!genre) {
        return res.status(404).send('The genre id not found');    
    }

    res.send(genre);

});

router.delete('/:id',[interceptorAuth,admin],async (req,res) =>{

    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if(!genre) {
    return res.status(404).send('The genre id not found');    
    }    

    res.send(genre);
});



module.exports = router;