import createSagaMiddleware from "redux-saga";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const Middleware = applyMiddleware(sagaMiddleware, thunk);
const store = createStore(rootReducer, Middleware);

// run the saga
sagaMiddleware.run(rootSaga);

export default store;