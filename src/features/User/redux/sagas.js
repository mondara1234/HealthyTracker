import { put, take, all, call, select } from 'redux-saga/effects';
import {ALL_DATAUSER, FETCH_FLIGHT, ROUTE_START, SEARCH_DATAUSER} from './constants';
import * as Api from '../api/api';

export function* fetchPosts() {
        yield take(ALL_DATAUSER);
    try {
        const posts = yield call(Api.fetchPostsApi);
        console.log(posts);
        yield put({type: FETCH_FLIGHT, json: posts})
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
        fetchPosts(),
        //fetchSearchUser(),
        fetchData(),
    ]);
}