import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import rootReducer from '../../components/reducers';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();


export default function configureStore() {
    const store = createStore(
        rootReducer,{},
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);
    return store;

}