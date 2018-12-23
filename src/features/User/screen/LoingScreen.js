import React, { Component } from 'react';
import {StyleSheet, Alert, Text, View, TouchableOpacity, TextInput, ImageBackground, BackHandler} from 'react-native';
import { Container, Content, Footer } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { requestApiData } from "../redux/actions";
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import Logo from '../components/Logo';
import {getNews, getAllFlights} from '../redux/actions';
import * as API from '../api/api';
import { FORGOTPASSWORD, REGISTRATION } from "../router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import {Images} from "../../User/components/images";

class LoingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            UserEmail: '',
            UserPassword: '',
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

    /*componentDidMount(){
        this.props.FETCH_DATA();
    }*/

    UserLoginFunction = () =>{
        const Email = this.state.UserEmail ;
        const Password = this.state.UserPassword ;
        const keyScreen = this.props.navigation;
        this.props.Flights_DATA(Email,Password , keyScreen);
    };

    render() {

        const { goBack } = this.props.navigation;
        console.log('Update Store:',this.props);

        return (
            <HandleBack onBack={this.onBack}>
                <Container style={styles.container} >
                    <ImageBackground style={styles.backgroundImage}
                                     source={Images.bgLogin}>
                        <Content padder>
                            <View style={{marginTop: -20}}>
                                <HeaderLeftMenu icon={'arrow-back'} color={'#000'}  onPress={() => goBack()} />
                            </View>
                            <View style={styles.containerRow}>
                                <CommonText text={'LOGIN'} style={styles.titleLogin} />
                                <Logo Title="Healthy MyApp"/>
                            </View>
                            <View style={styles.containerView}>
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder="Email"
                                           placeholderTextColor = "#068e81"
                                           selectionColor="#fff"
                                           keyboardType="email-address"
                                           onChangeText={UserEmail =>this.setState({UserEmail})}
                                />
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder="Password"
                                           secureTextEntry={true}
                                           placeholderTextColor = "#068e81"
                                           onChangeText={UserPassword =>this.setState({UserPassword})}
                                />
                                <View style={styles.containerForgot}>
                                    <TouchableOpacity style={styles.TouchForgot}
                                                      onPress={() => this.props.navigation.navigate(FORGOTPASSWORD)}>
                                        <CommonText text={'ลืมรหัสผ่าน ?'} style={styles.textForgot} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerForgot}>
                                    <TouchableOpacity style={styles.button} //onPress={this.UserLoginFunction}
                                                      onPress={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}>
                                        <CommonText text={'Login'} style={styles.buttonText} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Content>
                    </ImageBackground>
                    <View style={styles.signupTextCont}>
                        <CommonText text={'คุณมีบัญชีแล้วหรือยัง ?'} style={styles.signupText} />
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate(REGISTRATION)}>
                            <CommonText text={'สมัครสมาชิก'} style={styles.signupButton} />
                        </TouchableOpacity>
                    </View>
                </Container>
            </HandleBack>
        )
    }
}

LoingScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: {
        paddingTop: 20,
        flex: 1,
        width: '100%',
        height: '100%'
    },
    containerRow: {
        flexDirection: 'row',
    },
    titleLogin: {
        color: '#068e81',
        fontSize: 30,
        marginLeft: 10
    },
    textForgot: {
        color: '#000',
        fontSize: 16,
    },
    TouchForgot: {
        marginLeft: '50%'
    },
    containerForgot: {
        width:  200,
        alignItems: 'center' ,
        justifyContent: 'center'
    },
    containerView: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    signupTextCont: {
        position: 'absolute',
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 18
    },
    signupButton: {
        color: '#F4F4F4',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 5
    },
    inputBox: {
        width: 200,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#068e81',
        fontSize: 18,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5,
        justifyContent: 'center'
    },
    button: {
        width: 150,
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
});

function mapStateToProps(state) {
    return{
        servers: state.data
    };
}

export default connect(mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_DATA: bindActionCreators(getNews, dispatch),
        Flights_DATA: bindActionCreators(API.fetchTodo, dispatch),
    })
)(LoingScreen);

