import { ALL_DATAUSER, ROUTE_START, ADD_ONEUSER } from './constants';

export const getOneUser = (todos) => ({
    type: ADD_ONEUSER,
    payload: todos
});

export const getAllUser = () => ({
    type: ALL_DATAUSER
});

export const getRouteName = (screen) => ({
    type: ROUTE_START,
    payload: screen
});
