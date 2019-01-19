import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export function fetchAllMenuFood() {
    return fetch(`${SERVER_URL}/My_SQL/MenuFood/AllMenuFood.php`)
        .then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
}

