import React from 'react'
import {connect} from 'react-redux'
import {diets} from '../utils'
function FilterBar (props) {
    let buttons = diets.map(diet => {const thisbtn = <button id={"filter-bar__button"+diet} style={{'background-color': 'beige'}} onClick={() => {
        props[`dispatch${diet}`]();
        let thisBtn = document.getElementById ("filter-bar__button"+diet)
        if (thisBtn.style['background-color'] === 'green') {
            thisBtn.style['background-color'] = 'beige'
        } else {
            thisBtn.style['background-color'] = 'green'
        }
        
        
        }}>{diet}</button>; return thisbtn} )
    return (
        <div className="filter-bar">
            <input className="filter-bar__input" type="checkbox" onChange={() => {props.dispatchOrderAZ()}}></input>
            <h4 className="filter-bar__h4">Order A-Z</h4>
            <input className="filter-bar__input" type="checkbox" onChange={() => props.dispatchOrderRanking()}></input>
            <h4 className="filter-bar__h4">Order By Score</h4>
            <button className="filter-bar__button">Diet: </button>
            {buttons}
        </div>
    );
}


function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps (dispatch) {
    let dispatchDiets = {}
    diets.forEach(diet => dispatchDiets[`dispatch${diet}`] = () => dispatch({type: diet}))

    return {
        dispatchOrderAZ: () => dispatch({type: 'ORDER_AZ'}),
        dispatchOrderRanking: () => dispatch({type: 'ORDER_BY_RANKING'}),
        ...dispatchDiets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);