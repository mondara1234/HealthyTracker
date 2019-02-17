import React from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, BackHandler, Alert } from 'react-native';
import { Container, Switch } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import Trans from "../../common/containers/Trans";
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { BMI_SCREEN } from "../../BMI/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { PRAVIEDKEY } from "../../User/router";
import * as APIUser from "../../User/api/api";
import * as APISetting from "../../Setting/api/api";
import { getOneUser } from "../../User/redux/actions";

class settingScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            PrivateKey: false,
            active: false,
            DialogChangePrivateKey: false,
            DialogChangeSuccess: false,
            editing: true,
            personalCode: '',
            TextInput_Passwordold: '',
            TextInput_PasswordNew: '',
            TextInput_PasswordAgain: ''
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

    componentDidUpdate(prevProps, prevState) {
        // BAD: DO NOT DO THIS!!!
        const {user} = this.props.Users;
        const personalCode = user.map((data) => {return data.PersonalCode});
        console.log('personalCode',personalCode);
        if(this.state.personalCode != `${personalCode}` ){
            this.setState({ personalCode: `${personalCode}` });
        }
    }


    componentDidMount() {
        const { status } = this.props.navigation.state.params ? this.props.navigation.state.params : '';
        const {user} = this.props.Users;
        const personalSelect = user.map((data) => {return data.PersonalSelect});
        const language = user.map((data) => {return data.Language});
        const personalCode = user.map((data) => {return data.PersonalCode});

        if(`${personalSelect}` === 'on'|| status === 'on'){
            this.setState({
                PrivateKey : true
            })
        }
        if(`${language}` === 'eng'){
            this.setState({
                active : true
            })
        }
        this.setState({
            personalCode : `${personalCode}`
        })
    }

    async UpdateChangePrivateKey() {
        const {user} = this.props.Users;
        let id = user.map((data) => { return data.UserID });
        let UserName = user.map((data) => { return data.UserName });
        let UserID = id.toString();
        let UserNames =`${UserName}`;
        let personalCode = this.state.personalCode;
        let Passwordold = this.state.TextInput_Passwordold;
        let PasswordNew = this.state.TextInput_PasswordNew;
        let PasswordAgain = this.state.TextInput_PasswordAgain;

        if(Passwordold === '' || PasswordNew === '' || PasswordAgain === ''){
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('general.please_Complete'),
                [
                    {
                        text: Trans.tran('general.close'), onPress: () => {
                        }, style: "cancel"
                    }
                ],
                {cancelable: false},
            );
        }else if(Passwordold.length !== 6 || PasswordNew.length !== 6 || PasswordAgain.length !== 6){
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('Setting.alert.password_Length'),
                [
                    {
                        text: Trans.tran('general.close'), onPress: () => {
                        }, style: "cancel"
                    }
                ],
                {cancelable: false},
            );
        }else if(personalCode !== Passwordold){
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('general.password_not_Match'),
                [
                    {
                        text: Trans.tran('general.close'), onPress: () => {
                        }, style: "cancel"
                    }
                ],
                {cancelable: false},
            );
        }else if(PasswordNew !== PasswordAgain){
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('Setting.alert.old_Password'),
                [
                    {
                        text: Trans.tran('general.close'), onPress: () => {
                        }, style: "cancel"
                    }
                ],
                {cancelable: false},
            );

        }else{
                const response = await this.props.FETCH_UpdateChangePrivateKey(UserID, PasswordNew);
                const responseSearchUser = await this.props.FETCH_fetchSearchUser(UserNames);
                this.props.REDUCER_ONEDATA(responseSearchUser);
                const members = this.props.Users.user;
                const personalCode = members.map((data) => {return data.PersonalCode});

                this.setState({
                    DialogChangePrivateKey: false,
                    DialogChangeSuccess: true,
                    personalCode : `${personalCode}`
                })
        }
    }

    async UpdateAllSetting() {
        const {user} = this.props.Users;
        let id = user.map((data) => { return data.UserID });
        let UserName = user.map((data) => { return data.UserName });
        let UserID = id.toString();
        let UserNames =`${UserName}`;
        let PrivateKey = this.state.PrivateKey;
        let active = this.state.active;
        let Language = '';
        let PersonalSelect = '';
            if(PrivateKey === true){
                PersonalSelect = 'on';
            }else{
                PersonalSelect = 'off';
            }

            if(active === true){
                Language = 'en';
            }else{
                Language = 'th';
            }
        const response = await this.props.FETCH_UpdateAllPrivate(UserID, PersonalSelect, Language);
        const responseSearchUser = await this.props.FETCH_fetchSearchUser(UserNames);
        this.props.REDUCER_ONEDATA(responseSearchUser);

    }

    handleSwitchToggle = () => {
      this.setState({
          active: !this.state.active
      })
    };

    _setPrivateKey = () => {
        if(this.state.PrivateKey === true){
            this.setState(state => ({ PrivateKey: !state.PrivateKey }))
        }else{
            this.setState(state => ({ PrivateKey: !state.PrivateKey }));
            if(this.state.personalCode === ''){
                this.props.navigation.navigate(PRAVIEDKEY);
            }

        }
    };

    render() {
        const StyleToggle = StyleSheet.create({
            touchToggle: {
                height: 30,
                width: 30,
                backgroundColor: this.state.active ? '#55acee': '#CB6161',
                alignItems: 'center',
                justifyContent: 'center',
                left: this.state.active ? 30 : 0
            },
        });

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <View style={styles.containerSeting}>
                            <CommonText text={Trans.tran('Setting.change_language')} size={16} color={'#000'} />
                            <View style={styles.viewToggle}>
                                <View style={styles.containerToggle}>
                                    <TouchableOpacity
                                        style={StyleToggle.touchToggle}
                                        onPress={this.handleSwitchToggle}
                                    >
                                       <CommonText text={this.state.active ? 'ENG' : 'TH'} style={styles.labelToggle} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerSeting}>
                            <CommonText text={Trans.tran('Setting.personal_code')} size={16} color={'#000'} />
                            <View style={styles.viewToggle}>
                                <Switch
                                    value={this.state.PrivateKey}
                                    onValueChange={this._setPrivateKey}
                                />
                            </View>
                        </View>
                        <View style={styles.containerSeting}>
                            <TouchableOpacity
                                style={styles.containerButton}
                                onPress={() => {
                                    this.state.personalCode ?
                                        this.setState({DialogChangePrivateKey: true})
                                        :
                                        Alert.alert(
                                            Trans.tran('general.alert'),
                                            Trans.tran('Setting.alert.created_Personal_code'),
                                            [
                                                {
                                                    text: Trans.tran('general.close'), onPress: () => {
                                                    }, style: "cancel"
                                                }
                                            ],
                                            {cancelable: false},
                                        );
                                }}
                            >
                                <View style={styles.containerTitleButton}>
                                    <CommonText text={Trans.tran('Setting.change_Personal_code')} style={styles.textButton} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[styles.containerButton,{height: 50}]}
                            onPress={ () => this.UpdateAllSetting()}
                        >
                            <View style={styles.containerTitleButton}>
                                <CommonText text={Trans.tran('Setting.save')} style={[styles.textButton,{fontSize: 20}]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                        menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                    <Dialog  //Dialogตอนกดเปลี่ยน
                        visible={this.state.DialogChangePrivateKey}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                        onTouchOutside={() => {this.setState({ DialogChangePrivateKey: true })}}//ไม่ให้กดข้างนอกได้
                        dialogTitle={//ส่วนของTitle
                            <DialogTitle
                                title={Trans.tran('Setting.Dialog.changing_Personal_code')}
                                hasTitleBar={false}
                                textStyle={styles.dialogTextTitle}
                                style={styles.dialogTitleView}
                            />
                        }
                        actions={[//ส่วนของฺbutton
                            <DialogButton
                                text={Trans.tran('general.ok')}
                                textStyle={styles.dialogTextButton}
                                onPress={() => this.UpdateChangePrivateKey()}
                                style={styles.dialogTitleView}
                            />,
                            <DialogButton
                                text={Trans.tran('general.close')}
                                textStyle={styles.dialogTextButton}
                                onPress={() => {
                                    this.setState({ DialogChangePrivateKey: false });
                                }}
                                style={styles.dialogTitleView}
                            />
                        ]}
                    >{/*ส่วนของbody*/}
                        <View style={styles.dialogBodyView}>
                            <TextInput
                                style={styles.inputBoxDialog}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder={Trans.tran('Setting.Dialog.original_Private_code')}
                                secureTextEntry={true}
                                maxLength={6}
                                placeholderTextColor = "#068e81"
                                onChangeText={ TextInputValue => this.setState({ TextInput_Passwordold : TextInputValue })}
                            />
                            <TextInput
                                style={styles.inputBoxDialog}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder={Trans.tran('Setting.Dialog.new_Personal_code')}
                                secureTextEntry={true}
                                placeholderTextColor = "#068e81"
                                selectionColor="#fff"
                                maxLength={6}
                                onChangeText={ TextInputValue => this.setState({ TextInput_PasswordNew : TextInputValue })}
                            />
                            <TextInput
                                style={styles.inputBoxDialog}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder={Trans.tran('Setting.Dialog.confirm_New_Password')}
                                secureTextEntry={true}
                                placeholderTextColor = "#068e81"
                                selectionColor="#fff"
                                maxLength={6}
                                onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue })}
                            />
                        </View>
                    </Dialog>

                    <Dialog //Dialogตอนกรอกข้อมูลเส้ดสิ้น
                        visible={this.state.DialogChangeSuccess}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                        onTouchOutside={() => {this.setState({ DialogChangeSuccess: true })}}//ไม่ให้กดข้างนอกได้
                        dialogTitle={//ส่วนของTitle
                            <DialogTitle
                                title={Trans.tran('general.alert')}
                                hasTitleBar={false}
                                textStyle={styles.dialogTextTitle}
                                style={styles.dialogTitleView}
                            />
                        }
                        actions={[//ส่วนของฺbutton
                            <DialogButton
                                text={Trans.tran('general.close')}
                                textStyle={styles.dialogTextButton}
                                onPress={() => {
                                    this.setState({ DialogChangeSuccess: false });
                                }}
                                style={styles.dialogTitleView}
                            />
                        ]}
                    >{/*ส่วนของbody*/}
                        <View style={styles.dialogBodyView}>
                            <CommonText text={Trans.tran('Setting.Dialog.change_Personal_Successfully')} style={styles.dialogTextBody} />
                        </View>
                    </Dialog>
                </Container>
            </HandleBack>
        );
    }
}

settingScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={Trans.tran('Setting.title')} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    containerButton: {
        height: 30,
        backgroundColor: '#068e81',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTitleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    textButton: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff'
    },
    styleIconFontAwesome: {
        marginHorizontal: 20,
        color: '#000'
    },
    containerToggle: {
        height: 30,
        width: 60,
        backgroundColor: '#C7C1C1'
    },
    labelToggle: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center'
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
    },
    containerSeting: {
        width: '100%',
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    viewToggle: {
        width: 80,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
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
        FETCH_UpdateAllPrivate: bindActionCreators(APISetting.UpdateAllPrivate, dispatch),
        FETCH_UpdateChangePrivateKey: bindActionCreators(APISetting.UpdateChangePrivateKey, dispatch),
        FETCH_fetchSearchUser: bindActionCreators(APIUser.fetchSearchUser, dispatch),
        REDUCER_ONEDATA: bindActionCreators(getOneUser, dispatch),
    })
)(settingScreen);
