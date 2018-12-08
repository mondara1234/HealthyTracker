import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { withNavigation } from "react-navigation";
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Logo from '../components/Logo';
import { Images } from "../components/images";
import { LOGIN, REGISTRATION } from "../router";

class HomeLoingScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Logo Title="Healthy MyApp"/>
                <View style={styles.containerView}>
                    <TouchableOpacity
                        style={styles.buttonLogin}
                        onPress={ () => navigate({routeName: LOGIN})}
                    >
                        <View style={styles.containerButton}>
                            <IconEntypo name="login" size={30} style={styles.styleIconEntypo} />
                            <Text style={styles.textLogin}> {'เข้าสู่ระบบ'} </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonRegister}
                        onPress={ () => navigate({routeName: REGISTRATION})}
                    >
                        <View style={styles.containerButton}>
                            <IconFontAwesome name="registered" size={30} style={styles.styleIconFontAwesome} />
                            <Text style={styles.textRegister}> {'สมัครสมาชิก'} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Image  style={styles.imgFood} source={Images.foodhome} />
            </View>
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
        color: '#000'
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

