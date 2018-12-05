import { all } from 'redux-saga/effects';
import { appInitSaga } from './appInit';


const rootSagas = [
    appInitSaga
];

const featureSagas = [
    rootSagas
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
