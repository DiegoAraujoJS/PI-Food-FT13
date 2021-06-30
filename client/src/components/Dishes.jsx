import React, { useEffect } from 'react'
import Dish from './Dish.jsx'
import {range, sortBy} from 'underscore'
import axios from 'axios'
import {connect} from 'react-redux'
import DishDetail from './DishDetail.jsx'
import {diets} from '../utils'

function myReduce (array) {
    if (array.length !== 0) {
        return array.reduce((acum, dietName) => acum+', '+dietName)
    } else {
        return ''
    }
}

function Dishes (props) {
    
    let [dishes, setDishes] = React.useState([])
    let [detail, setDetail] = React.useState('')
    
    
    let [noInstructions, setNoInstructions] = React.useState(true)
    noInstructions = !props.permuteDetail
    
    if (detail) detail['summary'] = detail['summary'].replace(/<[^>]+>/g, '')

    const [pageNumber, setPageNumber] = React.useState(0)

    const dishesPerPage = 6

    function displayDishes(){
        console.log(props.searchInput)
        return dishes.slice(pageNumber * dishesPerPage, dishesPerPage + pageNumber*dishesPerPage)
        .map(dish => <Dish name={dish['title']} url={dish['image']} diet={'diet: ' + myReduce(dish['diets'])} ranking={dish['aggregateLikes']} detailFunction={() => {
            console.log(dish['id']);
            
            setDetail({...dishes.find(to_find_dish => dish['id']===to_find_dish['id']), permuteDetail: false})
            props.dispatchNoInstructions()
            
        }} />)
    }
    
    React.useEffect(() => {
        const list =  axios.get('http://localhost:3001/recipes?addRecipeInformation=true')
        .then(response => {console.log(response['data']);return response['data']['results']})
        .then(data => setDishes(data))
        .catch(err => console.log(err))
    }
    , [])
    
    if(props.searchInput) dishes = dishes.filter(dish => dish['title'].toLowerCase().includes(props.searchInput.toLowerCase()))

    props.orderAZ ? dishes = sortBy(dishes, (dish) => dish['title']) : dishes = dishes;
    props.orderRanking ? dishes = sortBy(dishes, (dish) => dish['aggregateLikes']).reverse() : dishes = dishes; 
    
    diets.forEach(diet => {
        if (props[diet]) {
            dishes = dishes.filter(dish => dish.diets.includes(diet))
        }
    })

    console.log('noinstructions',noInstructions)

    return (
        <div className='dishesAPPcontainer'>
            <div className="forward">
                <button onClick={() => pageNumber < (dishes.length / dishesPerPage) - 1 && setPageNumber(pageNumber+1)}>Forward</button>
                <button onClick={() => pageNumber > 0 && setPageNumber(pageNumber-1)}>Previous</button>
            </div>
            <div className="dishes">
                {displayDishes()}
            </div>

            <div className="detail">
                {(detail !== '' && noInstructions) && <DishDetail title={detail['title']} ranking={detail['aggregateLikes']} health={detail['healthScore']} summary={detail['summary']} analyzedInstructions={[false]}/>}
                {(detail !== '' && !noInstructions) && <DishDetail title={detail['title']} analyzedInstructions={[true,detail['analyzedInstructions']]}/>}
            </div>
            
        </div>
    )
}
function mapStateToProps(state) {
    let objDiets = {}
    diets.forEach(diet => objDiets[diet] = state[diet])
    return {
        searchInput: state.searchInput,
        orderAZ: state.orderAZ,
        orderRanking: state.orderRanking,
        permuteDetail: state.permuteDetail,
        ...objDiets
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchNoInstructions: () => dispatch({type: "PERMUTE_DISH_DETAIL", value: true})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)