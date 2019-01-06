import { put, take, all, call, select } from 'redux-saga/effects';
import { SEARCH_ALLFODEUSER, SEARCH_FODEUSER, ONE_FODEUSER } from './constants';
import * as Api from '../api/api';

export function* fetchFoodUser() {
    console.log('asdasdasd');
        yield take(SEARCH_ALLFODEUSER);
    try {
        const posts = yield call(Api.fetchAllFoodUser);
        console.log(posts);
        yield put({type: ONE_FODEUSER, json: posts})
    }catch (e) {
        console.log(e);
    }
}

// export function* fetchSearchUser(itemID) {
//     //yield take(SEARCH_DATAUSER);
//     console.log('aaa', itemID);
//     let id = itemID ? itemID : 1;
//     try {
//         const posts = yield call(Api.fetchSearchUser(id));
//         console.log('posts '+ posts);
//         yield put({type: FETCH_FLIGHT, json: posts})
//     }catch (e) {
//         console.log('e: '+e);
//     }
// }

export function* fetchData(screen) {
    yield take(SEARCH_FODEUSER);
    console.log('a', screen);
    try {
        yield put({type: ROUTE_START, payload: screen})
    }catch (e) {
        console.log('e: '+e);
    }
}

export default function* rootSaga() {
    yield all([
        fetchFoodUser(),
        //fetchSearchUser(),
        fetchData(),
    ]);
}