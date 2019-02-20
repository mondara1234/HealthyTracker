import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const fetchSearchFoodUser = (UserNames, dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/SeachFoodUser.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            userName: UserNames,
            dateDiary: dateNow
        })
    }).then((response) => response.json())
        .then((responseJson) => responseJson )
        .catch((error) => {
        console.error(error);
    });
};

export const fetchSearchFoodName = (UserNames, dateNow, FoodName) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/SeachFoodName.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            userName: UserNames,
            dateDiary: dateNow,
            foodname: FoodName
        })
    }).then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
};

export const fetchInsert = (UserNames, FoodName, FoodCalorie, FoodIMG, FoodUnit, numberFood, dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/InsertFoodUser.php`, {
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
            dateadd: dateNow
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });
};

export const fetchUpdateFoodUser = (UserNames, FoodCalorie, numberFood, dateNow, FoodName) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/UpdateFoodUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username : UserNames,
            foodcalorie : FoodCalorie,
            numberfood : numberFood,
            dateadd: dateNow,
            foodname: FoodName,
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
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
            console.log('error:', error);
            let num = 0;
            return num;
        });
};

export const fetchDeleteFoodName = (UserNames, FoodName, dateFormat) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/DeleteFoodName.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            foodname: FoodName,
            dateadd: dateFormat
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            responseJson
        }).catch((error) => {
            console.error(error);
        });
};

export const fetchSeachEenergyUser = (UserNames,dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/SeachEenergyUser.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            userName: UserNames,
            dateDiary: dateNow
        })
    }).then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
};

export const fetchInsertEenergy = (UserNames, Energy, Unit, dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/InsertSumCalorie.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            energy : Energy,
            unit: Unit,
            datediary: dateNow,
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });
};

export const fetchUpdateEenergyUser = (UserNames, Energy, Unit, dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/foodDiary/UpdateEenergyUser.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            energy : Energy,
            unit: Unit,
            datediary: dateNow,
        })
    }).then(response => response.json())
        .then((responseJson) =>
            console.log(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });
};