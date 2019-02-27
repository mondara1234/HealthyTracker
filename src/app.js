import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, YellowBox } from 'react-native';
import { StyleProvider, Root } from 'native-base';
import RootNavigation from './common/rootNavigation';
import { createStore } from "redux"
import reducer from "./common/rootReducer";
import SplashScreen from "react-native-splash-screen";

const store = createStore(reducer);


class App extends React.Component{

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        console.disableYellowBox = true;//ปิดข้อความสีเหลือง

        return (
            <StyleProvider>
                <Provider store={store}>
                    <Root>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor="#6a51ae"
                        />
                        <RootNavigation />
                    </Root>
                </Provider>
            </StyleProvider>
        );
    }
}

export default App;
