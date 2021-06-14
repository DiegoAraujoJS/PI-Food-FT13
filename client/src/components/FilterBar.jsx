import React from 'react'
import {connect} from 'react-redux'

function FilterBar (props) {
    return (
        <div className="filter-bar">
            <input className="filter-bar__input" type="checkbox" onChange={() => {props.dispatchOrderAZ()}}></input>
            <h4 className="filter-bar__h4">Ordenar A-Z</h4>
            <input className="filter-bar__input" type="checkbox" onChange={() => props.dispatchOrderRanking()}></input>
            <h4 className="filter-bar__h4">Ordenar por Puntaje</h4>
            <button className="filter-bar__button">Filtrar por</button>
            <button className="filter-bar__button">Muestra en formato lista</button>
            <button className="filter-bar__button">Muestra en formato grilla</button>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        orderAZ: state.orderAZ,
        orderRanking: state.orderRanking
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchOrderAZ: () => dispatch({type: 'ORDER_AZ'}),
        dispatchOrderRanking: () => dispatch({type: 'ORDER_BY_RANKING'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);