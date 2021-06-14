import React from 'react';
import Dish from './Dish.jsx'

export default function (props) {
    
    const childLiSummary = <li className='dish-detail__item'>Resumen: La de la nona</li>
    const childLiRanking = <li className='dish-detail__item'>Ranking: 3</li>
    const childLiHealth = <li className='dish-detail__item'>Nivel de comida saludable: Rancio</li>
    const childLiPasoAPaso = <ul className='dish-detail__item__recipe'></ul>
    const children = [
        childLiSummary,
        childLiRanking,
        childLiHealth,
        childLiPasoAPaso
    ]
    let childUl = <ul className="dish-detail">
        {children}
    </ul>
    
    const dish = <Dish children={childUl} name={props['name']} url={props['url']} diet={props['diet']}></Dish>
    return (
        dish
    )
}