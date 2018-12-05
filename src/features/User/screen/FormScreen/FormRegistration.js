import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

class FormRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInput_Name: '',
            TextInput_Password: '',
            TextInput_Email: '',
        }
    }

    InsertStudentRecordsToServer = () =>{
        fetch('http://localhost/My_SQL/InsertData.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name : this.state.TextInput_Name,
                password : this.state.TextInput_Password,
                email: this.state.TextInput_Email
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
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="UserName"
                           placeholderTextColor = "#ffffff"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Name : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Email"
                           placeholderTextColor = "#ffffff"
                           keyboardType="email-address"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Password"
                           secureTextEntry={true}
                           placeholderTextColor = "#ffffff"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }
                />
                <TouchableOpacity style={styles.button} onPress={this.InsertStudentRecordsToServer}>
                    <Text style={styles.buttonText} >{this.props.nameRegistration}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
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

export default FormRegistration;