import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Alert, BackHandler, Keyboard } from 'react-native';
import { Container, Picker, Content, Textarea, Form } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import moment from "moment/moment";
import Trans from "../../common/containers/Trans";
import ImagePicker from "react-native-image-picker";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HandleBack from "../../common/components/HandleBack";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../../BMI/router";
import { TRICK_SCREEN } from "../../Trick/router";
import * as APIProblem from "../../Problem/api/api";

class problemScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            data: null,
            fileName: null,
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
                this.setState({
                    data: response.data,
                    fileName: response.fileName
                });
            }
        });
    }

    addProBlem(){
        if(this.state.title === '' || this.state.selected === undefined || this.state.detail === ''){
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('general.please_Complete'),
                [
                    { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
        }else{
            let date = new Date();
            let dateFormat = moment(date).format("YYYY-MM-DD");
            const {user} = this.props.Users;
            const UserName = user.map((data) => {return data.UserName});
            let UserNames =`${UserName}`;
            const Title = this.state.title;
            const Img = this.state.data ? 'data:image/jpeg;base64,'+this.state.data : '';
            const Type = this.state.selected;
            const Detail = this.state.detail;
            this.props.FETCH_InsertProblem(UserNames, dateFormat, Title, Img, Type, Detail);
            this.setState({
                data: null,
                fileName: null,
                selected: undefined,
                detail : '',
                title: '',
            })
        }
    }

    BtnClear(){ // ปุ่ม x (ลบ)
        this.setState({
            data: null,
            fileName: null,
            selected: undefined,
            detail : '',
            title: '',
        })
    }

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.containerRowCenter}>
                        <TouchableOpacity
                            style={[styles.buttonImg,{marginRight: 10, height: 30}]}
                            onPress={() =>{this.BtnClear()}}
                        >
                            <CommonText text={Trans.tran('Problem.clear')} style={styles.fontClear} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Content>
                            <CommonText text={Trans.tran('Problem.report_Problem')} style={styles.textTitle} />
                            <View style={styles.containerTextInput}>
                                <CommonText text={Trans.tran('Problem.title_Problem')} style={styles.fontTitle} />
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder={Trans.tran('Problem.problem_Title')}
                                           defaultValue={this.state.title}
                                           placeholderTextColor = "#068e81"
                                           onChangeText={Title =>this.setState({ title: Title })}
                                />
                            </View>
                            <View style={styles.containerTextInput}>
                                <CommonText text={Trans.tran('Problem.type')} style={styles.fontTitle} />
                                <Picker
                                    mode="dropdown"
                                    style={{ width: '65%' }}
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
                            <CommonText text={Trans.tran('MessageBox.detail_Message.description')} style={styles.fontTitle} />
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
                            <View style={styles.containerTextInput}>
                                <TouchableOpacity style={styles.buttonImg} onPress={this.selectPhotoTapped.bind(this)}>
                                    <CommonText text={Trans.tran('Problem.attach_Picture')} style={styles.fontbtnIMG} />
                                </TouchableOpacity>
                                <View style={{width: '70%'}}>
                                    <Text numberOfLines={1} style={styles.fontNameIMG}>
                                        {this.state.fileName ? this.state.fileName : Trans.tran('Problem.picture_Name')}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.containerCenter}>
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
    headerLeft: <HeaderLeftMenu onPress={() => {Keyboard.dismiss(); navigation.navigate('DrawerOpen')}} />,
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
        marginVertical: 5,
        paddingBottom: 5

    },
    buttonImg: {
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#068e81',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    button: {
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#068e81'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        marginHorizontal: 20,
    },
    containerRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    fontClear: {
        color: '#fff',
        fontSize: 16,
        marginHorizontal: 10
    },
    containerTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    fontTitle: {
        fontSize: 20,
        marginHorizontal: 20
    },
    fontbtnIMG: {
        color: '#fff',
        fontSize: 16,
        marginHorizontal: 10
    },
    fontNameIMG: {
        fontSize: 14,
        marginLeft: '2%',
        marginTop: 10,
    },
    containerCenter: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

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
