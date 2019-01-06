import initialState from './initialState';
import { FETCH_FLIGHT, ALL_DATAUSER, ADD_ONEUSER, ROUTE_START, SEARCH_DATAUSER } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FLIGHT:
            return {
                ...state,
                user: action.json,
                loading: false
            };
        case ALL_DATAUSER:
            return {
                ...state,
                loading: true
            };
        case ADD_ONEUSER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case ROUTE_START:
            return {
                ...state,
                routeName: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
