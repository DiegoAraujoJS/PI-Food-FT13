export default function (state = {
    orderAZ: false,
    orderRanking: false
}, action) {

    let cases = {
        ORDER_AZ: {...state, orderAZ: !state['orderAZ']},
        ORDER_BY_RANKING: {...state, orderRanking:!state['orderRanking']}
    }
    const diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole']
    diets.forEach(diet => {
        cases[diet] = {...state}
        cases[diet][diet] = !state[diet]
    })

    console.log(state)
    

    return cases[action['type']] || state

    // switch (action.type) {
    //     case ('ORDER_AZ'):
    //         return {
    //             ...state,
    //             orderAZ: !state['orderAZ']
    //         }
    //         case ('ORDER_BY_RANKING'):
    //             return {
    //                 ...state,
    //                 orderRanking: !state['orderRanking']
    //             }
    //             case ('SEARCH_INPUT'):
    //                 return {
    //                     ...state,
    //                     searchInput: action['payload']['input']

    //                 }
    //                 default:
    //                     return state
    // }
}