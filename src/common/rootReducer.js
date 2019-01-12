import { combineReducers } from 'redux';
import  ServerReducer from '../features/User/redux/reducer';
import  DiaryReducer from '../features/FoodDiary/redux/reducer';
import  MenuFoodReducer from '../features/MenuFood/redux/reducer';
import  ExerciseUserReducer from '../features/Exercise/redux/reducer';
import  MessageBoxReducer from '../features/MessageBox/redux/reducer';

export default  combineReducers({
    //counterreducer: CounterReducer,
    dataUser: ServerReducer,
    dataDiary: DiaryReducer,
    dataMenuFood: MenuFoodReducer,
    dataExerciseUser: ExerciseUserReducer,
    dataMessageBox: MessageBoxReducer
});