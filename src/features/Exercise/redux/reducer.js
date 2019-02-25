import initialState from './initialState';
import { ALL_USERExercise } from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_USERExercise:
            return {
                ...state,
                exerciseUser: action.json,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
