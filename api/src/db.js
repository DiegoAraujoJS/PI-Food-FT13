const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
})

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Recipe, DietType, recipexdiet} = sequelize.models;

// Aca vendrian las relaciones
// Recipe.belongsTo(DietType);
// DietType.hasMany(Recipe);



const bootstrap = async () => {
    ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "pescatarian", "fodmap friendly", "whole 30"]
        .forEach(type => {
            DietType.create({name: type})
        })
}

// Recipe.belongsTo(DietType)
// DietType.hasMany(Recipe)

RecipeDiet = sequelize.define('recipexdiet', {
  role: Sequelize.STRING
})

Recipe.belongsToMany(DietType, {through: RecipeDiet})
DietType.belongsToMany(Recipe,{through: RecipeDiet})




module.exports = {
    ...sequelize.models,
    conn: sequelize,
    bootstrap
};