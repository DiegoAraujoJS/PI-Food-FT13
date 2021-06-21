import React from 'react'
import SearchBar from './components/SearchBar.jsx'
import FilterBar from './components/FilterBar.jsx'
import Dishes from './components/Dishes.jsx'
import {Link} from 'react-router-dom'

export default function App (props) {
    

    return (
        <div className="app">
            <div className="header">
                <h1>Food</h1>
                <Link className='link' to='/form'>Create your own Recipe!</Link>
            </div>
            <div>
                <SearchBar />
            </div>
            <div>
                <FilterBar />
            </div>
            <div className="dishesAPP">
                <Dishes />
            </div>
            
        </div>
    )
}

