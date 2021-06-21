import React, { useEffect, useState } from "react";
import {connect} from 'react-redux'
import axios from 'axios'

function SearchBar (props) {
    const [searchInput, setInput] = React.useState('')
    return (
        <div className="search-bar">
            <input className="search-bar__input" onChange={(e) => {setInput(e.target.value);console.log(searchInput)}} ></input>
            <button className="search-bar__search-button" onClick={() => props.dispatchSearch(searchInput)}>Buscar receta</button>
            
        </div>
    );
}

function mapStateToProps(state) {
    return {
        searchInput: state.searchInput
    }
    
}

function mapDispatchToProps(dispatch) {
    return {

        dispatchSearch: (searchInput) => dispatch({
            type: 'SEARCH_INPUT',
            payload: {
                input: searchInput
            }
        })
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)