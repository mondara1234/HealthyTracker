import { ROUTE_START, ADD_ONEUSER , USER_LOGOUT} from './constants';

export const getOneUser = (todos) => ({
    type: ADD_ONEUSER,
    payload: todos
});

export const getRouteName = (screen) => ({
    type: ROUTE_START,
    payload: screen
});

export const getUSER_LOGOUT = ( ) => ({
    type: USER_LOGOUT
});