import React, { useEffect, useState } from "react";
import {connect} from 'react-redux'


function SearchBar (props) {
    const [searchInput, inputHandler] = React.useState('')
    return (
        <div className="search-bar">
            <input className="search-bar__input" onChange={(e) => {inputHandler(e.target.value);console.log(searchInput)}} ></input>
            <button className="search-bar__search-button" >Buscar receta</button>
            
        </div>
    );
}

function mapStateToProps(state) {
    searchInput: state.searchInput
}

function mapDispatchToProps(dispatch) {
    dispatchSearch: (searchInput) => dispatch(searchInput)
} 

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)