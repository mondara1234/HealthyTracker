import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Alert, BackHandler } from 'react-native';
import { Container, Footer, FooterTab, Picker, Content, Textarea, Form } from 'native-base';
import RNFetchBlob from "react-native-fetch-blob";
import ImagePicker from "react-native-image-picker";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HandleBack from "../../common/components/HandleBack";
import {SERVER_URL} from "../../../common/constants";
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../../BMI/router";
import {TRICK_SCREEN} from "../../Trick/router";
import {connect} from "react-redux";
import {AllMessageBox} from "../../MessageBox/redux/actions";
import {bindActionCreators} from "redux";
import {NavigationActions} from "react-navigation";
import * as APIProblem from "../../Problem/api/api";
import Trans from "../../common/containers/Trans";


class problemScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            imageSource: null,
            data: null,
            filename: null,
            selected: undefined,
            detail : '',
            title: '',
            editing: true
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

    onValueChange(value) {
        console.log('value'+ value);
        this.setState({
            selected: value
        });
    }

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

    handleChange(event) {
        this.setState({
            detail: event.target.value
        });
    }

    addProBlem(){
        console.log('Title' + this.state.title);
        console.log('selected' + this.state.selected);
        console.log('detail' + this.state.detail);
        console.log('imageSource' + this.state.imageSource);
        console.log('data' + this.state.data);
        console.log('filename' + this.state.filename);

    }

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={{flexDirection: 'row' ,alignItems: 'center', justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                            style={[styles.buttonImg,{marginRight: 10, height: 30}]}
                            onPress={() =>{
                                this.setState({
                                    imageSource: null,
                                    data: null,
                                    filename: null,
                                    selected: undefined,
                                    detail : '',
                                    title: '',
                                })

                            }}
                        >
                            <CommonText text={Trans.tran('Problem.clear')} style={{color: '#fff', fontSize: 16}} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Content>
                            <CommonText text={Trans.tran('Problem.report_Problem')} style={styles.textTitle} />
                            <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                                <CommonText text={Trans.tran('Problem.title_Problem')} style={{fontSize: 20 , marginHorizontal: 20}} />
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder={Trans.tran('Problem.problem_Title')}
                                           defaultValue={this.state.title}
                                           placeholderTextColor = "#068e81"
                                           onChangeText={Title =>this.setState({ title: Title })}
                                />
                            </View>
                            <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                                <CommonText text={'ประเภท'} style={{fontSize: 20 , marginHorizontal: 20}} />
                                <Picker
                                    mode="dropdown"
                                    style={{ width: 240 }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label={Trans.tran('Problem.Picker.type_Problem')} value="เลือกประเภทของปัญหา" />
                                    <Picker.Item label={Trans.tran('Problem.Picker.unstable_System')} value="ระบบไม่เสถียร" />
                                    <Picker.Item label={Trans.tran('Problem.Picker.server_Problem')} value="เซิร์ฟเวอร์มีปัญหา" />
                                    <Picker.Item label={Trans.tran('Problem.Picker.bug_Found')} value="พบข้อบกพร่อง" />
                                    <Picker.Item label={Trans.tran('Problem.Picker.recommend')} value="แนะนำ" />
                                    <Picker.Item label={Trans.tran('Problem.Picker.other')} value="อื่นๆ" />
                                </Picker>
                            </View>
                            <CommonText text={Trans.tran('MessageBox.detail_Message.description')} style={{fontSize: 20 , marginHorizontal: 20}} />
                            <Form>
                                <Textarea
                                    style={{backgroundColor: '#fff'}}
                                    rowSpan={10}
                                    bordered
                                    placeholder={Trans.tran('Problem.fill_Problem')}
                                    defaultValue={this.state.detail}
                                    onChangeText={Detail =>this.setState({ detail: Detail })}
                                />
                            </Form>
                            <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                                <TouchableOpacity style={styles.buttonImg} onPress={this.selectPhotoTapped.bind(this)}>
                                    <CommonText text={Trans.tran('Problem.attach_Picture')} style={{color: '#fff', fontSize: 16}} />
                                </TouchableOpacity>
                                <CommonText text={'ชื่อรูปภาพ.jpg'} style={{fontSize: 14, marginLeft: '2%', marginTop: 10}} />
                            </View>
                            <View style={{width: '100%',alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={styles.button} onPress={() => this.addProBlem()}>
                                    <CommonText text={Trans.tran('Problem.send_Problems')} style={styles.buttonText} />
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
            </HandleBack>
        );
    }
}

problemScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={Trans.tran('Problem.report_Problem')} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10
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
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#068e81',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    button: {
        width: 150,
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#068e81'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#ffffff'
    },

});

function mapStateToProps(state) {
    return{
        Users: state.dataUser,
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_InsertProblem: bindActionCreators(APIProblem.InsertProblem, dispatch)
    })
)(problemScreen);
