import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

class FormRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TextInput_Name: '',
            TextInput_Password: '',
            TextInput_Email: '',
            TextInput_PasswordAgain: ''
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
    };

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="UserName"
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Name : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Email"
                           placeholderTextColor = "#068e81"
                           keyboardType="email-address"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Password"
                           secureTextEntry={true}
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="ยืนยัน Password"
                           secureTextEntry={true}
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue }) }
                />
                <TouchableOpacity style={styles.button} onPress={this.InsertStudentRecordsToServer}>
                    <View style={styles.containerButton}>
                        <IconFontAwesome name="registered" size={30} style={styles.styleIconFontAwesome} />
                        <Text style={styles.buttonText} >{this.props.nameRegistration}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        fontSize: 16,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5
    },
    button: {
        width: 250,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#068e81'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    styleIconFontAwesome: {
        marginRight: 40,
        color: '#000'
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FormRegistration;