import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Form from './FormScreen/FormRegistration';

class Registration extends Component {

    GoTo_Show_StudentList_Activity_Function = () =>
    {
        this.props.navigation.navigate('SHOWLIST');
    };

    render() {
        return (
            <View style={styles.container}>
                <Image  style={{width:120, height: 120}}
                        source={require('../../../../pulic/assets/images/user.png')}/>
                <Form nameRegistration="Registration" />
                <TouchableOpacity style={styles.button} onPress={this.GoTo_Show_StudentList_Activity_Function}>
                    <Text style={styles.buttonText} >{ 'ShowAllData' }</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

Registration.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container : {
        paddingBottom: 60,
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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

export default  Registration;
