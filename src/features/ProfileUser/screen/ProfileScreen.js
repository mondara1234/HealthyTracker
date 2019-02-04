import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, TextInput, BackHandler, Alert } from 'react-native';
import { Container } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog'
import ImagePicker from "react-native-image-picker";
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Trans from "../../common/containers/Trans";
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { Images } from "../../User/components/images";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../../BMI/router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { TRICK_SCREEN } from "../../Trick/router";
import * as APIUser from "../../User/api/api";
import { getOneUser } from "../../User/redux/actions";

class ProfileScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataProfileUser:  [],
            selected: '',
            TextInput_age: 0,
            TextInput_cm: 0,
            TextInput_gg: 0,
            bmi: 0,
            criterionbmi: '',
            stateButton: 'Edit',
            editing: true,
            DialogChange: false,
            DialogSuccess: false,
            ImageSource: null,
            data: null
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

    componentDidMount() {
        const members = this.props.Users.user;
        const sex = members.map((data) => {return data.Sex});
        const Height = members.map((data) => {return data.Height});
        const Weight = members.map((data) => {return data.Weight});
        let SumBMi = Math.pow(Weight, 2)/Height;
        let criterionBMI = '';

        if(SumBMi.toFixed(2) < 18.50){
            criterionBMI = Trans.tran('BMI.criterionBMI.thin');

        }else if(SumBMi.toFixed(2) < 23.00){
            criterionBMI = Trans.tran('BMI.criterionBMI.normal');

        }else if(SumBMi.toFixed(2) < 25.00){
            criterionBMI = Trans.tran('BMI.criterionBMI.buxom');

        }else if(SumBMi.toFixed(2) < 30.00){
            criterionBMI = Trans.tran('BMI.criterionBMI.fat');

        }else if(30.00 < SumBMi.toFixed(2) ){
            criterionBMI = Trans.tran('BMI.criterionBMI.fat_much');
        }
        this.setState({
            dataProfileUser : members,
            selected: `${sex}`,
            criterionbmi: criterionBMI,
            bmi: SumBMi.toFixed(2)
        });
    };

    selectSex = (selectedSex) => {

        if(selectedSex === 'male'){
            this.setState({
                selected: selectedSex
            })
        }else{
            this.setState({
                selected: selectedSex
            })
        }
    };

    //ใช้สำหรับข้อมูลเป็น Promise {_40: 0, _65: 0, _55: null, _72: null}
    async getData(UserName) {
        let UserNames =`${UserName}`;
        const response = await this.props.FETCH_SearchUser(UserNames);
        this.props.REDUCER_ONEDATA(response);
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
                const { user } = this.props.Users;
                let id = user.map((data) => { return data.UserID });
                let UserID = id.toString();
                let UserName = user.map((data) => { return data.UserName });
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let dataImg = 'data:image/jpeg;base64,' + response.data;
                this.props.FETCH_UpdateImgUser(UserID, dataImg);
                this.setState({
                    ImageSource: source,
                    data: response.data
                });
                this.getData(UserName);
            }
        });
    }

    render() {
        const { user } = this.props.Users;
        let id = user.map((data) => { return data.UserID });
        let UserName = user.map((data) => { return data.UserName });
        let Email = user.map((data) => { return data.Email });
        let imgProfile = user.map((data) => { return data.imgProfile });
        let Ages = user.map((data) => { return data.Age });
        let Weights = user.map((data) => { return data.Weight });
        let Heights = user.map((data) => { return data.Height });
        let BMRUsers = user.map((data) => { return data.BMRUser });

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <View style={styles.containerBMR}>
                            <View style={styles.viewTitleBMR}>
                                <CommonText text={`${Trans.tran('Profile.information')} BMR`} color={'#fff'} />
                            </View>
                            <View style={styles.containerTitleBMR}>
                                <View style={styles.titleBMR}>
                                    <CommonText text={`${Trans.tran('BMI.title')} :`} size={14} />
                                </View>
                                <View style={styles.bodyBMR}>
                                    <CommonText text={this.state.bmi} style={styles.fontBMI} />
                                </View>
                            </View>
                            <View style={styles.containerTitleBMR}>
                                <View style={styles.titleBMR}>
                                    <CommonText text={`${Trans.tran('BMI.criterion')} :`} size={14} />
                                </View>
                                <View style={styles.bodyBMR}>
                                    <CommonText text={this.state.criterionbmi} style={styles.fontBMI} />
                                </View>
                            </View>
                            <View style={styles.containerTitleBMR}>
                                <View style={styles.titleBMR}>
                                    <CommonText text={`${Trans.tran('FoodDiary.energy_per_day')} :`} size={14} />
                                </View>
                                <View style={styles.titleBMR}>
                                    <CommonText text={`${BMRUsers} ${Trans.tran('FoodDiary.calorie')}`} style={styles.fontBMI} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerBMR}>
                            <View style={styles.viewProfile}>
                                <CommonText text={`${Trans.tran('Profile.information')} ${Trans.tran('Profile.private')}`} color={'#fff'} />
                                {this.state.stateButton === 'Edit'?
                                    <TouchableOpacity
                                        style={styles.btnEdit}
                                        onPress={() => {
                                            this.setState({
                                                stateButton: 'Save',
                                                TextInput_age: Ages,
                                                TextInput_cm: Weights,
                                                TextInput_gg: Heights,
                                            })
                                        }}
                                    >
                                        <IconFontAwesome5
                                            name="user-edit"
                                            size={20}
                                            color={'#068e81'}
                                            style={styles.styleIconFontAwesome}
                                        />
                                        <CommonText text={Trans.tran('Profile.edit')} size={14} color={'#068e81'} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={styles.btnEdit}
                                        onPress={() => {
                                            let UserID = id.toString();
                                            let Sex = this.state.selected;
                                            let Age = this.state.TextInput_age;
                                            let Weight = this.state.TextInput_cm;
                                            let Height = this.state.TextInput_gg;
                                            let BMRUser = 0;

                                            if(Sex === 'male'){
                                                let BMR_male = 66 + (13.7 * Height)+(5 * Weight) - (6.8 * Age);
                                                BMRUser = BMR_male.toFixed();
                                            }else if(Sex === 'female') {
                                                let BMR_female = 665 + (9.6 * Height) + (1.8 * Weight) - (4.7 * Age);
                                                BMRUser = BMR_female.toFixed();
                                            }
                                            
                                            this.props.FETCH_UpdateUser(UserID, Sex, Age, Weight, Height, BMRUser);

                                            this.setState({
                                                stateButton: 'Edit'
                                            });
                                            this.getData(UserName);
                                        }}
                                    >
                                        <IconFontAwesome5
                                            name="user-edit"
                                            size={20}
                                            color={'#068e81'}
                                            style={styles.styleIconFontAwesome}
                                        />
                                        <CommonText text={Trans.tran('Profile.save')} size={14} color={'#068e81'} />
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.containerImgProfile}>
                                <Image
                                    source={this.state.ImageSource != null ? this.state.ImageSource :
                                       {uri: `${imgProfile}`}}
                                    style={styles.userThumb}
                                />
                                <View>
                                    <CommonText text={`${UserName}`} color={'#068e81'} />
                                    <View style={styles.containerRow}>
                                        <CommonText text={Trans.tran('Profile.email')} />
                                        <CommonText text={`${Email}`} style={styles.colorEmail} />
                                    </View>
                                    <TouchableOpacity
                                        style={styles.btnPass}
                                        onPress={() => {this.setState({DialogChange: true})}}
                                    >
                                        <CommonText text={Trans.tran('User.change_Password')} style={styles.fontBtnPass} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.containerRow}>
                                <TouchableOpacity style={styles.btnIMG} onPress={this.selectPhotoTapped.bind(this)}>
                                    <CommonText text={Trans.tran('Profile.change_Img_profile')} style={styles.fontBtnIMG} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerProfile}>
                                <View style={styles.containerSex}>
                                    <CommonText text={Trans.tran('Profile.sex')} />
                                    <TouchableOpacity onPress={() => this.selectSex('male')}>
                                        <CommonText
                                            text={Trans.tran('FoodDiary.Dialog.male')}
                                            style={[styles.dialogTextBody, {
                                                marginLeft: 30,
                                                color: this.state.selected === 'male' ? '#068e81' : '#000'
                                            }]}
                                        />
                                    </TouchableOpacity>
                                    <CommonText text={'/'} style={[styles.dialogTextBody, {marginLeft: 3}]}/>
                                    <TouchableOpacity onPress={() => this.selectSex('female')}>
                                        <CommonText
                                            text={Trans.tran('FoodDiary.Dialog.female')}
                                            style={[styles.dialogTextBody, {
                                                marginLeft: 3,
                                                color: this.state.selected === 'female' ? '#068e81' : '#000'
                                            }]}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerTitleAge}>
                                    <CommonText text={Trans.tran('Profile.age')}/>
                                </View>
                            </View>
                            <View style={styles.containerTextInput}>
                                <View style={styles.viewGG}>
                                    <CommonText text={Trans.tran('Profile.weight')} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               defaultValue={`${Heights}`}
                                               placeholderTextColor = "#068e81"
                                               keyboardType="numeric"
                                               onChangeText={TextInputValue => this.setState({TextInput_gg: TextInputValue === 0 ? Heights : TextInputValue})}
                                    />
                                    <CommonText text={Trans.tran('Profile.height')} style={{marginTop: 10}} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               defaultValue={`${Weights}`}
                                               placeholderTextColor = "#068e81"
                                               keyboardType="numeric"
                                               onChangeText={TextInputValue => this.setState({TextInput_cm: TextInputValue === 0 ? Weights : TextInputValue})}
                                    />
                                </View>
                                <View style={styles.viewAge}>
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               defaultValue={`${Ages}`}
                                               placeholderTextColor = "#068e81"
                                               keyboardType="numeric"
                                               onChangeText={TextInputValue => this.setState({TextInput_age: TextInputValue === 0 ? Ages : TextInputValue})}
                                    />
                                    <View style={styles.viewIcon}>
                                        <Image  style={{width: 60, height: 100}}
                                                source={Images.ProfileScreen.smile}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Dialog  //Dialogตอนกดเปลี่ยน
                            visible={this.state.DialogChange}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                            onTouchOutside={() => {this.setState({ DialogChange: true })}}//ไม่ให้กดข้างนอกได้
                            dialogTitle={//ส่วนของTitle
                                <DialogTitle
                                    title={Trans.tran('User.Dialog.Change_password')}
                                    hasTitleBar={false}
                                    textStyle={styles.dialogTextTitle}
                                    style={styles.dialogTitleView}
                                />
                            }
                            actions={[//ส่วนของฺbutton
                                <DialogButton
                                    text={Trans.tran('general.ok')}
                                    textStyle={styles.dialogTextButton}
                                    onPress={() => {
                                        this.setState({ DialogChange: false, DialogSuccess: true })
                                    }}
                                    style={styles.dialogTitleView}
                                />,
                                <DialogButton
                                    text={Trans.tran('general.canceled')}
                                    textStyle={styles.dialogTextButton}
                                    onPress={() => {
                                        this.setState({ DialogChange: false });
                                    }}
                                    style={styles.dialogTitleView}
                                />
                            ]}
                        >{/*ส่วนของbody*/}
                            <View style={styles.dialogBodyView}>
                                <TextInput
                                    style={styles.inputBoxDialog}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder={Trans.tran('User.Dialog.new_Password')}
                                    secureTextEntry={true}
                                    placeholderTextColor = "#068e81"
                                    onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue })}
                                />
                                <TextInput
                                    style={styles.inputBoxDialog}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder={Trans.tran('User.Dialog.confirm_Password')}
                                    secureTextEntry={true}
                                    placeholderTextColor = "#068e81"
                                    selectionColor="#fff"
                                    onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue })}
                                />
                            </View>
                        </Dialog>

                        <Dialog //Dialogตอนกรอกข้อมูลเส้ดสิ้น
                            visible={this.state.DialogSuccess}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                            onTouchOutside={() => {this.setState({ DialogSuccess: true })}}//ไม่ให้กดข้างนอกได้
                            dialogTitle={//ส่วนของTitle
                                <DialogTitle
                                    title={Trans.tran('User.Dialog.change_Successfully')}
                                    hasTitleBar={false}
                                    textStyle={styles.dialogTextTitle}
                                    style={styles.dialogTitleView}
                                />
                            }
                            actions={[//ส่วนของฺbutton
                                <DialogButton
                                    text={Trans.tran('general.canceled')}
                                    textStyle={styles.dialogTextButton}
                                    onPress={() => {
                                        this.setState({ DialogSuccess: false });
                                    }}
                                    style={styles.dialogTitleView}
                                />
                            ]}
                        >{/*ส่วนของbody*/}
                            <View style={styles.dialogBodyView}>
                                <CommonText style={styles.dialogTextBody} text={Trans.tran('User.Dialog.change_Successfully')}/>
                            </View>
                        </Dialog>
                    </View>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                        menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                </Container>
            </HandleBack>
        );
    }
}

ProfileScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={Trans.tran('Profile.title')} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    userThumb: {
        width: 70,
        height: 70,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 80
    },
    styleIconFontAwesome: {
        marginRight: 10
    },
    inputBox: {
        width: 60,
        height: 30,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#068e81',
        fontSize: 18,
        color: '#068e81',
        textAlign: 'center',
        paddingBottom: -5
    },
    container: {
        flex: 1 ,
        alignItems: 'center',
        paddingTop: 20
    },
    containerBMR: {
        width: '96%',
        borderWidth: 2,
        borderColor: '#068e81',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10
    },
    viewTitleBMR: {
        paddingLeft: 3,
        height: 30,
        width: '100%',
        backgroundColor: '#068e81',
        justifyContent: 'center',
        marginBottom: 10
    },
    containerTitleBMR: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleBMR: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bodyBMR: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    fontBMI: {
        fontSize: 16,
        color: '#068E81'
    },
    viewProfile: {
        paddingLeft: 3,
        height: 30,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#068e81',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnEdit: {
        paddingHorizontal: 10,
        backgroundColor: '#F4F4F4',
        flexDirection: 'row',
        marginRight: 3,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerImgProfile: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    colorEmail: {
        color: '#068e81',
        marginLeft: 10
    },
    btnPass: {
        backgroundColor: '#068e81',
        height: 25,
        width: 100 ,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontBtnPass: {
        color: '#fff',
        fontSize: 14
    },
    btnIMG: {
        backgroundColor: '#068e81',
        marginTop: -10,
        marginLeft: 6,
        height: 20,
        width: 100 ,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontBtnIMG: {
        color: '#fff',
        fontSize: 12
    },
    containerProfile: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    containerSex: {
        marginLeft:10,
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTitleAge: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTextInput: {
        paddingHorizontal: 20,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewGG: {
        width: '60%',
        alignItems: 'center',
        marginTop: 20
    },
    viewAge: {
        width: '40%',
        alignItems: 'center',
        marginTop: 10
    },
    viewIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
    },
    dialogBodyView: {
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    dialogTitleView: {
        backgroundColor: '#068e81',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBoxDialog: {
        width: 250,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        fontSize: 18,
        color: '#068e81',
        paddingLeft: 10,
        paddingTop: 8,
        marginVertical: 5,
        marginHorizontal: 10
    },
    dialogTextBody: {
        color: '#000',
        fontSize: 18
    },
    dialogTextButton: {
        color: '#fff',
        fontSize: 18
    },
    dialogTextTitle: {
        color: '#fff',
        fontSize: 20
    }
});

function mapStateToProps(state) {
    return{
        Users: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_UpdateUser: bindActionCreators(APIUser.fetchUpdateUser, dispatch),
        FETCH_UpdateImgUser: bindActionCreators(APIUser.fetchUpdateUpdateImgUser, dispatch),
        FETCH_SearchUser: bindActionCreators(APIUser.fetchSearchUser, dispatch),
        REDUCER_ONEDATA: bindActionCreators(getOneUser, dispatch),
    })
)(ProfileScreen);
