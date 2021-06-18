import React, { useEffect } from 'react'
import Dish from './Dish.jsx'
import {range, sortBy} from 'underscore'
import axios from 'axios'

const Promise = require('bluebird')



export default function Dishes (props) {
    const orderAZ = false;
    const orderByRanking = true;
    
    
    // let dishes =  (async () => {
    //     let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ed8a239fc1e74b1fbf39d24f3e82bcf6&query=pasta&maxFat=25&number=2`)
    //     response = response['data']['results'].map(dish => <Dish name={dish['title']} url={dish['image']} diet='vegano' ranking={dish['id']} />)
    //     console.log(response)
    //     return response
    // })()
    const [dishes, setDishes] = React.useState([])

    React.useEffect(() => {
        const list =  axios.get('http://localhost:3001/dishes')
        .then(response => response['data']['results'])
        .then(data => setDishes(data))
    }
    , [])
      
    
    console.log(dishes)
    // (async () => {
    //     const list = await axios.get('http://localhost:3001/dishes').then(response => response['data']['results'])
    //     setDishes(list)
    // })()
    
    // let dishes = [<Dish name='ensalada rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1} />, <Dish name='torta rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>, <Dish name='zapallo ruso' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>, <Dish name='almeja rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={12}/>, <Dish name='ensalada rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>]
    

    // orderAZ ? setDishes(sortBy(dishes, (dish) => dish.props.name)) : setDishes(dishes); 
    // orderByRanking ? setDishes(sortBy(dishes, (dish) => dish.props.ranking)) : setDishes(dishes); 
    return (
        <div className='dishes'>

            {dishes.map(obj_dish => <Dish name={obj_dish['title']} url={obj_dish['image']} diet='vegano' ranking='1' />)}
            
        </div>

        
    )

    
}