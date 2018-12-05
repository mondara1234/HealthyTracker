import { FETCHDATA, ROUTE_START, ADDDATA_COUNTER } from './constants';
import * as sagas from './sagas';
import axios from 'axios';

export const getAllFlights = (todos) => ({
    type: ADDDATA_COUNTER,
    payload: todos
});

export const getNews = () => ({
    type: FETCHDATA,
});

export const getRouteName = (screen) => ({
    type: ROUTE_START,
    payload: screen
});
