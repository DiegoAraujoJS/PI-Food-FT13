
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
        default:
            return state
    }
}
