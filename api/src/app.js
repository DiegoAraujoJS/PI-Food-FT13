const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require('axios');
const fs = require('fs')
const Promise = require('bluebird')

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
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

let recipeCache = []

server.get('/dishes', (req, res) => {
  
  let recipesInfo = '';
  let recipeInfo = '';
  if (req.query.addRecipeInformation === 'true') {
    recipesInfo = '&addRecipeInformation=true'
  }
  if (recipeCache.length === 0) { 
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=20${recipesInfo}`)
    .then(response => {
      recipeCache.push(response['data'])
      res.send(response['data'])
    })
    .catch(error => {
      console.log(process.env);
      res.status(400).send(error)
    })
  } else {
    res.send(recipeCache[0])
  }

  // axios.get('')
  // .then(response => res.send(response['data']['results']))
  // .catch(error => console.log(error))
})
let informationCache = []
server.get ('/dishes/:id', (req, res) => {
  if (! informationCache.some(dish => dish['id'] == req.params.id)) {

    axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.API_KEY}`)
    .then(response => {
      console.log('request')
      informationCache.push(response['data'])
      res.send(response['data'])
      
    })
    .catch(error => {console.log(error); res.status(400).send(error)})
  } else {
    console.log('cache')
    res.send(informationCache.find(dish => dish['id'] == req.params.id))
  }
})


module.exports = server;