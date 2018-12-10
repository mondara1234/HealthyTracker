import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput,  } from 'react-native';
import { Container, Switch } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import {TRICK_SCREEN} from "../../Trick/router";
import {FOODSTYPE_SCREEN, MENUFOOD_SCREEN} from "../../MenuFood/router";
import {BMI_SCREEN} from "../../BMI/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';

class settingScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            PrivateKey: false,
            active: false,
            DialogChangePrivateKey: false,
            DialogChangeSuccess: false,
        }
    }

    handleSwitchToggle = () => {
      this.setState({
          active: !this.state.active
      })
    };

    _setPrivateKey = () => this.setState(state => ({
        PrivateKey: !state.PrivateKey
    }));

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
            <Container>
                <View style={styles.container}>
                    <View style={{width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{ fontSize: 16, color: '#000'}}> {'ปิดการใช้งาน'} </Text>
                        <TouchableOpacity
                            style={styles.containerButton}
                            onPress={ () => navigate({routeName: FOODSTYPE_SCREEN})}
                        >
                            <View style={styles.containerTitleButton}>
                                <Text style={styles.textButton}> {'ปิดบัญชี'} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{ fontSize: 16, color: '#000'}}> {'เปลี่ยนภาษา'} </Text>
                        <View style={{width: 80 , height: 30, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                            <View style={styles.containerToggle}>
                                <TouchableOpacity
                                    style={StyleToggle.touchToggle}
                                    onPress={this.handleSwitchToggle}
                                >
                                   <Text style={styles.labelToggle}>
                                       {this.state.active ? 'ENG' : 'TH'}
                                   </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{ fontSize: 16, color: '#000'}}> {'รหัสส่วนตัว'} </Text>
                        <View style={{width: 80 , height: 30, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                            <Switch
                                value={this.state.PrivateKey}
                                onValueChange={this._setPrivateKey}
                            />
                        </View>
                    </View>
                    <View style={{width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 20}}>
                        <TouchableOpacity
                            style={styles.containerButton}
                            onPress={() => {this.setState({DialogChangePrivateKey: true})}}
                        >
                            <View style={styles.containerTitleButton}>
                                <Text style={styles.textButton}> {'เปลี่ยนรหัสผ่าน'} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.containerButton,{width: 100, height: 50}]}
                        onPress={ () => navigate({routeName: FOODSTYPE_SCREEN})}
                    >
                        <View style={styles.containerTitleButton}>
                            <Text style={[styles.textButton,{fontSize: 20}]}> {'บันทึก'} </Text>
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
                            title="การเปลี่ยนรหัสส่วนตัว"
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
                                this.setState({ DialogChangePrivateKey: false, DialogChangeSuccess: true })
                            }}
                            style={styles.dialogTitleView}
                        />,
                        <DialogButton
                            text="ปิด"
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
                            placeholder="รหัสส่วนตัวเดิม"
                            secureTextEntry={true}
                            placeholderTextColor = "#068e81"
                            onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue })}
                        />
                        <TextInput
                            style={styles.inputBoxDialog}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="รหัสส่วนตัวใหม่"
                            secureTextEntry={true}
                            placeholderTextColor = "#068e81"
                            selectionColor="#fff"
                            onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue })}
                        />
                        <TextInput
                            style={styles.inputBoxDialog}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="ยืนยัน รหัสส่วนตัวใหม่"
                            secureTextEntry={true}
                            placeholderTextColor = "#068e81"
                            selectionColor="#fff"
                            onChangeText={ TextInputValue => this.setState({ TextInput_PasswordAgain : TextInputValue })}
                        />
                    </View>
                </Dialog>

                <Dialog //Dialogตอนกรอกข้อมูลเส้ดสิ้น
                    visible={this.state.DialogChangeSuccess}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                    onTouchOutside={() => {this.setState({ DialogChangeSuccess: true })}}//ไม่ให้กดข้างนอกได้
                    dialogTitle={//ส่วนของTitle
                        <DialogTitle
                            title="เปลี่ยนรหัสส่วนตัวสำเร็จ"
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
                                this.setState({ DialogChangeSuccess: false });
                            }}
                            style={styles.dialogTitleView}
                        />
                    ]}
                >{/*ส่วนของbody*/}
                    <View style={styles.dialogBodyView}>
                        <Text style={styles.dialogTextBody}> {'เปลี่ยน รหัสส่วนตัว เรียบร้อยแล้วครับ'}</Text>
                    </View>
                </Dialog>
            </Container>
        );
    }
}

settingScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'ตั้งค่า'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
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
        width: 100,
        height: 30,
        backgroundColor: '#068e81',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTitleButton: {
        alignItems: 'center',
        justifyContent: 'center'
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

export default settingScreen;
