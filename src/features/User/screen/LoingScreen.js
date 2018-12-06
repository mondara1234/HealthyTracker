import React, { Component } from 'react';
import {StyleSheet, Alert, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { requestApiData } from "../redux/actions";
import Logo from '../components/Logo';
import {getNews, getAllFlights} from '../redux/actions';
import * as API from '../api/api';

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

      RegistrationFunction = () =>{
        this.props.navigation.navigate('REGISTRATION');
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
                               placeholderTextColor = "#ffffff"
                               selectionColor="#fff"
                               keyboardType="email-address"
                               onChangeText={UserEmail =>this.setState({UserEmail})}
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Password"
                               secureTextEntry={true}
                               placeholderTextColor = "#ffffff"
                               onChangeText={UserPassword =>this.setState({UserPassword})}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.UserLoginFunction}>
                        <Text style={styles.buttonText} > {'Login'} </Text>
                    </TouchableOpacity>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>Don't have an account yet?</Text>
                        <TouchableOpacity onPress={this.RegistrationFunction}>
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
    container : {
        paddingTop:60,
        backgroundColor:'#F4F4F4',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    containerView : {
        flex: 1,
        marginTop: 65,
        justifyContent:'center',
        alignItems: 'center'
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    },
    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }
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

