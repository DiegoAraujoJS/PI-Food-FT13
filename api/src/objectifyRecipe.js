const {Recipe, DietType, RecipeDiet} = require('./db.js');
const {Op} = require('sequelize')

const objectifyRecipe = async function (recipes) {
    if (recipes.length === 0) return [];
    let recipesNew = []

    let dietsXrecipe = await RecipeDiet.findAll() //array de ids de recipes
    //encuentra TODAS las relaciones
    

    // dietsXrecipe = dietsXrecipe.map(row => {
    //     return {
    //         id: row.DietTypeId
    //     }
    // })
    // console.log(dietsXrecipe)
    for (let r of recipes) {
        const relationsOfR = dietsXrecipe.filter(relation => relation.recipeId === r.id)
        console.log(`relations of ${r.name}`,relationsOfR)
        const recipesOfR = relationsOfR.map(relation => relation.DietTypeId)
        const theseDiets = await DietType.findAll({
            where: {id: {
                [Op.or]: recipesOfR
            }}
        })
        const theseDietsNames = theseDiets.map(d => d.name)
        console.log(theseDietsNames)
        const thisSteps = r.steps.map((s,i) => {return {number:i, step:s}})
        recipesNew.push({
            title: r.name,
            id: r.id,
            healthScore: r.healthScore,
            summary: r.extract,
            aggregateLikes: r.score,
            analyzedInstructions: [{steps:thisSteps}],
            image: r.image,
            diets: theseDietsNames
         })
    }
    
    
    // console.log(dietsDB)
    return recipesNew
}

module.exports = objectifyRecipe;