const {Customer,validate} = require('../models/customer');
const mongoose = require('mongoose');
const express =  require('express');
const router = express.Router();


router.get('/', async (req,res) =>{
    const customers = await Customer.find().sort('name');  
    res.send(customers);
});

router.get('/:id', async (req,res) =>{

    const customer = await Customer.findById(req.params.id.toString());
    
    if(!customer) 
    res.status(404).send('The customer not found');
    else
    res.send(customer);

});


router.post('/',async (req,res) =>{

    const {error} = validate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    let customer = new Customer({  
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    });

    try{        
        customer = await customer.save();        
        res.send(customer);
    }
    catch(ex){
        
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
        res.status(400).send('Server Error !!!');
    }

});

router.put('/:id',async (req,res) =>{

    // const {error} = validateCustomer(req.body);

    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }

    const customer = await Customer.findByIdAndUpdate(req.params.id,{name: req.body.name},
        {new: true});

    if(!customer) {
        return res.status(404).send('The Customer id not found');    
    }

    res.send(customer);

});

router.delete('/:id',async (req,res) =>{

    const customer = await Customer.findByIdAndRemove(req.params.id);
  
    if(!customer) {
    return res.status(404).send('The Customer id not found');    
    }    

    res.send(customer);
});



module.exports = router;