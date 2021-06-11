import React from 'react'

export default function Dish (props) {
    return (
        <div className="dish">
            <h2 className="dish__h2">{props['name']}</h2>
            <img className="dish__img" src={props['url']} width='100' height='100'/>
            <h5 className="dish__h5">{props['diet']}</h5>
        </div>
    )
}