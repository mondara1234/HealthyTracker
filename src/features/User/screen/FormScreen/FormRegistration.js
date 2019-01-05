import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';;
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonText from '../../../common/components/CommonText'
import * as API from '../../api/api';
import { Images } from "../../components/images";
import {SERVER_URL} from "../../../../common/constants";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";

class FormRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TextInput_Name: '',
            TextInput_Password: '',
            TextInput_Email: '',
            TextInput_PasswordAgain: '',
            ImgDefault: 'https://pngimage.net/wp-content/uploads/2018/06/user-avatar-png-6.png',
            ImgProfile: null,
            data: null,
            filename: null,
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
               const ImgProfile = this.state.ImgDefault ? this.state.ImgDefault : this.state.ImgProfile;
               const keyScreens = this.props.keyScreen;

               this.props.Flights_Register(Name, Email, Password, ImgProfile, keyScreens);
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

    selectPhotoTapped() {

        const options = {
            title: 'เลือกรูปภาพ',
            cancelButtonTitle: 'ปิด',
            takePhotoButtonTitle: 'ถ่ายรูป',
            chooseFromLibraryButtonTitle: 'เลือกรูปจากคลัง',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            mediaType: 'photo'
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.uri) {
                return;
            }
            //let source = { uri: response.uri };

            // You can also display the image using data:
             let source = 'data:image/jpeg;base64,'+response.data ;

            console.log(source);
            console.log(response.uri);
            console.log(response.data);
            console.log(response.fileName);

            this.setState({
                ImgProfile: source,
                data: response.data,
                filename: response.fileName
            });
        })
    }

    uploadPhoto(){
        RNFetchBlob.fetch('POST', `${SERVER_URL}/My_SQL/upload.php`, {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
        }, [
            { name : 'fileToUpload', filename : this.state.filename, type: 'image/jpeg', data: this.state.data},
            console.log('Data',this.state.data)
        ]).then((resp) => {
            console.log('resp ='+ resp);
        }).catch((err) => {
            console.log('errror = '+ err);
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Image  style={styles.imageUser}
                        source={this.state.ImgProfile ? {uri: this.state.ImgProfile} :
                            {uri: this.state.ImgDefault}} />
                <TouchableOpacity style={styles.touchImage} onPress={this.selectPhotoTapped.bind(this)}>
                    <Image  style={styles.image}
                            source={Images.plusImg}
                    />
                </TouchableOpacity>
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
    },
    imageUser: {
        width: 120,
        height: 120,
        marginTop: 30
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
        servers: state.data
    };
}

export default connect(mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        Flights_Register: bindActionCreators(API.fetchRegister, dispatch),
    })
)(FormRegistration);