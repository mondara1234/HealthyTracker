import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

class FormEdit extends Component {

    DeleteStudentRecord = () =>{
        fetch('localhost/My_SQL/DeleteData.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id : this.props.GetInput_ID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
            }).catch((error) => {
            console.error(error);
        });
    }

    render(){
        return(
            <View >
                <TouchableOpacity style={styles.button} onPress={this.DeleteStudentRecord} >
                    <Text style={styles.buttonText}>  DELETE DATA ID : {this.props.GetInput_ID} </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }

});

export default FormEdit;
