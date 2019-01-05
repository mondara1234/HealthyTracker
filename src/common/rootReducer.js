import {combineReducers} from 'redux';
import  ServerReducer from '../features/User/redux/reducer';

export default  combineReducers({
    //counterreducer: CounterReducer,
    dataUser: ServerReducer
});