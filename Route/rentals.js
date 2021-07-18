const {Rental,validate} = require('../models/rental');
const mongoose = require('mongoose');
const express =  require('express');
const { Genre } = require('../models/genre');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const router = express.Router();
const Fawn = require('fawn');


Fawn.init(mongoose);

router.get('/', async (req,res) =>{
    const rental = await Rental.find().sort('-dateOut');  
    res.send(rental);
});

router.get('/:id', async (req,res) =>{

    const movie = await Rental.findById(req.params.id.toString());
    
    if(!movie) 
    res.status(404).send('Rental not found');
    else
    res.send(movie);

});


router.post('/',async (req,res) =>{

    const {error} = validate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie.');

    if(movie.numberInStock === 0) return res.status(400).send('Movie Not In Stock');

    let rental = new Rental({  
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });

    try{        

        // Transaction
        new Fawn.Task()
                .save('rentals',rental)
                .update('movies',{_id: movie._id},{
                    $inc: {numberInStock: -1}
                })
                .run();
        
        // Without Transaction
        // result = await rental.save();     
        
        // movie.numberInStock--;
        // await movie.save();

        
        res.send(rental);
    }
    catch(ex){
        
        let msg = [];

        for(field in ex.errors){
            msg.push(ex.errors[field].message);
            console.log(ex.errors[field].message);
        }
        msg.push(ex);
        res.status(400).send(msg.join(","));
    }

});

router.put('/:id',async (req,res) =>{
    
    const movie = await Rental.findByIdAndUpdate(req.params.id,
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

    const movie = await Rental.findByIdAndRemove(req.params.id);
  
    if(!movie) {
    return res.status(404).send('The Movie id not found');    
    }    

    res.send(movie);
});



module.exports = router;