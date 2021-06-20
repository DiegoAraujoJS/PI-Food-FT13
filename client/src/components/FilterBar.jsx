import React from 'react'
import {connect} from 'react-redux'

function FilterBar (props) {
    const diets = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "pescatarian", "fodmap friendly", "whole 30"]
    return (
        <div className="filter-bar">
            <input className="filter-bar__input" type="checkbox" onChange={() => {props.dispatchOrderAZ()}}></input>
            <h4 className="filter-bar__h4">Ordenar A-Z</h4>
            <input className="filter-bar__input" type="checkbox" onChange={() => props.dispatchOrderRanking()}></input>
            <h4 className="filter-bar__h4">Ordenar por Puntaje</h4>
            <button className="filter-bar__button">Diet: </button>
            {diets.map(diet => <button className="filter-bar__button" onClick={() => props[`dispatch${diet}`]()}>{diet}</button>)}
        </div>
    );
}


function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps (dispatch) {
    let dispatchDiets = {}
    const diets = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "pescatarian", "fodmap friendly", "whole 30"]
    diets.forEach(diet => dispatchDiets[`dispatch${diet}`] = () => dispatch({type: diet}))

    return {
        dispatchOrderAZ: () => dispatch({type: 'ORDER_AZ'}),
        dispatchOrderRanking: () => dispatch({type: 'ORDER_BY_RANKING'}),
        ...dispatchDiets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);