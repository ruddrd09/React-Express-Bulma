const initialState = {
    employees: null
}

export const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case 'GET_SURVEYS':
            return {
                employees: payload
            }
        default:
            return state;
    }
}