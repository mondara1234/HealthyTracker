import initialState from './initialState';
import { SEAECH_TRICKALL, SEAECH_TRICKNEW, SEAECH_TRICKRANK } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEAECH_TRICKALL:
            return {
                ...state,
                trickAll: action.json,
                loading: false
            };
        case SEAECH_TRICKNEW:
            return {
                ...state,
                trickNew: action.json,
                loading: false
            };
        case SEAECH_TRICKRANK:
            return {
                ...state,
                trickRank: action.json,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
