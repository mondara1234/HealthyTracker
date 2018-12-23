import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler, Alert } from 'react-native';
import { withNavigation } from "react-navigation";
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Logo from '../components/Logo';
import { Images } from "../components/images";
import { LOGIN, REGISTRATION } from "../router";

class HomeLoingScreen extends Component {
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
                <View style={styles.container}>
                    <Logo Title="Healthy MyApp"/>
                    <View style={styles.containerView}>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={ () => navigate({routeName: LOGIN})}
                        >
                            <View style={styles.containerButton}>
                                <IconEntypo name="login" size={30} style={styles.styleIconEntypo} />
                                <CommonText text={'เข้าสู่ระบบ'} style={styles.textLogin} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonRegister}
                            onPress={ () => navigate({routeName: REGISTRATION})}
                        >
                            <View style={styles.containerButton}>
                                <IconFontAwesome name="registered" size={30} style={styles.styleIconFontAwesome} />
                                <CommonText text={'สมัครสมาชิก'} style={styles.textRegister} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Image  style={styles.imgFood} source={Images.foodhome} />
                </View>
            </HandleBack>
        )
    }
}

HomeLoingScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerView : {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLogin: {
        width: 300,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#068e81'
    },
    buttonRegister: {
        width: 300,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#068e81',
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    textLogin: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff'
    },
    textRegister: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81'
    },
    styleIconFontAwesome: {
        marginRight: 40,
        color: '#068e81'
    },
    styleIconEntypo: {
        marginRight: 60,
        color: '#fff'
    },
    imgFood: {
        flex: 1,
        width: '100%',
        height: 80
    }
});

export default withNavigation(HomeLoingScreen);

