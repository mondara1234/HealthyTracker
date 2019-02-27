import { put, take, all, call, select } from 'redux-saga/effects';
import { FETCH_FLIGHT, ROUTE_START, SEARCH_DATAUSER} from './constants';


export function* fetchData(screen) {
    yield take(ROUTE_START);
    console.log('a', screen);
    try {
        yield put({type: ROUTE_START, payload: screen})
    }catch (e) {
        console.log('e: '+e);
    }
}

export default function* rootSaga() {
    yield all([
        fetchData(),
    ]);
}