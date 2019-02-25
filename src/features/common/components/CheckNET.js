import { NetInfo } from "react-native";
import store from "../../../common/configStore";

function CheckInternet() {
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        handleFirstConnectivityChange
    );
}

function handleFirstConnectivityChange(isConnected){
    console.log('Network, is ' + (isConnected ? 'online' : 'offline'));
    if(isConnected){
        store.dispatch({     // action
            type: 'USE_INTERNET',
            payload : true
        });
    }else{
        store.dispatch({     // action
            type: 'USE_INTERNET',
            payload : false
        });
    }
}

export default CheckInternet;