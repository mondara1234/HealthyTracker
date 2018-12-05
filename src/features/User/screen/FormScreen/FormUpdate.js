import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ListView} from 'react-native';

class FormUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TextInput_ID: this.props.GetInput_ID,
            isLoading: true,
            dataSourceName: '',
            dataSourceEmail: '',
            dataSourcePassword: '',
        }
    }

    componentDidMount() {
        fetch('http://localhost/My_SQL/ShowOneDataList.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.TextInput_ID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSourceName: responseJson[0].name,
                        dataSourceEmail: responseJson[0].email,
                        dataSourcePassword: responseJson[0].password,
                    }, function () {
                    });
            }).catch((error) => {
            console.error(error);
        });
    }

    UpdateStudentRecord = () =>{
        fetch('http://192.168.1.30/My_SQL/UpdateData.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id : this.state.TextInput_ID,
                name : this.state.dataSourceName,
                password : this.state.dataSourcePassword,
                email: this.state.dataSourceEmail
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

            <View style={styles.container}>
                <TextInput
                    placeholder="Name Shows Here"
                    value={this.state.dataSourceName}
                    onChangeText={ TextInputValue => this.setState({ dataSourceName : TextInputValue }) }
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    style={styles.inputBox}
                />
                <TextInput
                    value={this.state.dataSourceEmail }
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    placeholder="Email Shows Here"
                    onChangeText={ TextInputValue => this.setState({ dataSourceEmail : TextInputValue }) }
                    style={styles.inputBox}
                />
                <TextInput
                    value={this.state.dataSourcePassword}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    placeholder="Password Shows Here"
                    onChangeText={ TextInputValue => this.setState({ dataSourcePassword : TextInputValue }) }
                    style={styles.inputBox}
                />
                <TouchableOpacity style={styles.button} onPress={this.UpdateStudentRecord} >
                    <Text style={styles.buttonText}> UPDATE STUDENT RECORD </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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

export default FormUpdate;