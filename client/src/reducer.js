export default function (state = {
    orderAZ: false,
    orderRanking: false
}, action) {

    let cases = {
        ORDER_AZ: {...state, orderAZ: !state['orderAZ']},
        ORDER_BY_RANKING: {...state, orderRanking: !state['orderRanking']}
    }
    const diets = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "pescatarian", "fodmap friendly", "whole 30"]
    diets.forEach(diet => {
        cases[diet] = {...state}
        cases[diet][diet] = !state[diet]
    })

    return cases[action['type']] || state
}