import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import App from '../App.js'
import axios from "axios";
import {diets} from '../utils'
export default function () {

    const [name, setName] = useState();
    const [extract, setExtract] = useState();
    const [score, setScore] = useState();
    const [healthScore, setHealthScore] = useState();
    const [step, setStep] = useState("");
    const [steps, setSteps] = useState([]);
    const [button, setStateButton] = useState([])
    const [dietids, setDietId] = useState({})

    let buttons = diets.map(diet => {const thisbtn = <button id={"form__button"+diet} style={{'background-color': 'beige'}} onClick={() => {
        let thisBtn = document.getElementById ("form__button"+diet)
        if (thisBtn.style['background-color'] === 'green') {
            thisBtn.style['background-color'] = 'beige'
        } else {
            thisBtn.style['background-color'] = 'green'
        }
        
        dietids[diet] = !dietids[diet]
        }}>{diet}</button>; return thisbtn} )

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dietidsPayload = Object.keys(dietids).filter(x => dietids[x]===true).map(key => diets.indexOf(key))
        console.log(name, extract, score, healthScore, steps, dietidsPayload )
        const response = await axios.post('http://localhost:3001/recipe', {
            values: {name, extract, score, healthScore, steps, image: "https://spoonacular.com/recipeImages/715594-312x231.jpg"}, dietidsPayload
        })
        console.log(response)
    }
    return (
        <form className='create-recipe-form' onSubmit={e => {
            handleSubmit(e)
        }}>
            <div className='header'>
                <h1>Create your recipe!</h1>
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
                    <span>Diet</span>
                    {buttons}
                    
                    
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
