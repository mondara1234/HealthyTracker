import { all } from 'redux-saga/effects';
import { appInitSaga } from './appInit';
import * as UserSagas from '../features/User/redux/sagas';
import * as fooddiarySagas from '../features/FoodDiary/redux/sagas';

const rootSagas = [
    appInitSaga
];

const featureSagas = [
    rootSagas,
    fooddiarySagas,
    UserSagas
];

const sagas = featureSagas.reduce((prev, curr) => [
    ...prev,
    ...Object.keys(curr).map(k => curr[k]),
], [])
    .filter(s => typeof s === 'function');


const rootSaga = function* rootSaga() {
    yield all(sagas.map(saga => saga()));
};

export default rootSaga;
