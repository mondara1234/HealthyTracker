import React from 'react';
import { Provider } from 'react-redux';
import RootNavigation from './common/rootNavigation';
import store from './common/configStore';

class App extends React.Component{

    render() {
        console.disableYellowBox = true;//ปิดข้อความสีเหลือง
        return (
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        );
    }
}

export default App;

