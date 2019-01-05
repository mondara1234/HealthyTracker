import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground, BackHandler, Alert } from 'react-native';
import { withNavigation } from "react-navigation";
import Form from './FormScreen/FormRegistration';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import LogoTextHT from '../../common/components/LogoTextHT';
import { Images } from "../components/images";
import { LOGIN } from "../router";

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
                "แจ้งเตือน",
                "คุณต้องการปิด App ใช่ไหม?",
                [
                    { text: "ปิด", onPress: () => BackHandler.exitApp() },
                    { text: "ยกเลิก", onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
            return true;
        }

        return false;

    };

    render() {

        const { navigate } = this.props.navigation;

        return (
            <HandleBack onBack={this.onBack}>
                <ImageBackground style={styles.backgroundImage}
                       source={Images.bgRegister}>
                    <View style={styles.containerLogo}>
                        <LogoTextHT colorMain={'#000'} color={'#fff'} />
                    </View>
                    <Form nameRegistration="ลงทะเบียน" keyScreen={navigate}/>
                    <View style={styles.signupTextCont}>
                        <CommonText text={'คุณมีบัญชีแล้วหรือยัง ?'} style={styles.signupText} />
                        <TouchableOpacity onPress={ () => navigate({routeName: LOGIN})}>
                            <CommonText text={'เข้าสู่ระบบ'} style={styles.signupButton} />
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

export default withNavigation(Registration);
