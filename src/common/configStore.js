import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

// แสดง ประเภท Actions ที่เกิดขึ้น
const showLog = (store) => (next) => (action) => {
    console.log("Log Action", action);
    next(action);
};

const store = createStore(combineReducers
    ({
        ...rootReducer
    }),{}, compose(applyMiddleware(sagaMiddleware, showLog))
);
// run the saga
sagaMiddleware.run(rootSaga);

export default store;