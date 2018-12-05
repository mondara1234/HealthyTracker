import { put, take, all, call, select } from 'redux-saga/effects';
import {FETCHDATA, FETCH_FLIGHT, ADDDATA_COUNTER, ROUTE_START} from './constants';
import * as Api from '../api/api';

export function* fetchPosts() {
        yield take(FETCHDATA);
    try {
        const posts = yield call(Api.fetchPostsApi);
        console.log(posts);
        yield put({type: FETCH_FLIGHT, json: posts})
    }catch (e) {
        console.log(e);
    }
}

export function* fetchData(screen) {
    yield take(ROUTE_START);
    console.log('a', screen);
    try {
        yield put({type: ROUTE_START, payload: screen})
    }catch (e) {
        console.log(e);
    }
}

export default function* rootSaga() {
    yield all([
        fetchPosts(),
        fetchData
    ]);
}