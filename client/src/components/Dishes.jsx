import React, { useEffect } from 'react'
import Dish from './Dish.jsx'
import {range, sortBy} from 'underscore'
import axios from 'axios'
import {connect} from 'react-redux'
const Promise = require('bluebird')

function myReduce (array) {
    if (array.length !== 0) {
        console.log(array)
        return array.reduce((acum, dietName) => acum+dietName)
    } else {
        return ''
    }
    
}

function Dishes (props) {
    const orderAZ = false;
    const orderByRanking = true;
    
    
    // let dishes =  (async () => {
    //     let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ed8a239fc1e74b1fbf39d24f3e82bcf6&query=pasta&maxFat=25&number=2`)
    //     response = response['data']['results'].map(dish => <Dish name={dish['title']} url={dish['image']} diet='vegano' ranking={dish['id']} />)
    //     console.log(response)
    //     return response
    // })()
    let [dishes, setDishes] = React.useState([])
    React.useEffect(() => {
        const list =  axios.get('http://localhost:3001/dishes?addRecipeInformation=true')
        .then(response => response['data']['results'])
        .then(data => setDishes(data))
        .catch(err => console.log(err))

        const someInfo = axios.get(`http://localhost:3001/dishes/975070`)

    }
    , [])

      
    
    // (async () => {
    //     const list = await axios.get('http://localhost:3001/dishes').then(response => response['data']['results'])
    //     setDishes(list)
    // })()
    
    // let dishes = [<Dish name='ensalada rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1} />, <Dish name='torta rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>, <Dish name='zapallo ruso' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>, <Dish name='almeja rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={12}/>, <Dish name='ensalada rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>]
    
    console.log(dishes)
    props.orderAZ ? dishes = sortBy(dishes, (dish) => dish['title']) : dishes = dishes; 
    // props.orderRanking ? setDishes(sortBy(dishes, (dish) => dish.props.)) : setDishes(dishes); 
    return (
        <div className='dishes'>

            {dishes.map(obj_dish => <Dish name={obj_dish['title']} url={obj_dish['image']} diet={myReduce(obj_dish['diets'])} ranking={obj_dish['aggregateLikes']} />)}
            
        </div>

        
    )

    
}
function mapStateToProps(state) {
    return {
        searchInput: state.searchInput,
        orderAZ: state.orderAZ,
        orderRanking: state.orderRanking
    }
}
export default connect(mapStateToProps)(Dishes)