import initialState from './initialState';
import { ALL_MENUFOOD } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_MENUFOOD:
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
