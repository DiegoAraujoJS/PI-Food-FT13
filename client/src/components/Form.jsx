import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import App from '../App.js'
import axios from "axios";

export default function () {

    const [name, setName] = useState();
    const [extract, setExtract] = useState();
    const [score, setScore] = useState();
    const [healthScore, setHealthScore] = useState();
    const [step, setStep] = useState("");
    const [steps, setSteps] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, extract, score, healthScore, steps)
        const response = await axios.post('http://localhost:3001/recipe', {
            name, extract, score, healthScore, steps
        })
        console.log(response)
    }
    return (
        <form className='create-recipe-form' onSubmit={e => {
            handleSubmit(e)
        }}>
            <div className='header'>
                <h1>Creá tu recetaza!</h1>
            </div>

            <div className='container'>
                <div>
                    <span>Nombre:</span>
                    <input name="name" onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <span>Resumen:</span>
                    <textarea name="extract" onChange={e => setExtract(e.target.value)}></textarea>

                </div>
                <div>
                    <span>Puntuación:</span>
                    <input type="number" name="score" onChange={e => setScore(e.target.value)}></input>

                </div>
                <div>
                    <span>Nivel de comida saludable:</span>
                    <input type="number" name="healthScore" onChange={e => setHealthScore(e.target.value)}></input>

                </div>
                <div>
                    <span>Paso a paso:</span>
                    <input type="text" value={step} onChange={e => setStep(e.target.value)}/>
                    <button onClick={e => {
                        setStep("");
                        setSteps([...steps, step])
                    }}>agregar paso
                    </button>
                    <ul>
                        {steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                </div>
            </div>
            <div>
                <button type="submit">Enviar</button>
            </div>
        </form>
    )
}
