import React from 'react'

export default function FilterBar (props) {
    
    return (
        <div className="filter-bar">
            <input className="filter-bar__input" type="checkbox"></input>
            <h4 className="filter-bar__h4">Ordenar A-Z</h4>
            <input className="filter-bar__input" type="checkbox"></input>
            <h4 className="filter-bar__h4">Ordenar por Puntaje</h4>
            <button className="filter-bar__button">Filtrar por</button>
            <button className="filter-bar__button">Muestra en formato lista</button>
            <button className="filter-bar__button">Muestra en formato grilla</button>
        </div>
    );
}