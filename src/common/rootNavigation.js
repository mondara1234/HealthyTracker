import React from 'react';
import { Dimensions } from "react-native";
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Sidebar from '../features/common/containers/Sideber';
import { UserRouter, HOMELOGIN } from '../features/User/router';
import { trickRouter } from "../features/Trick/router";
import { menuFoodRouter } from "../features/MenuFood/router";
import { foodDiaryRouter } from "../features/FoodDiary/router";
import { bmiRouter } from '../features/BMI/router';
import { aboutRouter } from '../features/About/router';
import { problemRouter } from '../features/Problem/router';
import { settingRouter } from '../features/Setting/router';
import { messageboxRouter } from '../features/MessageBox/router';
import { profileRouter } from '../features/ProfileUser/router';
import { HEADER_STYLE } from './constants';

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
    initialRouteName: HOMELOGIN,
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
