import { combineReducers } from 'redux';
import  ServerReducer from '../features/User/redux/reducer';
import  DiaryReducer from '../features/FoodDiary/redux/reducer';
import  MenuFoodReducer from '../features/MenuFood/redux/reducer';
import  MessageBoxReducer from '../features/MessageBox/redux/reducer';
import  BMIReducer from '../features/BMI/redux/reducer';
import  TrickReducer from '../features/Trick/redux/reducer';

const CheckDevice = (state={}, action) => {
    switch (action.type){
        case "USE_INTERNET" : {
            state = {
                ...state,
                InternetIsConnect: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

export default  combineReducers({
    CheckDevice: CheckDevice,
    dataUser: ServerReducer,
    dataDiary: DiaryReducer,
    dataMenuFood: MenuFoodReducer,
    dataMessageBox: MessageBoxReducer,
    dataBMIUser: BMIReducer,
    dataTrick: TrickReducer
});
