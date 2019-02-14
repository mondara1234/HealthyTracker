import initialState from './initialState';
import { SEARCH_ALLFODEUSER, SEARCH_FODEUSER, ALL_METABOLIC } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ALLFODEUSER:
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
        case ALL_METABOLIC:
            return {
                ...state,
                metabolic: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
