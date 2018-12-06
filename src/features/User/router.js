import HomeLoginScreen from "./screen/HomeLoginScreen";
import LoginScreen from "./screen/LoingScreen";
import RegistrationScreen from "./screen/Registration";
import ShowListActivityScreen from "./screen/ShowListActivity";
import EditDataScreen from "./screen/EditData";
import PraviedKeyScreen from "./screen/PraviedKeyScreen";

export const HOMELOGIN = 'HOMELOGIN';
export const LOGIN = 'LOGIN';
export const REGISTRATION = 'REGISTRATION';
export const SHOWLIST = 'SHOWLIST';
export const EDITDATA = 'EDITDATA';
export const PRAVIEDKEY = 'PRAVIEDKEY';


export const UserRouter = {
    [HOMELOGIN]: {
        screen: HomeLoginScreen,
        navigationOptions: ({navigation}) => ({
            drawerLockMode: 'locked-closed'
        })
    },
    [LOGIN]: {
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
           drawerLockMode: 'locked-closed'
        })
    },
    [REGISTRATION]: {
        screen: RegistrationScreen,
        navigationOptions: ({navigation}) => ({
        })
    },
    [SHOWLIST]: {
        screen: ShowListActivityScreen,
        navigationOptions: ({navigation}) => ({
        })
    },
    [EDITDATA]: {
        screen: EditDataScreen,
        navigationOptions: ({navigation}) => ({
        })
    },
    [PRAVIEDKEY]: {
        screen: PraviedKeyScreen,
        navigationOptions: ({navigation}) => ({
        })
    },
};
