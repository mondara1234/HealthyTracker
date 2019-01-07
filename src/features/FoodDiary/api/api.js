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

export const fetchSearchFoodUser = (UserNames, dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/SeachFoodUser.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            userName: UserNames,
            dateDiary: dateNow,
        })
    }).then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
        console.error(error);
    });

};