import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground, BackHandler, Alert } from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import Form from './FormScreen/FormRegistration';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import LogoTextHT from '../../common/components/LogoTextHT';
import { Images } from "../components/images";
import { LOGIN } from "../router";
import Trans from "../../common/containers/Trans";

class Registration extends Component {
    constructor(){
        super();
        this.state = {
            editing: true
        }
    }

    onBack = () => {
        if (this.state.editing) {
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('general.close_App'),
                [
                    { text: Trans.tran('general.yes'), onPress: () => BackHandler.exitApp() },
                    { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
            return true;
        }

        return false;

    };

    render() {

        const { navigate } = this.props.navigation;
        const resetAction = this.props.navigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'LOGIN'
                })
            ]
        });
        return (
            <HandleBack onBack={this.onBack}>
                <ImageBackground style={styles.backgroundImage}
                       source={Images.bgRegister}>
                    <View style={styles.containerLogo}>
                        <LogoTextHT colorMain={'#000'} color={'#fff'} />
                    </View>
                    <Form nameRegistration={Trans.tran('User.register')} keyScreen={navigate}/>
                    <View style={styles.signupTextCont}>
                        <CommonText text={Trans.tran('User.already_account')} style={styles.signupText} />
                        <TouchableOpacity onPress={ () => this.props.navigation.dispatch(resetAction)}>
                            <CommonText text={Trans.tran('User.login')} style={styles.signupButton} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </HandleBack>
        );
    }
}

Registration.navigationOptions  = ({navigation}) => ({
    headerStyle: {
        backgroundColor: '#068e81',
        elevation: 0
    },
});

const styles = StyleSheet.create({
    backgroundImage: {
        paddingTop: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    containerLogo: {
        flex: 1,
        marginBottom: 30
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
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
        fontSize: 16
    },
    signupButton: {
        color: '#068e81',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 5
    },
});

export default connect(
    null,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(withNavigation(Registration));
