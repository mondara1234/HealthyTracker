import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const UpdateAllPrivate = (UserID, PersonalSelect) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Setting/UpdateAllPrivate.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : UserID,
            personalselect: PersonalSelect
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });

};

export const UpdateChangePrivateKey = (UserID, PasswordNew) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Setting/UpdateChangePrivateKey.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : UserID,
            passwordnew: PasswordNew
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });

};


export const UpdateChangePassword = (UserID, PasswordNew) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/user/UpdateChangePassword.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : UserID,
            passwordnew: PasswordNew
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });

};