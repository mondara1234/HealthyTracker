import initialState from './initialState';
import { SEAECH_BMIUSER } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEAECH_BMIUSER:
            return {
                ...state,
                bmiUser: action.json,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
