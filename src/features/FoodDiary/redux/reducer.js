import initialState from './initialState';
import { SEARCH_ALLFODEUSER, SEARCH_FODEUSER, ONE_FODEUSER } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ALLFODEUSER:
            return {
                ...state,
                loading: true
            };
        case ONE_FODEUSER:
            return {
                ...state,
                foodUser: action.json,
                loading: false
            };
        case SEARCH_FODEUSER:
            return {
                ...state,
                foodUser: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
