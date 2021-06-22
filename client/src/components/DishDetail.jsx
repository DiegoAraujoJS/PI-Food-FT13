import React from 'react';
import Dish from './Dish.jsx'
import {connect} from 'react-redux'
function DishDetail(props) {
    
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

    

    if (!props.analyzedInstructions[0]){
        return (
        <div className="dish-detail__div">
            <h1>
                {props['title']}
            </h1>
            {childUl}
            <button onClick={() => props.permuteComponent()}>Cook Instructions</button>

        </div>
    )} else if (props.analyzedInstructions[1].length !== 0){
        console.log(props)
        
        return (
            <div className="dish-detail__div">
                <h1>
                    {props['title']}
                </h1>
                <ol>
                    {props.analyzedInstructions && props.analyzedInstructions[1][0].steps.map(instruction => <li>{instruction.step}</li>)}
                </ol>
                <button onClick={() => props.permuteComponent()}>Detail</button>
    
            </div>
        )
    } else {
        return (
            <div className="dish-detail__div">
                <h1>
                    {props['title']}
                </h1>
                <h2>No instructions found</h2>
                <button onClick={() => props.permuteComponent()}>Detail</button>
    
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        permuteComponent: () => dispatch({type:'PERMUTE_DISH_DETAIL'})
    }
}

export default connect(null, mapDispatchToProps)(DishDetail)