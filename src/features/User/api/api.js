import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";
import { LOGIN } from "../router";

export function fetchPostsApi() {
    return fetch(`${SERVER_URL}/My_SQL/user/ShowAllDataList.php`)
        .then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
}

export const fetchLogin = (Email, Password, keyScreen) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/user/User_Login.php`, {
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
    return fetch(`${SERVER_URL}/My_SQL/user/InsertData.php`, {
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

export const fetchSearchUser = (UserNames) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/user/ShowOneDataList.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: UserNames
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};