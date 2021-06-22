import React from 'react'
import {Link} from 'react-router-dom'

export default function () {
    return (
        <div className="home">
            
           <h1 className="to-the"> <Link to='/app'>To the App</Link></h1>
           <h1 className="header-home">PI Food</h1>
        </div>
    )
}