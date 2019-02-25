import initialState from './initialState';
import { ALL_MENUFOOD, ALL_FOODTYPE } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_MENUFOOD:
            return {
                ...state,
                foodMenu: action.json,
                loading: false
            };
        case ALL_FOODTYPE:
            return {
                ...state,
                foodType: action.json,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
