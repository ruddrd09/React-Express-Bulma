const initialState = {
    employees: null
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_SURVEYS':
            return {
                employees: action.payload
            }
        default:
            return state;
    }
}