import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, TextInput, ImageBackground, BackHandler, Keyboard  } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import Logo from '../components/Logo';
import Trans from "../../common/containers/Trans";
import { getOneUser } from '../redux/actions';
import * as API from '../api/api';
import { FORGOTPASSWORD, REGISTRATION } from "../router";

class LoingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            User: '',
            UserPassword: '',
            editing: true,
            data_User: []
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

    UserLoginFunction = async() =>{
        Keyboard.dismiss();
        if(this.state.User === '' || this.state.UserPassword === '' ){
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('general.please_Complete'),
                [
                    { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
        }else{

            const username = this.state.User;
            const UserNames = `${username}`;
            const Password = this.state.UserPassword;
            const keyScreen = this.props.navigation;
            const response = await this.props.FETCH_Login(UserNames, Password);
            if(response === 'Data Matched')
            {
                const result = await this.props.FETCH_ShowUser(UserNames);
                const personalSelect = result.map((data) => {return data.PersonalSelect});
                this.props.REDUCER_ONEDATA(result);
                if(`${personalSelect}` === 'on'){
                    keyScreen.navigate('PRAVIEDKEY');
                }else{
                    keyScreen.navigate('FOODDIARY_SCREEN')
                }
            }
            else{
                Alert.alert('Error',response);
            }

        }
    };

    render() {

        const resetAction = this.props.navigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'REGISTRATION'
                })
            ]
        });

        return (
            <HandleBack onBack={this.onBack}>
                <Container style={styles.container} >
                    <ImageBackground style={styles.backgroundImage}
                                     source={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIiH0R.png'}}>
                        <Content padder>
                            <View style={styles.containerRow}>
                                <CommonText text={Trans.tran('User.login')} style={styles.titleLogin} />
                            </View>
                            <View style={{marginTop: -20, paddingLeft: 10}}>
                                <Logo Title="Healthy MyApp"/>
                            </View>
                            <View style={styles.containerView}>
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder={Trans.tran('User.userName')}
                                           placeholderTextColor = "#068e81"
                                           selectionColor="#fff"
                                           onChangeText={UserName =>this.setState({User: UserName})}
                                />
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder={Trans.tran('User.password')}
                                           secureTextEntry={true}
                                           placeholderTextColor = "#068e81"
                                           onChangeText={UserPassword =>this.setState({UserPassword: UserPassword})}
                                />
                                <View style={styles.containerForgot}>
                                    <TouchableOpacity style={styles.button} onPress={this.UserLoginFunction}>
                                        <CommonText text={Trans.tran('User.login')} style={styles.buttonText} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Content>
                    </ImageBackground>
                    <View style={styles.signupTextCont}>
                        <CommonText text={Trans.tran('User.already_account')} style={styles.signupText} />
                        <TouchableOpacity onPress={() =>  this.props.navigation.dispatch(resetAction)}>
                            <CommonText text={Trans.tran('User.register')} style={styles.signupButton} />
                        </TouchableOpacity>
                    </View>
                </Container>
            </HandleBack>
        )
    }
}

LoingScreen.navigationOptions  = ({navigation}) => ({
    headerTransparent: true,
    headerTintColor: '#000',
    headerStyle: {
        backgroundColor: 'transparent'
    }
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
        fontSize: 24,
        marginLeft: 10
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
        justifyContent: 'center',
        paddingBottom: 5
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
        Users: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_ONEDATA: bindActionCreators(getOneUser, dispatch),
        FETCH_Login: bindActionCreators(API.fetchLogin, dispatch),
        FETCH_ShowUser: bindActionCreators(API.fetchSearchUser, dispatch),
    })
)(LoingScreen);
