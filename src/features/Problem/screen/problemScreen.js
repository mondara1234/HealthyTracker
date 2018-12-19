import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, TextInput} from 'react-native';
import { Container, Footer, FooterTab, Picker, Content, Textarea, Form } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../../BMI/router";
import {TRICK_SCREEN} from "../../Trick/router";
import RNFetchBlob from "react-native-fetch-blob";
import ImagePicker from "react-native-image-picker";

class problemScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            imageSource: null,
            data: null,
            filename: null,
            selected: undefined
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

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
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                imageSource: source,
                data: response.data,
                filename: response.fileName
            });
        })
    }
    uploadPhoto(){
        RNFetchBlob.fetch('POST', 'http://192.168.1.28/My_SQL/upload.php', {
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

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Content>
                        <Text style={styles.textTitle}>{'แจ้งปัญหา'}</Text>
                        <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 20 , marginHorizontal: 20}}>{'ชื่อหัวข้อ'}</Text>
                            <TextInput style={styles.inputBox}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       placeholder="ชื่อหัวข้อปัญหา"
                                       secureTextEntry={true}
                                       placeholderTextColor = "#068e81"
                                       onChangeText={UserPassword =>this.setState({UserPassword})}
                            />
                        </View>
                        <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 20 , marginHorizontal: 20}}>{'ประเภท'}</Text>
                            <Picker
                                mode="dropdown"
                                style={{ width: 240 }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="เลือกประเภทของปัญหา" value="null" />
                                <Picker.Item label="ระบบไม่สเถียน" value="Error1" />
                                <Picker.Item label="serverมีปัญหา" value="Error2" />
                                <Picker.Item label="เจอBug" value="Error3" />
                                <Picker.Item label="แนะนำ" value="Error4" />
                                <Picker.Item label="อื่นๆ" value="Error5" />
                            </Picker>
                        </View>
                        <Text style={{fontSize: 20 , marginHorizontal: 20}}>{'รายละเอียด'}</Text>
                        <Form>
                            <Textarea rowSpan={4} bordered placeholder="กรอกรายละเอียดของปัญหา" />
                        </Form>
                        <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                            <TouchableOpacity style={styles.buttonImg} onPress={this.selectPhotoTapped.bind(this)}>
                                <Text style={{color: '#fff', fontSize: 16}}> {'แนบรูปภาพ'}</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 14, marginLeft: '2%', marginTop: 10}}>{'ชื่อรูปภาพ.jpg'}</Text>
                        </View>
                        <View style={{width: '100%',alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.button} onPress={this.uploadPhoto.bind(this)}>
                                <Text style={styles.buttonText}> {'ส่งปัญหา'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </View>
                <SideMenu
                    diaryScreen={() => this.props.navigation.navigate( FOODDIARY_SCREEN )}
                    menuFoodScreen={() => this.props.navigation.navigate( MENUFOOD_SCREEN )}
                    bmiScreen={() => this.props.navigation.navigate( BMI_SCREEN )}
                    trickScreen={() => this.props.navigation.navigate( TRICK_SCREEN )}
                />
            </Container>
        );
    }
}

problemScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'แจ้งปัญหา'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 20,
        textAlign: 'center'
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
    buttonImg: {
        width: 100,
        height: 40,
        backgroundColor: '#068e81',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
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

export default problemScreen;
