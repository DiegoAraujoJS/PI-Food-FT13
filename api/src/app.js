const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require('axios');
const uuid = require('uuid')
const {Op} = require('sequelize')
const storage = require('node-persist');
const {Recipe, DietType, RecipeDiet} = require('./db.js');
const db = require('./db.js');
const getSpoonacularRecipes = require('./spoonacular.js')
const objectifyRecipe = require('./objectifyRecipe.js');
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

const howManyRecipes = 100

server.get('/recipes', async (req, res) => {

    const howManyRecipesRequest = req.query.howManyRecipesRequest || howManyRecipes;
    const recipesInfo = req.query.addRecipeInformation === 'true' ? '&addRecipeInformation=true' : '';

    let cachedResponse = await getSpoonacularRecipes(howManyRecipesRequest, recipesInfo, res)

    const dbRecipes = await Recipe.findAll()
    
    let dbRecipesWithDiets = []

    dbRecipesWithDiets = await objectifyRecipe(dbRecipes)
    
    let response = [...cachedResponse, ...dbRecipesWithDiets]

    console.log()

    if (req.query.name) response = response.filter(recipe => recipe.title.includes(req.query.name))

    return res.send({results: response})
})

server.get('/recipes/:id', async (req, res) => {
    const cacheKey = `id:${req.params.id}`
    let cachedResponse = await storage.getItem(cacheKey)
    if (!cachedResponse) {
      
      try {

        // console.log(req.params.id, process.env.API_KEY, typeof req.params.id, typeof process.env.API_KEY)

        const response = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.API_KEY}`)
        console.log('fetched')
        cachedResponse = response.data
        await storage.setItem(cacheKey, cachedResponse, {ttl: 1000 * 60 * 60})
        

      } catch (error) {
        return res.status(400).send(error)
      }
    }
    return res.status(200).send(cachedResponse)
})

server.get('/diets', async (req, res) => {
    const diets = await DietType.findAll({attributes: ['id', 'name']});
    res.send(diets)
})

server.post('/recipes', async (req, res) => {

    //calcular next id
    const recipesDB = await Recipe.findAll()
    const recipesAPI = await getSpoonacularRecipes(howManyRecipes, '', res)

    // console.log('DB ',recipesDB, 'API ',recipesAPI)
    // console.log(recipesDB, recipesAPI)
    
    let nextId = [...recipesDB.map(r => r.id), ...recipesAPI.map(r => r.id)].sort().pop() + 1

    // //para solucionar los conflictos de ids, le pasamos el id a la creacion de la receta
    // //en la DB. El id que le pasamos es el máximo + 1 de todos los ids que tengamos hasta ahora,
    // //de esta manera si la DB empieza vacía y traemos todo lo que necesitamos de la API al 
    //principionos aseguramos de que cada recipe tenga un id único
    const theSameRecipe = await Recipe.findAll({where:{name:req.body.values.name}})
    console.log(theSameRecipe)
    

    console.log('creando recipe', nextId)
    let recipe = await Recipe.create({
        ...req.body.values, id: nextId
    });
    let relaciones = await RecipeDiet.findAll()
    // console.log('relaciones sin cambiar', relaciones)

    console.log('payload de ids de dietas', req.body.dietidsPayload)
    for (let i of req.body.dietidsPayload) {
        let diet = await DietType.findByPk(i+1)
        // console.log(diet)
        await recipe.addDietType(diet)
    }
    let relacionesmutadas = await RecipeDiet.findAll()
    // console.log('relaciones cambiadas', relacionesmutadas)
    

    res.send({})
})


module.exports = server;