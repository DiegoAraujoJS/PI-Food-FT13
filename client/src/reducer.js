
export default function (state={
    orderAZ:false,
    orderRanking: false}, action) {
    switch (action.type){
        case ('ORDER_AZ'):
            return {
                ...state,
                orderAZ: !state['orderAZ']
            }
        case ('ORDER_BY_RANKING'):
            return {
                ...state,
                orderRanking: !state['orderRanking']
            }
        case ('SEARCH_INPUT'):
            return {
                ...state,
                searchInput: action['payload']['input']

            }
        default:
            return state
    }
}
