import { combineReducers } from 'redux';
import  ServerReducer from '../features/User/redux/reducer';
import  DiaryReducer from '../features/FoodDiary/redux/reducer';

export default  combineReducers({
    //counterreducer: CounterReducer,
    dataUser: ServerReducer,
    dataDiary: DiaryReducer
});
