const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require('axios');
const fs = require('fs')
const { response } = require('express');
require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json())
server.use(express.json())
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.get('/dishes', async (req, res) => {
  try {
    const dishes = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=ed8a239fc1e74b1fbf39d24f3e82bcf6&number=10')
    var writable = fs.createWriteStream(__dirname+'/recipes.txt')
    
    res.send(dishes)
  } catch (err) {
    console.log(err)
  }
  

})


module.exports = server;
