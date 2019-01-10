import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";
import {LOGIN} from "../../User/router";

export function fetchAllMenuFood() {
    return fetch(`${SERVER_URL}/My_SQL/MenuFood/AllMenuFood.php`)
        .then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
}

export const fetchInsert = (UserNames, FoodName, FoodCalorie, FoodIMG, FoodUnit, numberFood, dateADD) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/MenuFood/InsertFoodUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            foodname: FoodName,
            foodcalorie: FoodCalorie,
            foddimg: FoodIMG,
            foodunit: FoodUnit,
            numberfood: numberFood,
            dateadd: dateADD
        })
    }).then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });

};
