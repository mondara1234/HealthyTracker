import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const fetchSeachMessageUser = (UserNames) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/MessageBox/SeachMessageUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName : UserNames
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};


export const fetchUpdateMessageUser = (UserNames, Title, Status) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/MessageBox/UpdateMessageUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username : UserNames,
            title: Title,
            status: Status,
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });

};

export const fetchDeleteMessageUse = (ID) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/MessageBox/DeleteMessageUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: ID
        })
    }).then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};