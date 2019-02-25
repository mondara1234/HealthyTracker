import { Alert } from "react-native";
import { SERVER_URL } from "../../../common/constants";

export const fetchSearchTrickAll = () => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/ShowTrickAll.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};

export const fetchSearchTrickNew = (dateNow) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/SeachTrickNew.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            datenow : dateNow
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};

export const fetchSearchTrickRank = () => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/SeachTrickRank.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};

export const fetchSearchUserLikeTrick = (UserNames,trickIDs) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/SearchUserLikeTrick.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            trickid: trickIDs
        })
    }).then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};

export const DeleteUserLikeTrick = (UserNames,trickIDs) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/DeleteUserLikeTrick.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            trickid: trickIDs
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });

};

export const InsertUserLikeTrick = (UserNames,trickIDs) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/InsertUserLikeTrick.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserNames,
            trickid: trickIDs
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });

};

export const UpdateLikeTrick = (trickIDs,trickLikes) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/UpdateLikeTrick.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trickid: trickIDs,
            tricklike: trickLikes
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });

};


export const SearchTrickID = (trickIDs) => dispatch => {
    return fetch(`${SERVER_URL}/My_SQL/Trick/SearchTrickID.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trickid: trickIDs
        })
    }).then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });

};