
const express =  require('express');
const app = express();
const winston = require('winston');

require('./startup/validation')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(3000, () => winston.info(`listening on port ${port}`));

module.exports = server;