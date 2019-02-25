import initialState from './initialState';
import { ALL_MESSAGEBOX } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_MESSAGEBOX:
            return {
                ...state,
                messageBox: action.json,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
