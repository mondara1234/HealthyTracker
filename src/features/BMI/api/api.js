import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const fetchSearchBMIUser = (BMRUsers) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/BMIUser/SearchBmiUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bmiuser : BMRUsers
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};
