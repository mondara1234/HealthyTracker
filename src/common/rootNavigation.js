import React from 'react';
import { Dimensions } from "react-native";
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Sidebar from '../features/common/containers/Sideber';
import { UserRouter, HOMELOGIN, LOGIN,REGISTRATION} from '../features/User/router';
import { trickRouter, TRICK_SCREEN  } from "../features/Trick/router";
import { menuFoodRouter , MENUFOOD_SCREEN, FOODSTYPE_SCREEN} from "../features/MenuFood/router";
import { foodDiaryRouter, FOODDIARY_SCREEN } from "../features/FoodDiary/router";
import { bmiRouter, BMI_SCREEN } from '../features/BMI/router';
import { aboutRouter, ABOUT_SCREEN } from '../features/About/router';
import { problemRouter, PROBLEM_SCREEN } from '../features/Problem/router';
import { settingRouter } from '../features/Setting/router';
import { messageboxRouter, MESSAGEBOX_SCREEN } from '../features/MessageBox/router';
import { profileRouter } from '../features/ProfileUser/router';
import { HEADER_STYLE } from './constants';
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";

export const RootStack = StackNavigator({
    ...UserRouter,
    ...trickRouter,
    ...menuFoodRouter,
    ...foodDiaryRouter,
    ...bmiRouter,
    ...settingRouter,
    ...profileRouter,
    ...aboutRouter,
    ...problemRouter,
    ...messageboxRouter
},{
    initialRouteName: FOODDIARY_SCREEN,
    navigationOptions: ({navigation}) => ({
        ...HEADER_STYLE
    }),
    cardStyle: {
        backgroundColor: '#f6f6f6',
    }
});

const RootDrawer = DrawerNavigator(
    {
        'root': {
            screen: RootStack
        },
    },
    {
        // eslint-disable-next-line react/display-name
        contentComponent: Sidebar,
        drawerWidth: Dimensions.get('window').width - 120,
    }
);

export const RootNavigator = StackNavigator({
    Drawer: { screen: RootDrawer },
}, {
    headerMode: 'none',
});

export default RootNavigator;
