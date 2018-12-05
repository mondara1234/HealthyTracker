import { call, take, put, fork, select } from 'redux-saga/effects';
import {runStore} from "../../components/actions/counterActions";

export const fetchFlights = () => {
    return fetch('http://localhost/My_SQL/ShowAllDataList.php')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson ;
        })
};

export const appInitSaga = function* () {
    try {
        yield take(runStore().type);
        const flights = yield call(fetchFlights); //1
        yield put({type: 'FLIGHTS_LOADED', payload: [flights] }); //2
        console.log('aa',flights);
    } catch(error) {
        yield put({type: 'FLIGHTS_LOADED_FAILED', payload: 'mondxss'  });
        console.log('ss',error);

    }
};
