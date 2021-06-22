const storage = require('node-persist');
const axios = require('axios');
const getSpoonacularRecipes = async (howManyRecipesRequest, recipesInfo) => {
    const cacheKey = `recipes-${howManyRecipesRequest}-${recipesInfo}`;

    let cachedResponse = await storage.getItem(cacheKey)
    if (!cachedResponse) {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=${howManyRecipesRequest}${recipesInfo}`)
            cachedResponse = response.data.results;
            await storage.setItem(cacheKey, cachedResponse, {ttl: 1000 * 60 * 60});

        } catch (error) {
            console.log(process.env);
            return res.status(400).send(error)
        }
    }
    return cachedResponse;
};
module.exports.getSpoonacularRecipes = getSpoonacularRecipes;