import * as actionTypes from '../redux/actions';
import axios from '../redux/axios';
import {Alert} from "react-native";
import { SERVER_URL } from "../../../common/constants"
import {LOGIN} from "../router";
import { Images } from "../components/images";

export function fetchPostsApi() {
    return fetch(`${SERVER_URL}/My_SQL/ShowAllDataList.php`)
        .then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
}

export const fetchLogin = (Email, Password, keyScreen) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/User_Login.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: Email,
            password: Password
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'Data Matched')
            {
                keyScreen.navigate('FOODDIARY_SCREEN')
            }
            else{
                Alert.alert('Error',responseJson);
            }
        }).catch((error) => {
            console.error(error);
        });

};

export const fetchRegister = (Name, Email, Password, ImgProfile, keyScreens) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/InsertData.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: Name,
            email: Email,
            password: Password,
            imgProfile: ImgProfile
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'Email'||responseJson === 'Name'){
                Alert.alert(
                    "แจ้งเตือน",
                    responseJson+" นี้มีคนใช้ไปแล้วครับ",
                    [
                        { text: "ปิด", onPress: () => {}, style: "cancel" }
                    ],
                    { cancelable: false },
                );
            }else{
                Alert.alert(
                    "แจ้งเตือน",
                    responseJson,
                    [
                        { text: "ตกลง", onPress: () => keyScreens({routeName: LOGIN})},
                        { text: "ปิด", onPress: () => {}, style: "cancel" }
                    ],
                    { cancelable: false },
                );
            }
        }).catch((error) => {
            console.error(error);
        });

};

const getDataSuccess = (data) => {
    return {
        type: actionTypes.GET_DATA_SUCCESS,
        data: data
    }
};

export const getData = (url, props) => {
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                dispatch(getDataSuccess(response.data));
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
    }
}
const postDataSuccess = (response) => {
    return {
        type: actionTypes.POST_DATA_SUCCESS,
        response: response
    }
}

export const postData = ( Email, Password, keyScreen) => {
        axios.post(`${SERVER_URL}/My_SQL/User_Login.php`, Email, Password, keyScreen)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'Data Matched')
                {
                    keyScreen.navigate('FOODDIARY_SCREEN')
                }
                else{
                    Alert.alert('Error',responseJson);
                }
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
};

const putDataSuccess = (response) => {
    return {
        type: actionTypes.PUT_DATA_SUCCESS,
        response: response
    }
}

export const putData = (url, obj, props) => {
    return (dispatch) => {
        axios.put(url, obj)
            .then(response => {
                dispatch(putDataSuccess(response));
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
    }
}

const deleteDataSuccess = (response) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        response: response
    }
}

export const deleteData = (url, props) => {
    return (dispatch) => {
        axios.delete(url)
            .then(response => {
                dispatch(deleteDataSuccess(response));
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
    }
}