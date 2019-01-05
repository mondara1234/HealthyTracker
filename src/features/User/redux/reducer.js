import initialState from './initialState';
import * as actionTypes from '../redux/actions';
import {FETCHDATA, FETCH_FLIGHT, ADDDATA_COUNTER, ROUTE_START} from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHDATA:
            return {
                ...state,
                loading: true
            };
        case ADDDATA_COUNTER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case "RECEIVE":
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: action.payload
            };
        case "ERROR":
            return {
                ...state,
                fetching: false,
                user: action.payload
            };
        case FETCH_FLIGHT:
            return {
                ...state,
                user: action.json,
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
