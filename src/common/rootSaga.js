import { all } from 'redux-saga/effects';
import rootSagas from '../features/User/redux/sagas';
import rootSagaFoodDiary from '../features/FoodDiary/redux/sagas';

export default function* rootSaga() {
    yield all([
        rootSagas(),
        rootSagaFoodDiary()
    ])
}
