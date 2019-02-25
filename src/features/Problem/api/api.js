import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";
import Trans from "../../common/containers/Trans";

export const InsertProblem = (UserNames, dateFormat, Title, Img, Type, Detail) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Problem/InsertProblem.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: Title,
            type: Type,
            detail: Detail,
            img: Img,
            username: UserNames,
            date: dateFormat
        })
    }).then((response) => response.json())
        .then((responseJson) => {
                Alert.alert(
                    Trans.tran('general.alert'),
                    responseJson,
                    [
                        { text: Trans.tran('general.close'), onPress: () => {}, style: "cancel" }
                    ],
                    { cancelable: false },
                );
        }).catch((error) => {
            console.error(error);
        });

};