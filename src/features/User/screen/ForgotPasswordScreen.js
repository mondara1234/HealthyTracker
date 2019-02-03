import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Alert, BackHandler } from 'react-native';
import { Container } from 'native-base';
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import LogoTextHT from '../../common/components/LogoTextHT';
import Trans from "../../common/containers/Trans";

class ForgotPasswordScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            UserEmail: '',
            TextInput_Password: '',
            TextInput_PasswordAgain: '',
            DialogForgot: false,
            DialogSuccess: false,
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

    render() {
        const { goBack } = this.props.navigation;

        return (
            <HandleBack onBack={this.onBack}>
                <View style={{backgroundColor: '#F4F4F4', flex: 1,}}>
                    <HeaderLeftMenu icon={'arrow-back'} color={'#000'}  onPress={() => goBack()} />
                    <Container style={styles.container}>
                        <View style={styles.containerLogo}>
                            <LogoTextHT colorMain={'#000'} color={'#068e81'} sizeMain={34} size={28} />
                        </View>
                        <CommonText text={Trans.tran('User.forgot_Password')} style={styles.signupText} />
                        <TextInput
                            style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder={Trans.tran('User.please_Email')}
                            placeholderTextColor = "#068e81"
                            keyboardType="email-address"
                            onChangeText={TextInputValue => this.setState({ UserEmail : TextInputValue })}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {this.setState({DialogForgot: true,})}}
                        >
                            <CommonText text={Trans.tran('User.change_Password')} style={styles.buttonText} />
                        </TouchableOpacity>

                        <Dialog  //Dialogตอนกดเปลี่ยน
                            visible={this.state.DialogForgot}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                            onTouchOutside={() => {this.setState({ DialogForgot: true })}}//ไม่ให้กดข้างนอกได้
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
                                        this.setState({ DialogForgot: false, DialogSuccess: true })
                                    }}
                                    style={styles.dialogTitleView}
                                />,
                                <DialogButton
                                    text={Trans.tran('general.canceled')}
                                    textStyle={styles.dialogTextButton}
                                    onPress={() => {
                                        this.setState({ DialogForgot: false });
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
                    </Container>
                </View>
            </HandleBack>
        );
    }
}

ForgotPasswordScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20%'
    },
    containerLogo: {
        marginBottom: 50
    },
    signupText: {
        color: '#068e81',
        fontSize: 40,
        marginBottom: 20
    },
    inputBox: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        fontSize: 18,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 20
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

export default ForgotPasswordScreen;
