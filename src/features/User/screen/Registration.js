import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { withNavigation } from "react-navigation";
import Form from './FormScreen/FormRegistration';
import Logo from '../components/Logo';
import { LOGIN } from "../router";

class Registration extends Component {

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Logo Title="WECOME MyAPP"/>
                <Image  style={styles.Image}
                        source={require('../../../../pulic/assets/images/user.png')}/>
                <Form nameRegistration="ลงทะเบียน" />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>{'คุณมีบัญชีแล้วหรือยัง ?'}</Text>
                    <TouchableOpacity onPress={ () => navigate({routeName: LOGIN})}>
                        <Text style={styles.signupButton}> {'Login'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

Registration.navigationOptions  = ({navigation}) => ({
    header:  null
});

const styles = StyleSheet.create({
    container : {
        paddingTop: 40,
        backgroundColor: '#F4F4F4',
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
    },
    Image: {
        width: 100,
        height: 100,
        marginVertical: 15
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 14
    },
    signupButton: {
        color: '#068e81',
        fontSize: 18,
        fontWeight: '500'
    },
});

export default withNavigation(Registration);
