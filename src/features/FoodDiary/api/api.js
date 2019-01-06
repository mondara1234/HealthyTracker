import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";
import { LOGIN } from "../router";

export function fetchAllFoodUser() {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/AllFoodUser.php`)
        .then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
}

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

export const fetchUpdateUser = (UserID, Sex, Age, Weight, Height ) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/UpdateBMIUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : UserID,
            sex : Sex,
            age : Age,
            weight: Weight,
            height: Height
        })
        }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });

};

export const fetchSearchFoodUser = (UserName) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/SeachFoodUser.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            userName: UserName
        })
    }).then((response) => response.text())
        .then(function (data) {
            console.log(JSON.parse(data))
        })
        .catch((error) => {
        console.error(error);
    });

};