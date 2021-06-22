const storage = require('node-persist');
const axios = require('axios');

const getSpoonacularRecipes = async (howManyRecipesRequest, recipesInfo, res) => {
    const cacheKey = `recipes-${howManyRecipesRequest}-${recipesInfo}`;

    let cachedResponse = await storage.getItem(cacheKey)
    if (!cachedResponse) {
        console.log('fetching from api')
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=${howManyRecipesRequest}${recipesInfo}`)
            cachedResponse = response.data.results;
            console.log(cachedResponse)
            await storage.setItem(cacheKey, cachedResponse, {ttl: 1000 * 60 * 60});

        } catch (error) {
            return res.status(400).send(error)
        }
    }
    return cachedResponse;
};
module.exports = getSpoonacularRecipes;