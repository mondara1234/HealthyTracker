/* eslint-disable react/prop-types */
import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { Container } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import LogoTextHT from '../../common/components/LogoTextHT';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import VirtualKeyboard from '../components/VirtualKeyboard';
import {FORGOTPASSWORD} from "../router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {NavigationActions} from "react-navigation";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class PraviedKeyScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passCode: [],
            passKey: '',
            editing: true
        };
    }

    onBack = () => {
        if (this.state.editing) {
            Alert.alert(
                "แจ้งเตือน",
                "คุณต้องการปิด App ใช่ไหม?",
                [
                    { text: "ปิด", onPress: () => BackHandler.exitApp() },
                    { text: "ยกเลิก", onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
            return true;
        }

        return false;

    };

    componentDidMount() {
        const {user} = this.props.Users;
        const personalCode = user.map((data) => {return data.PersonalCode});
        this.setState({
            passKey : `${personalCode}`
        })
    }

    _onFinishCheckingCode = () => {
        let checkPassKey = this.state.passCode[0]+
            this.state.passCode[1]+
            this.state.passCode[2]+
            this.state.passCode[3]+
            this.state.passCode[4]+
            this.state.passCode[5];

        setTimeout( _onFinishCheck = () => {
            let checkData = this.state.passKey;

            if (checkData === '') {
                Alert.alert(
                    'รหัสส่วนตัว',
                    'ตั้งรหัสสำเร็จ!',
                    [
                        {text: 'OK',
                            onPress: () => {
                                this.setState({
                                    passCode: []
                                });

                                this.props.navigation.navigate(FOODDIARY_SCREEN)
                            }
                        }
                    ],
                    { cancelable: false }
                );
            }else if (checkPassKey === checkData) {
                Alert.alert(
                    'รหัสส่วนตัว',
                    'รหัสส่วนตัวถูกต้อง!',
                    [
                        {text: 'OK',
                            onPress: () => this.setState({
                                passCode: []
                            })
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'รหัสส่วนตัว',
                    'รหัสส่วนตัวไม่ถูกต้อง!',
                    [
                        {text: 'OK',
                            onPress: () => this.setState({
                                passCode: []
                            })
                        }
                    ],
                    { cancelable: false }
                );

            } }, 0.8)
    };

    _checkText = (val) => {
        if(val !== 'back'){
            const addPass = [...this.state.passCode];
            addPass.push(val);
            this.setState({
                passCode: addPass
            });
        }else {
            const copyArr = [...this.state.passCode];
            copyArr.pop();
            this.setState({
                passCode: copyArr
            });
        }
    };

    render() {
        const checkText = this.state.passCode[5] ? this._onFinishCheckingCode() : '';
        const textDisabled = this.state.passCode[5] ? true : false;

        return (
            <HandleBack onBack={this.onBack}>
                <Container style={styles.container}>
                    <LogoTextHT colorMain={'#000'} color={'#068e81'} />
                    <View style={styles.borderWrapper}>
                        <View style={styles.borderView}>
                            <View style={[styles.checkView,{backgroundColor: this.state.passCode[0] ? '#068e81' : 'white'}]} />
                        </View>
                        <View style={styles.borderView}>
                            <View style={[styles.checkView,{backgroundColor: this.state.passCode[1] ? '#068e81' : 'white'}]} />
                        </View>
                        <View style={styles.borderView}>
                            <View style={[styles.checkView,{backgroundColor: this.state.passCode[2] ? '#068e81' : 'white'}]} />
                        </View>
                        <View style={styles.borderView}>
                            <View style={[styles.checkView,{backgroundColor: this.state.passCode[3] ? '#068e81' : 'white'}]} />
                        </View>
                        <View style={styles.borderView}>
                            <View style={[styles.checkView,{backgroundColor: this.state.passCode[4] ? '#068e81' : 'white'}]} />
                        </View>
                        <View style={styles.borderView}>
                            <View style={[styles.checkView,{backgroundColor: this.state.passCode[5] ? '#068e81': 'white'}]}  />
                        </View>
                    </View>
                    <View style={{width: 280, backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles.TouchForgot}
                                          onPress={() => this.props.navigation.navigate(FORGOTPASSWORD)}>
                            <CommonText text={'ลืมรหัสส่วนตัว ?'} style={styles.textForgot} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewKeyboard}>
                        <VirtualKeyboard
                            pressMode={'string'}
                            decimal={false}
                            onPress={(val) => this._checkText(val)}
                            disableds={textDisabled}
                        />
                    </View>
                </Container>
            </HandleBack>
        )
    }
}

PraviedKeyScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle text={'ตั้งค่ารหัสส่วนตัว'} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    borderWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: 280,
        height: 60,
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 50
    },
    borderView:{
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor:'#068e81',
        marginRight:10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkView:{
        width: 20,
        height: 20,
        borderRadius: 50
    },
    viewKeyboard:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: '10%',
        marginTop: 40,
        borderTopWidth: 1,
        borderColor: '#068e81'
    },
    textForgot: {
        color: '#000',
        fontSize: 14
    },
    TouchForgot: {
        marginRight: 20
    },
});

function mapStateToProps(state) {
    return{
        Users: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch)
    })
)(PraviedKeyScreen)
