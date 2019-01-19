import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";
import Trans from "../../common/containers/Trans";
import {LOGIN} from "../../User/router";

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
                    Trans.tran('general.alert'),
                    `${responseJson} ${Trans.tran('User.already_people')}`,
                    [
                        { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" }
                    ],
                    { cancelable: false },
                );
            }else{
                Alert.alert(
                    Trans.tran('general.alert'),
                    responseJson,
                    [
                        { text: Trans.tran('general.ok'), onPress: () => keyScreens({routeName: LOGIN})},
                        { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" }
                    ],
                    { cancelable: false },
                );
            }
        }).catch((error) => {
            console.error(error);
        });

};