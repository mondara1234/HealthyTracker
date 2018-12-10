import React from 'react';
import { Dimensions } from "react-native";
import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation';
import Sidebar from '../features/common/containers/Sideber';
import { CommonRouter } from '../features/common/router';
import { UserRouter, HOMELOGIN, LOGIN } from '../features/User/router';
import { trickRouter } from "../features/Trick/router";
import { menuFoodRouter } from "../features/MenuFood/router";
import { foodDiaryRouter } from "../features/FoodDiary/router";
import { exerciseRouter } from '../features/Exercise/router';
import { bmiRouter } from '../features/BMI/router';
import { aboutRouter } from '../features/About/router';
import { settingRouter, SETTING_SCREEN } from '../features/Setting/router';
import { usermanualRouter } from '../features/UserManual/router';
import { profileRouter } from '../features/ProfileUser/router';
import { HEADER_STYLE } from './constants';
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";

export const RootStack = StackNavigator({
    ...CommonRouter,
    ...UserRouter,
    ...trickRouter,
    ...menuFoodRouter,
    ...foodDiaryRouter,
    ...exerciseRouter,
    ...bmiRouter,
    ...settingRouter,
    ...usermanualRouter,
    ...profileRouter,
    ...aboutRouter
},{
    initialRouteName: SETTING_SCREEN,
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
