
export default function (state={}, action) {
    switch (action.type){
        case ('ORDER_AZ'):
            return {
                ...state,
                orderAZ: !state['orderAZ']
            }
    }
}
