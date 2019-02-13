import HomeLoginScreen from "./screen/HomeLoginScreen";
import LoginScreen from "./screen/LoingScreen";
import RegistrationScreen from "./screen/Registration";
import PraviedKeyScreen from "./screen/PraviedKeyScreen";
import ForgotPasswordScreen from "./screen/ForgotPasswordScreen";

export const HOMELOGIN = 'HOMELOGIN';
export const LOGIN = 'LOGIN';
export const REGISTRATION = 'REGISTRATION';
export const PRAVIEDKEY = 'PRAVIEDKEY';
export const FORGOTPASSWORD = 'FORGOTPASSWORD';


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
            drawerLockMode: 'locked-closed'
        })
    },
    [FORGOTPASSWORD]: {
        screen: ForgotPasswordScreen,
        navigationOptions: ({navigation}) => ({
            drawerLockMode: 'locked-closed'
        })
    },
    [PRAVIEDKEY]: {
        screen: PraviedKeyScreen,
        navigationOptions: ({navigation}) => ({
            drawerLockMode: 'locked-closed'
        })
    },
};
