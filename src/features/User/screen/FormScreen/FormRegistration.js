import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import ImagePicker from "react-native-image-picker";
import Trans from "../../../common/containers/Trans";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonText from '../../../common/components/CommonText'
import * as API from '../../api/api';
import { Images } from "../../components/images";
import moment from "moment/moment";

class FormRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInput_Name: '',
            TextInput_Password: '',
            TextInput_Email: '',
            TextInput_PasswordAgain: '',
            ImgDefault: 'https://pngimage.net/wp-content/uploads/2018/06/user-avatar-png-6.png',
            ImageSource: null,
            data: null,
            fileName: ''
        }
    }

    InsertStudentRecordsToServer = () =>{
       if(this.state.TextInput_Name === ''||this.state.TextInput_Email === ''||this.state.TextInput_Password === ''|| this.state.TextInput_PasswordAgain === '' ){
           Alert.alert(
               Trans.tran('general.alert'),
               Trans.tran('general.please_Complete'),
               [
                   { text: Trans.tran('general.close'), onPress: () => {}, style: "cancel" },
               ],
               { cancelable: false },
           );
       }else{
           if(this.state.TextInput_Password === this.state.TextInput_PasswordAgain ){
               let date = new Date();
               let dateFormat = moment(date).format("YYYY-MM-DD");
               const Name = this.state.TextInput_Name;
               const Email = this.state.TextInput_Email;
               const Password = this.state.TextInput_Password;
               const ImgProfile = this.state.ImageSource ? 'data:image/jpeg;base64,'+this.state.data : this.state.ImgDefault;
               const keyScreens = this.props.keyScreen;
               this.props.Flights_Register(Name, Email, Password, ImgProfile, keyScreens, dateFormat);
           }else{
               Alert.alert(
                   Trans.tran('general.alert'),
                   Trans.tran('general.password_not_Match'),
                   [
                       { text: Trans.tran('general.close'), onPress: () => {}, style: "cancel" },
                   ],
                   { cancelable: false },
               );
           }
       }
    };

    selectPhotoTapped() {

        const options = {
            title: Trans.tran('Problem.choose_picture'),
            cancelButtonTitle: Trans.tran('general.canceled'),
            takePhotoButtonTitle: Trans.tran('Problem.photograph'),
            chooseFromLibraryButtonTitle: Trans.tran('Problem.picture_library'),
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            mediaType: 'photo'
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    ImageSource: source,
                    data: response.data,
                    fileName: response.fileName
                });
            }
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <Thumbnail  style={styles.imageUser}
                        source={this.state.ImageSource != null ? this.state.ImageSource :
                            {uri: this.state.ImgDefault}} />
                <TouchableOpacity style={styles.touchImage} onPress={this.selectPhotoTapped.bind(this)}>
                    <Image  style={styles.image}
                            source={Images.plusImg}
                    />
                </TouchableOpacity>
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder={Trans.tran('User.userName')}
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Name : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder={Trans.tran('User.email')}
                           placeholderTextColor = "#068e81"
                           keyboardType="email-address"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder={Trans.tran('User.password')}
                           secureTextEntry={true}
                           placeholderTextColor = "#068e81"
                           onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder={Trans.tran('User.confirm_password')}
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
        marginVertical: 5,
        paddingBottom: 5
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
    },
    imageUser: {
        width: 120,
        height: 120,
        marginTop: 30,
        borderRadius: 80
    },
    touchImage: {
        marginTop: -30,
        marginLeft: 90,
        marginBottom: 20
    },
    image: {
        width: 30,
        height: 30
    },
});

function mapStateToProps(state) {
    return{
        servers: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        Flights_Register: bindActionCreators(API.fetchRegister, dispatch),
    })
)(FormRegistration);