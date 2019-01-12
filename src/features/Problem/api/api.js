import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const InsertProblem = (Name, Email, Password, ImgProfile,) => dispatch => {
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