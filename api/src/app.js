const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require('axios');
const {Op} = require('sequelize')
const NodeCache = require('node-cache')
const myCache = new NodeCache({useClones:false})
myCache.set('recipesDB', [], 14400)
const { Recipe, DietType } = require('./db.js');
const db = require('./db.js');


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

// server.get('/recipes', async (req, res) => {
  
//   let recipesInfo = '';
  
//   if (req.query.addRecipeInformation === 'true') {
//     recipesInfo = '&addRecipeInformation=true'
//   }
//   let recipes = [];
//   if (req.query.name) {
//     let dbRecipe = await Recipe.findAll({where: {
//       name: {
//         [Op.startsWith]: req.query.name
//       }
//     }})
//     recipes.push({id:dbRecipe.id, name: dbRecipe.name, extract: dbRecipe.extract, score: dbRecipe.score, healthScore: dbRecipe.healthScore, steps: dbRecipe.steps})
//     console.log(dbRecipe)
//   }

//   if (recipeCache.length === 0) { 
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=100${recipesInfo}`)
//       recipeCache = [...recipeCache, ...response.data.results]
//       req.query.name ? res.send(recipeCache.filter(dish => dish.title.toLowerCase().includes(req.query.name.toLowerCase()) )) : res.send(recipeCache)

//     } catch(error) {
//       console.log(process.env);
//       res.status(400).send(error)
//     }
//   } else {
//     req.query.name ? res.send(recipeCache.filter(dish => dish.title.toLowerCase().includes(req.query.name.toLowerCase()))) : res.send(recipeCache)
//     console.log('cache')
//   }

//   // axios.get('')
//   // .then(response => res.send(response.data['results']))
//   // .catch(error => console.log(error))
// })


server.get('/recipes', async (req, res) => {
  let howManyRecipesRequest;
  if (!req.query.howManyRecipesRequest) howManyRecipesRequest = 5;
  else howManyRecipesRequest = req.query.howManyRecipesRequest
  let recipesInfo = '';
  
  if (req.query.addRecipeInformation === 'true') {
    recipesInfo = '&addRecipeInformation=true'
  }
  // if (req.query.name) {
  //   let dbRecipe = await Recipe.findAll({where: {
  //     name: {
  //       [Op.startsWith]: req.query.name
  //     }
  //   }})
  //   console.log(dbRecipe)
  //   if (dbRecipe.length !== 0){
  //      recipeCache = [...recipeCache, {id:dbRecipe[dbRecipe.length-1].id, title: dbRecipe[dbRecipe.length-1].name, summary: dbRecipe[dbRecipe.length-1].extract, aggregateLikes: dbRecipe[dbRecipe.length-1].score, healthScore: dbRecipe[dbRecipe.length-1].healthScore, analyzedInstructions: dbRecipe[dbRecipe.length-1].steps, image: dbRecipe[dbRecipe.length-1].image}]
  //      console.log(dbRecipe)
  //   }
    
  //   // summary healthScore aggregateLikes
  // }
  let response;
  console.log('sssssss')
  const cachedResponse = myCache.get('recipes')
  if (!cachedResponse) { 
    console.log('fetching')
    try {
      response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=${howManyRecipesRequest}${recipesInfo}`)
      
      apiRequests = howManyRecipesRequest

      // Este forEach tiene el objetivo de chequear recipes conflictivas (con el mismo id)
      // Si encuentra un id idéntico, lo cambia al mayor de todos los ids. Hace la verificacion
      // de conflictos inmediatamente despues de agregar data
          
      

    } catch(error) {
      console.log(process.env);
      res.status(400).send(error)
    }
  }
    
    if (cachedResponse) {
      console.log('sending from cache')
      res.send({results:[...cachedResponse, ...myCache.get('recipesDB')]})
      
    } else {
      console.log('sending from response')
      res.send({results:[...response['data']['results'], ...myCache.get('recipesDB')]})
      myCache.set('recipes', [...response['data']['results']], 14400)
    }


  // axios.get('')
  // .then(response => res.send(response.data['results']))
  // .catch(error => console.log(error))
})
// server.get('/recipes', async (req, res) => {
  
//   let recipesInfo = '';
  
//   if (req.query.addRecipeInformation === 'true') {
//     recipesInfo = '&addRecipeInformation=true'
//   }
//   let recipes = [];
//   if (req.query.name) {
//     let dbRecipe = await Recipe.findAll({where: {
//       name: {
//         [Op.startsWith]: req.query.name
//       }
//     }})
//     recipes.push({id:dbRecipe.id, name: dbRecipe.name, extract: dbRecipe.extract, score: dbRecipe.score, healthScore: dbRecipe.healthScore, steps: dbRecipe.steps})
//     console.log(dbRecipe)
//   }

//   if (recipeCache.length === 0) { 
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=100${recipesInfo}`)
//       recipeCache.push(response.data)
//       req.query.name ? res.send(recipeCache[0].results.filter(dish => dish.title.toLowerCase().includes(req.query.name.toLowerCase()) )) : res.send(response.data)

//     } catch(error) {
//       console.log(process.env);
//       res.status(400).send(error)
//     }
//   } else {
//     req.query.name ? res.send(recipeCache[0].results.filter(dish => dish.title.toLowerCase().includes(req.query.name.toLowerCase()))) : res.send(recipeCache[0])
//     console.log('cache')
//   }

//   // axios.get('')
//   // .then(response => res.send(response.data['results']))
//   // .catch(error => console.log(error))
// })

server.get ('/recipes/:id', (req, res) => {
  if (! myCache.get('recipesID').some(dish => dish.id == req.params.id)) {

    axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.API_KEY}`)
    .then(response => {
      console.log('request')
      res.send(response.data)
      myCache.set('recipesID', [...myCache.get('recipesID'), response.data], 14400)
      
    })
    .catch(error => {console.log(error); res.status(400).send(error)})
  } else {
    console.log('cache')
    res.send(myCache.get('recipesID').find(dish => dish.id == req.params.id))
  }
})

server.get('/diets', async (req,res) => {
  const diets = await DietType.findAll({attributes: ['id', 'name']});
  res.send(diets)
})

server.post('/recipe', async (req,res) => {
  let recipe = await Recipe.create({
      ...req.body.values
  });
  for (i of req.body.dietidsPayload){
    let diet = await DietType.findByPk(i)
    console.log(diet.dataValues) //id, name, createdAt, updatedAt
    recipe.addDietType(diet)
  }

  let dbRecipes = await Recipe.findAll()

  



  // Este forEach agrega los recipes de la DB al cache. 
  dbRecipes.forEach(async (recipe) => {
    
    if (! myCache.get('recipesDB').some (recipeInCache => recipeInCache.id === recipe.id)) {
      let dbDiets = await RecipeDiet.findAll({where: {recipeId: recipe.id}})

      let thisDiets = await DietType.findAll({where: {id: {[Op.or]: dbDiets.map(row => row.DietTypeId)}}})
      thisDiets = thisDiets.map(obj => obj.dataValues.name)

      myCache.set('recipesDB', [...myCache.get('recipesDB'), {id:recipe.id, title: recipe.name, summary: recipe.extract, aggregateLikes: recipe.score, healthScore: recipe.healthScore, analyzedInstructions: recipe.steps, image: recipe.image, diets: thisDiets}])
    }
  })

  // Este forEach tiene el objetivo de chequear recipes conflictivas (con el mismo id)
  // Si encuentra un id idéntico, lo cambia al mayor de todos los ids.
  let recipesANDrecipesDB = myCache.get('recipes').concat(myCache.get('recipesDB'))
  recipesANDrecipesDB.forEach( (recipe) => {
    if (recipesANDrecipesDB.some (recipeInCache => recipeInCache.id === recipe.id) && recipe !== recipesANDrecipesDB) {
      let ids = recipesANDrecipesDB.map(rec => rec.id)
      ids = ids.sort()
      recipe.id = ids[ids.length-1] + 1
    }
  })
  

  res.send({})
})


module.exports = server;