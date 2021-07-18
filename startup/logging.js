const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){

        
    // Start Handle Unhandled Exceptions

    // Way 1:
    // process.on('uncaughtException',(ex)=>{
    //        winston.error(ex.message,ex);
    //        process.exit(1);
    // });

    // process.on('uncaughtRejection',(ex)=>{  
    //     winston.error(ex.message,ex);
    //     process.exit(1);
    // });

    // Way 2:


    winston.handleExceptions(
        new winston.transports.Console({colorize:true,prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
    );

    process.on('uncaughtRejection',(ex)=>{  
        throw ex;
    });

    // End Handle Unhandled Exceptions



    //throw new Error("error");
    winston.add(winston.transports.File,{filename: 'logfile.log'});
    //winston.add(winston.transports.MongoDb,{db: 'mongodb://localhost/vidly'})


}