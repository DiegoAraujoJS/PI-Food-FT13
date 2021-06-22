const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require('axios');
const {Op} = require('sequelize')
const storage = require('node-persist');
const {Recipe, DietType} = require('./db.js');
const db = require('./db.js');
const {getSpoonacularRecipes} = require('./spoonacular.js')

// init cache
storage.init();

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


let apiRequests = 0;

server.get('/recipes', async (req, res) => {

    const howManyRecipesRequest = req.query.howManyRecipesRequest || 5;
    const recipesInfo = req.query.addRecipeInformation === 'true' ? '&addRecipeInformation=true' : '';

    let cachedResponse = await getSpoonacularRecipes(howManyRecipesRequest, recipesInfo)

    const dbRecipes = await Recipe.findAll()
    return res.send({results: [...cachedResponse, ...dbRecipes]})
})

server.get('/recipes/:id', (req, res) => {
    if (!cache.get('recipesID').some(dish => dish.id == req.params.id)) {

        axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.API_KEY}`)
            .then(response => {
                console.log('request')
                res.send(response.data)
                cache.set('recipesID', [...cache.get('recipesID'), response.data], 14400)

            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            })
    } else {
        console.log('cache')
        res.send(cache.get('recipesID').find(dish => dish.id == req.params.id))
    }
})

server.get('/diets', async (req, res) => {
    const diets = await DietType.findAll({attributes: ['id', 'name']});
    res.send(diets)
})

server.post('/recipe', async (req, res) => {

    //calcular next id
    const dbIds = await Recipe.findAll().map(r => r.id)
    const apiIds = await getSpoonacularRecipes(1000).map(r => r.id);
    const nextId = [...dbIds, ...apiIds].sort((a, b) => a - b).pop() + 1;


    let recipe = await Recipe.create({
        ...req.body.values, id: nextId
    });
    for (const i of req.body.dietidsPayload) {
        let diet = await DietType.findByPk(i)
        recipe.addDietType(diet)
    }

    res.send({})
})


module.exports = server;