import React, { Component } from 'react';
import {StyleSheet, Alert, Text, View, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { requestApiData } from "../redux/actions";
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
            UserPassword: ''
        }
    }

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
            <ImageBackground style={styles.backgroundImage}
                             source={Images.bgLogin}>
                <View style={{marginTop: -20}}>
                    <HeaderLeftMenu icon={'arrow-back'} color={'#000'}  onPress={() => goBack()} />
                </View>
                <View style={styles.containerRow}>
                    <Text style={styles.titleLogin}> {'LOGIN'}</Text>
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
                            <Text style={styles.textForgot}> {'ลืมรหัสผ่าน ?'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} //onPress={this.UserLoginFunction}
                                      onPress={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}>
                        <Text style={styles.buttonText} > {'Login'} </Text>
                    </TouchableOpacity>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>{'คุณมีบัญชีแล้วหรือยัง ?'}</Text>
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate(REGISTRATION)}>
                            <Text style={styles.signupButton}> {'สมัครสมาชิก'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

LoingScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    backgroundImage: {
        paddingTop: 20,
        flex: 1,
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
        fontSize: 14,
    },
    TouchForgot: {
        marginLeft: '50%'
    },
    containerForgot: {
        width:  200,
        marginLeft: 10,
    },
    containerView: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    signupTextCont: {
        flex: 1,
        marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#F4F4F4',
        fontSize: 16,
        fontWeight: '500'
    },
    inputBox: {
        width: 200,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#068e81',
        fontSize: 16,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5
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

