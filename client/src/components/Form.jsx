import React from 'react'
import {Link} from 'react-router-dom'
import App from '../App.js'

export default function () {
    return (
        <form className='create-recipe-form'>
            <div className='create-recipe-form__header'>
                <h1>Creá</h1>
                <h1>tu</h1>
                <h1>recetaza!</h1>
                
                
            </div>
            <div className='create-recipe-form__container'>
                
                <div className='create-recipe-form__container__div'>
                    <span>Nombre:</span>
                    <input className='create-recipe-form__container__div__input'></input>
                </div>
                <div className='create-recipe-form__container__div'>
                    <span>Resumen:</span>
                    <input className='create-recipe-form__container__div__input'></input>

                </div>
                <div className='create-recipe-form__container__div'>
                    <span>Puntuación:</span>
                    <input className='create-recipe-form__container__div__input'></input>

                </div>
                <div className='create-recipe-form__container__div'>
                    <span>Nivel de comida saludable:</span>
                    <input className='create-recipe-form__container__div__input'></input>

                </div>
                <div className='create-recipe-form__container__div'>
                    <span>Paso a paso:</span>

                </div>
            </div>
        </form>
    )
}
