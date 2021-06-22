import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import App from '../App.js'
import axios from "axios";
import { diets } from '../utils'
export default function () {

    const [name, setName] = useState();
    const [extract, setExtract] = useState();
    const [score, setScore] = useState();
    const [healthScore, setHealthScore] = useState();
    const [step, setStep] = useState("");
    const [steps, setSteps] = useState([]);
    const [button, setStateButton] = useState([])
    const [dietids, setDietId] = useState({})

    let buttons = diets.map(diet => {
        const thisbtn = <button id={"form__button" + diet} style={{ 'background-color': 'beige' }} type="button" onClick={() => {
            let thisBtn = document.getElementById("form__button" + diet)
            if (thisBtn.style['background-color'] === 'green') {
                thisBtn.style['background-color'] = 'beige'
            } else {
                thisBtn.style['background-color'] = 'green'
            }

            dietids[diet] = !dietids[diet]
        }}>{diet}</button>; return thisbtn
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dietidsPayload = Object.keys(dietids).filter(x => dietids[x] === true).map(key => diets.indexOf(key))
        
        console.log(name, extract, score, healthScore, steps, dietidsPayload)
        if (name && extract){const response = await axios.post('http://localhost:3001/recipes', {
            values: { name, extract, score, healthScore, steps, image: "https://spoonacular.com/recipeImages/715594-312x231.jpg" }, dietidsPayload
        });
        
        console.log(response);
        window.alert(`The recipe of ${name} was created!`)} else {window.alert('Name and Summary must not be left blank!')}
    }
    return (
        <form className='create-recipe-form' onSubmit={e => {
            handleSubmit(e)
        }}>
            <Link to='/app'>Back</Link>
            <div className='header'>
                <h1>Create your recipe!</h1>
            </div>

            <div className='container'>
                <div>
                    <span>Title:</span>
                    <input name="name" onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <span>Summary:</span>
                    <textarea name="extract" onChange={e => setExtract(e.target.value)}></textarea>

                </div>
                <div>
                    <span>Ranking:</span>
                    <input type="number" name="score" onChange={e => setScore(e.target.value)}></input>

                </div>
                <div>
                    <span>Health score:</span>
                    <input type="number" name="healthScore" onChange={e => setHealthScore(e.target.value)}></input>

                </div>
                <div>
                    <span>Choose Diets</span>
                    {buttons}


                </div>
                <div>
                    <span>Cook Instructions:</span>
                    <input type="text" id="input-to-test" value={step} onChange={e => setStep(e.target.value)} />
                    <button type="button" onClick={e => {
                        if (step.match(/^\s*$/)) return;
                        setStep("");
                        setSteps([...steps, step])
                    }}>Add Step
                    </button>
                </div>
                <div>
                    <ul>
                        {steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                </div>
            </div>
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}
