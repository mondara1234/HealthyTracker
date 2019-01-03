import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';;
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonText from '../../../common/components/CommonText'
import * as API from '../../api/api';

class FormRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TextInput_Name: '',
            TextInput_Password: '',
            TextInput_Email: '',
            TextInput_PasswordAgain: ''
        }
    }

    InsertStudentRecordsToServer = () =>{
       if(this.state.TextInput_Name === ''||this.state.TextInput_Email === ''||this.state.TextInput_Password === ''|| this.state.TextInput_PasswordAgain === '' ){
           Alert.alert(
               "แจ้งเตือน",
               "กรุณากรอกให้ครบ",
               [
                   { text: "ปิด", onPress: () => {}, style: "cancel" },
               ],
               { cancelable: false },
           );
       }else{
           if(this.state.TextInput_Password === this.state.TextInput_PasswordAgain ){
               const Name = this.state.TextInput_Name;
               const Email = this.state.TextInput_Email;
               const Password = this.state.TextInput_Password;
               const keyScreens = this.props.keyScreen;

               this.props.Flights_Register(Name, Email, Password, keyScreens);
           }else{
               Alert.alert(
                   "แจ้งเตือน",
                   "รหัสผ่าน ทั้ง 2 ช่อง ไม่ตรงกัน",
                   [
                       { text: "ปิด", onPress: () => {}, style: "cancel" },
                   ],
                   { cancelable: false },
               );
           }
       }
    };

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="UserName"
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Name : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Email"
                           placeholderTextColor = "#068e81"
                           keyboardType="email-address"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Password"
                           secureTextEntry={true}
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="ยืนยัน Password"
                           secureTextEntry={true}
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue }) }
                />
                <TouchableOpacity style={styles.button} onPress={this.InsertStudentRecordsToServer}>
                    <View style={styles.containerButton}>
                        <IconFontAwesome name="registered" size={30} style={styles.styleIconFontAwesome} />
                        <CommonText text={this.props.nameRegistration} style={styles.buttonText} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#068e81',
        fontSize: 18,
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
    styleIconFontAwesome: {
        marginRight: 40,
        color: '#fff'
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        Flights_Register: bindActionCreators(API.fetchRegister, dispatch),
    })
)(FormRegistration);