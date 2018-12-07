import React, { Component } from 'react';
import {StyleSheet, Alert, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { requestApiData } from "../redux/actions";
import Logo from '../components/Logo';
import {getNews, getAllFlights} from '../redux/actions';
import * as API from '../api/api';
import { FORGOTPASSWORD, REGISTRATION } from "../router";

class LoingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            UserEmail: '',
            UserPassword: ''
        }
    }

    componentDidMount(){
        this.props.FETCH_DATA();
    }

    UserLoginFunction = () =>{
        const Email = this.state.UserEmail ;
        const Password = this.state.UserPassword ;
        const keyScreen = this.props.navigation;
        this.props.Flights_DATA(Email,Password , keyScreen);
    };

    render() {
            console.log('Update Store:',this.props);
        return (
            <View style={styles.container}>
                <Logo Title="WECOME MyAPP"/>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(FORGOTPASSWORD)}>
                        <Text style={styles.signupButton}> {'ลืมรหัสผ่าน ?'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.UserLoginFunction}>
                        <Text style={styles.buttonText} > {'Login'} </Text>
                    </TouchableOpacity>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>Don't have an account yet?</Text>
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate(REGISTRATION)}>
                            <Text style={styles.signupButton}> {'Signup'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

LoingScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerView : {
        flex: 1,
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center'
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
        color: '#000',
        fontSize: 16,
        fontWeight: '500'
    },
    inputBox: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        fontSize: 16,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5
    },
    button: {
        width: 250,
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

