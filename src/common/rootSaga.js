import { all } from 'redux-saga/effects';
import { appInitSaga } from './appInit';
import rootSagas from '../features/User/redux/sagas';
import rootSagaFoodDiary from '../features/FoodDiary/redux/sagas';

const rootSagasa = [
    appInitSaga
];

const featureSagas = [
    rootSagasa,
    rootSagas,
    rootSagaFoodDiary
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
