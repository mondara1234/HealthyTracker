import React from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import LogoTextHT from '../../common/components/LogoTextHT';

class ForgotPasswordScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            UserEmail: '',
            TextInput_Password: '',
            TextInput_PasswordAgain: '',
            DialogForgot: false,
            DialogSuccess: false,
        }
    }

    render() {

        const { goBack } = this.props.navigation;

        return (
            <View style={{backgroundColor: '#F4F4F4', flex: 1,}}>
                <HeaderLeftMenu icon={'arrow-back'} color={'#000'}  onPress={() => goBack()} />
                <Container style={styles.container}>
                    <View style={styles.containerLogo}>
                        <LogoTextHT colorMain={'#000'} color={'#068e81'} sizeMain={34} size={28} />
                    </View>
                    <Text style={styles.signupText}>{'ลืมรหัสผ่าน'}</Text>
                    <TextInput
                        style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="กรุณากรอก Email"
                        placeholderTextColor = "#068e81"
                        keyboardType="email-address"
                        onChangeText={TextInputValue => this.setState({ UserEmail : TextInputValue })}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.setState({DialogForgot: true,})}}
                    >
                        <Text style={styles.buttonText} > {'เปลี่ยนรหัสผ่าน'} </Text>
                    </TouchableOpacity>

                    <Dialog  //Dialogตอนกดเปลี่ยน
                        visible={this.state.DialogForgot}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                        onTouchOutside={() => {this.setState({ DialogForgot: true })}}//ไม่ให้กดข้างนอกได้
                        dialogTitle={//ส่วนของTitle
                            <DialogTitle
                                title="การเปลี่ยนรหัสผ่าน"
                                hasTitleBar={false}
                                textStyle={styles.dialogTextTitle}
                                style={styles.dialogTitleView}
                            />
                        }
                        actions={[//ส่วนของฺbutton
                            <DialogButton
                                text="ตกลง"
                                textStyle={styles.dialogTextButton}
                                onPress={() => {
                                    this.setState({ DialogForgot: false, DialogSuccess: true })
                                }}
                                style={styles.dialogTitleView}
                            />,
                            <DialogButton
                                text="ปิด"
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
                                placeholder="รหัสผ่านใหม่"
                                secureTextEntry={true}
                                placeholderTextColor = "#068e81"
                                onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue })}
                            />
                            <TextInput
                                style={styles.inputBoxDialog}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="ยืนยัน รหัสผ่านใหม่"
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
                                title="เปลี่ยนรหัสผ่านสำเร็จ"
                                hasTitleBar={false}
                                textStyle={styles.dialogTextTitle}
                                style={styles.dialogTitleView}
                            />
                        }
                        actions={[//ส่วนของฺbutton
                            <DialogButton
                                text="ปิด"
                                textStyle={styles.dialogTextButton}
                                onPress={() => {
                                    this.setState({ DialogSuccess: false });
                                }}
                                style={styles.dialogTitleView}
                            />
                        ]}
                    >{/*ส่วนของbody*/}
                            <View style={styles.dialogBodyView}>
                                <Text style={styles.dialogTextBody}> {'ระบบได้ส่งรหัสผ่านไปให้คุณทาง \n e-mail เรียบร้อยแล้วครับ'}</Text>
                            </View>
                    </Dialog>
                </Container>
            </View>
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
        justifyContent: 'center'
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
        fontSize: 16,
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
        fontSize: 16,
        color: '#068e81',
        paddingLeft: 10,
        paddingTop: 8,
        marginVertical: 5,
        marginHorizontal: 10
    },
    dialogTextBody: {
        color: '#000',
        fontSize: 16
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
