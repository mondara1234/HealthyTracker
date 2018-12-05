import React from 'react';
import { Dimensions } from "react-native";
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Sidebar from '../features/common/containers/Sideber';
import { CommonRouter, DASHBOARD } from '../features/common/router';
import { trickRouter, TRICK_SCREEN } from "../features/Trick/router";
import { menuFoodRouter, MENUFOOD_SCREEN } from "../features/MenuFood/router";
import {foodDiaryRouter, FOODDIARY_SCREEN } from "../features/FoodDiary/router";
import { exerciseRouter } from '../features/Exercise/router';
import { bmiRouter } from '../features/BMI/router';
import { UserRouter, LOGIN } from '../features/User/router';
import { HEADER_STYLE } from './constants';
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";

export const RootStack = createStackNavigator({
    ...CommonRouter,
    ...UserRouter,
    ...trickRouter,
    ...menuFoodRouter,
    ...foodDiaryRouter,
    ...exerciseRouter,
    ...bmiRouter
},{
    initialRouteName: TRICK_SCREEN,
    navigationOptions: ({navigation}) => ({
        ...HEADER_STYLE
    }),
    cardStyle: {
        backgroundColor: '#f6f6f6',
    }
});

const RootDrawer = createDrawerNavigator(
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

export const RootNavigator = createStackNavigator({
    Drawer: { screen: RootDrawer },
}, {
    headerMode: 'none',
});

export default RootNavigator;
