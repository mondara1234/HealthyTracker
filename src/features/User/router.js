import LoginScreen from "./screen/LoingScreen";
import RegistrationScreen from "./screen/Registration";
import ShowListActivityScreen from "./screen/ShowListActivity";
import EditDataScreen from "./screen/EditData";
import PraviedKeyScreen from "./screen/PraviedKeyScreen";
import profile_list from "./screen/profile_list";


export const LOGIN = 'LOGIN';
export const REGISTRATION = 'REGISTRATION';
export const SHOWLIST = 'SHOWLIST';
export const EDITDATA = 'EDITDATA';
export const PRAVIEDKEY = 'PRAVIEDKEY';
export const PROFILE_LIST= 'PROFILE_LIST';


export const UserRouter = {
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
    [PROFILE_LIST]: {
        screen: profile_list,
        navigationOptions: ({navigation}) => ({
        })
    },
};
