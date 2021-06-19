import React from 'react';
import Dish from './Dish.jsx'

export default function (props) {
    
    const childLiSummary = <li className='dish-detail__item'>Summary: {props['summary']}</li>
    const childLiRanking = <li className='dish-detail__item'>Ranking: {props['ranking']}</li>
    const childLiHealth = <li className='dish-detail__item'>Health: {props['health']} </li>
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
    
    return (
        <div className="dish-detail__div">
            <h1>
                {props['title']}
            </h1>
            {childUl}

        </div>
    )
}