import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";
//ไมไ่ด้ใช้+sagas
export function fetchAllFoodUser() {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/AllFoodUser.php`)
        .then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
}

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

export const fetchSumCalorieFoodUser = (UserNames, dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/SumCalorieFoodUser.php`, {
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