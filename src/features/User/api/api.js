import * as actionTypes from '../redux/actions';
import axios from '../redux/axios';
import {Alert} from "react-native";
import { getAllFlights } from "../redux/actions";


export function fetchPostsApi() {
    return fetch(`http://192.168.1.4/My_SQL/ShowAllDataList.php`)
        .then(response => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => {
            console.error(error);
        });
}

export const fetchTodo = (Email, Password, keyScreen) => dispatch => {
    return fetch('http://localhost/My_SQL/User_Login.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: Email,
            password: Password
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'Data Matched')
            {
                keyScreen.navigate('FOODDIARY_SCREEN')
            }
            else{
                Alert.alert('Error',responseJson);
            }
        }).catch((error) => {
            console.error(error);
        });

};

export const fetchTodoss = (Email, Password, keyScreen) => dispatch => {
    return fetch('http://192.168.1.4/My_SQL/User_Login.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: Email,
            password: Password
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'Data Matched')
            {
                let todos = 'Data Matched';
                dispatch(getAllFlights(todos))
            }
            else{
                let todos = responseJson;
                dispatch(getAllFlights(todos))
            }
        }).catch((error) => {
            console.error(error);
        });

};


const getDataSuccess = (data) => {
    return {
        type: actionTypes.GET_DATA_SUCCESS,
        data: data
    }
};

export const getData = (url, props) => {
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                dispatch(getDataSuccess(response.data));
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
    }
}
const postDataSuccess = (response) => {
    return {
        type: actionTypes.POST_DATA_SUCCESS,
        response: response
    }
}

export const postData = (url, obj, props) => {
    return (dispatch) => {
        axios.post(url, obj)
            .then(response => {
                dispatch(postDataSuccess(response));
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
    }
}

const putDataSuccess = (response) => {
    return {
        type: actionTypes.PUT_DATA_SUCCESS,
        response: response
    }
}

export const putData = (url, obj, props) => {
    return (dispatch) => {
        axios.put(url, obj)
            .then(response => {
                dispatch(putDataSuccess(response));
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
    }
}

const deleteDataSuccess = (response) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        response: response
    }
}

export const deleteData = (url, props) => {
    return (dispatch) => {
        axios.delete(url)
            .then(response => {
                dispatch(deleteDataSuccess(response));
            })
            .catch(error => {
                //TODO: handle the error when implemented
            })
    }
}