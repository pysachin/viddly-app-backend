const {Movie,validate} = require('../models/movie');
const mongoose = require('mongoose');
const express =  require('express');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/', async (req,res) =>{
    const movies = await Movie.find().sort('title');  
    res.send(movies);
});

router.get('/:id', async (req,res) =>{

    const movie = await Movie.findById(req.params.id.toString());
    
    if(!movie) 
    res.status(404).send('The Movie not found');
    else
    res.send(movie);

});


router.post('/',async (req,res) =>{

    const {error} = validate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const genre = await Genre.findById(req.body.genreId);

    if(!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({  
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });

    try{        
        movie = await movie.save();        
        res.send(movie);
    }
    catch(ex){
        
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
        res.status(400).send('Server Error !!!');
    }

});

router.put('/:id',async (req,res) =>{
    
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        {new: true});

    if(!movie) {
        return res.status(404).send('The Movie id not found');    
    }

    res.send(movie);

});

router.delete('/:id',async (req,res) =>{

    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if(!movie) {
    return res.status(404).send('The Movie id not found');    
    }    

    res.send(movie);
});



module.exports = router;