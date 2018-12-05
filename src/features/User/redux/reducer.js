import initialState from './initialState';
import * as actionTypes from '../redux/actions';
import {FETCHDATA, FETCH_FLIGHT, ADDDATA_COUNTER, ROUTE_START} from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "RECEIVE":
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            };
        case "ERROR":
            return {
                ...state,
                fetching: false,
                data: action.payload
            };
        case ADDDATA_COUNTER:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case FETCHDATA:
            return {
                ...state,
                loading: true
            };
        case FETCH_FLIGHT:
            return {
                ...state,
                data: action.json,
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
