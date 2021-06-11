import React from 'react'
import Dish from './Dish.jsx'
import {range, sortBy} from 'underscore'

export default function Dishes (props) {
    const orderAZ = false;
    const orderByRanking = true;
    let dishes = [<Dish name='ensalada rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1} />, <Dish name='torta rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>, <Dish name='zapallo ruso' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>, <Dish name='almeja rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={12}/>, <Dish name='ensalada rusa' url='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/espanol/800x800/ensalada_rusa_recipes_800x800.jpg' diet='vegano' ranking={1}/>]

    orderAZ ? dishes = sortBy(dishes, (dish) => dish.props.name) : dishes = dishes; 
    orderByRanking ? dishes = sortBy(dishes, (dish) => dish.props.ranking) : dishes = dishes; 

    return (
        <div className='dishes'>

            {dishes}
            
        </div>

        
    )
}