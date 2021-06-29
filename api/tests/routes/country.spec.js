/* eslint-disable import/no-extraneous-dependencies */
const { expect, should } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const axios = require('axios');




const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};


describe('POST /recipes', () => {
  before (async () => {
    response = await axios.post('http://localhost:3001/recipes', {values: {
    name:'milanesa',
    extract:'frita',
    score:4,
    healthScore:2,
    steps:['a', 'b'], 
    image: "https://spoonacular.com/recipeImages/715594-312x231.jpg" }, dietidsPayload:[1,4]})

  })
  it("shoud respond with a 200 status", async () => {
    // console.log(response)
    expect(response.status).equal(200)
  })
})

  

describe('GET /recipes',  () => {
  before(async()=>{
    response = await axios.get ('http://localhost:3001/recipes?howManyRecipesRequest=10&addRecipeInformation=true')
  })
  it ("should respond with a 200 status", async () => {
    
    expect(response.status).equal(200)
  })
  it ("should save 10 elements on an array", async() => {
    
    // console.log(response.data.results)
    expect(response.data.results.length).equal(11) //las 10 que pide mas la milanesa
    
  })
  it ("should have the following properties: id, title, aggregateLikes, analyzedInstrucions, healthScore, summary, diets, image", () => {
    let check = true;

    const fundamental = ['id', 'title', 'aggregateLikes', 'analyzedInstructions', 'healthScore', 'summary', 'diets', 'image']

    response.data.results.forEach ( recipe => {
      let keys = Object.keys(recipe)
      fundamental.forEach(key => {
        if (! keys.some(k => k === key)) {
          console.log ('flawed', recipe.id, key)
          check = false
        }
      })
      
    })

    expect(check).equal(true, `found  without some properties`)
  })
})
describe('GET /recipes:id', () => {
  before (async () => {
    response = await axios.get('http://localhost:3001/recipes/715540')
  })
  it("should have save one recipe of type Object", () => {
    expect(typeof response).equal('object')
  })
  
})

