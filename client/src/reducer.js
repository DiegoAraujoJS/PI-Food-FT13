import {diets} from './utils'
export default function (state = {
    orderAZ: false,
    orderRanking: false,
    permuteDetail: false
}, action) {

    if (action['type'] === 'SEARCH_INPUT') return {...state, searchInput: action['payload']['input']}
    if (action['type'] === 'PERMUTE_DISH_DETAIL') {if (action['value']) {return {...state, permuteDetail: false}}else{return {...state, permuteDetail: !state['permuteDetail']}}}
    let cases = {
        ORDER_AZ: {...state, orderAZ: !state['orderAZ']},
        ORDER_BY_RANKING: {...state, orderRanking: !state['orderRanking']},
    }
    if (diets.includes(action['type'])){
        let ret = {...state}
        ret[action['type']] = !state[action['type']]
        return ret;
    }
    
    return cases[action['type']] || state
}