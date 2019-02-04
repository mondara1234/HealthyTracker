import Trans from "../../common/containers/Trans";
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

export const fetchLogin = (UserName, Password, keyScreen, personalSelect) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/user/User_Login.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserName,
            password: Password
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'Data Matched')
            {
                if(`${personalSelect}` === 'on'){
                    keyScreen.navigate('PRAVIEDKEY');
                }else{
                    keyScreen.navigate('FOODDIARY_SCREEN')
                }
            }
            else{
                Alert.alert('Error',responseJson);
            }
        }).catch((error) => {
            console.error(error);
        });

};

export const fetchRegister = (Name, Email, Password, ImgProfile, keyScreens, dateFormat) => dispatch => {
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
            imgProfile: ImgProfile,
            date: dateFormat
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
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
            console.log(error);
        });

};

export const fetchUpdateUser = (UserID, Sex, Age, Weight, Height, BMRUser ) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/user/UpdateBMIUser.php`, {
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
            height: Height,
            bmruser: BMRUser
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
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
            username: UserNames
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};

export const fetchUpdateUpdateImgUser = (UserID, dataImg) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/user/UpdateImgProfile.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: UserID,
            dataimg: dataImg
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};