import initialState from './initialState';
import { FETCH_FLIGHT, ADD_ONEUSER, ROUTE_START, USER_LOGOUT } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FLIGHT:
            return {
                ...state,
                user: action.json,
                loading: false
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
        case USER_LOGOUT:
            return {
                ...state,
                routeName: '',
                user: []
            };
        default:
            return state;
    }
};

export default reducer;
