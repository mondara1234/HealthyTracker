/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Container } from 'native-base';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Trans from "../../common/containers/Trans";
import HandleBack from "../../common/components/HandleBack";
import LogoTextHT from '../../common/components/LogoTextHT';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import VirtualKeyboard from '../components/VirtualKeyboard';
import { FORGOTPASSWORD } from "../router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { SETTING_SCREEN } from "../../Setting/router";
import { getOneUser } from "../redux/actions";
import * as APIUser from "../api/api";

class PraviedKeyScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passCode: [],
            editing: true
        };
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
        const {user} = this.props.Users;
        const personalCode = user.map((data) => {return data.PersonalCode});
        this.setState({
            passKey : `${personalCode}`
        })
    }

    //ใช้สำหรับข้อมูลเป็น Promise {_40: 0, _65: 0, _55: null, _72: null}
    async updatePassCode(checkPassKey) {
        const {user} = this.props.Users;
        const UserID = user.map((data) => {return data.UserID});
        let ID = UserID.toString();
        let PassCode =`${checkPassKey}`;
        let PersonalSelect = 'on';
        const result = await this.props.FETCH_UpdatePassCode(PersonalSelect, PassCode, ID );

        const UserName = user.map((data) => {return data.UserName});
        let UserNameS =`${UserName}`;
        const response = await this.props.FETCH_SearchUser(UserNameS);
        this.props.REDUCER_ONEDATA(response);
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
                    Trans.tran('PraviedKey.personal_Code'),
                    Trans.tran('PraviedKey.set_Successfully'),
                    [
                        {text: Trans.tran('general.ok'),
                            onPress: () => {
                                this.updatePassCode(checkPassKey);
                                this.props.navigation.navigate({
                                    routeName: SETTING_SCREEN,
                                        params: {status: 'on'}
                                });
                                this.setState({
                                    passCode: []
                                });
                            }
                        }
                    ],
                    { cancelable: false }
                );
            }else if (checkPassKey === checkData) {
                Alert.alert(
                    Trans.tran('PraviedKey.personal_Code'),
                    Trans.tran('PraviedKey.Successfully'),
                    [
                        {text: Trans.tran('general.ok'),
                            onPress: () =>{
                                this.setState({
                                    passCode: []
                                });
                                this.navigationFoodDiary();
                            }
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    Trans.tran('PraviedKey.personal_Code'),
                    Trans.tran('PraviedKey.invalid_Personal'),
                    [
                        {text: Trans.tran('general.ok'),
                            onPress: () => this.setState({
                                passCode: []
                            })
                        }
                    ],
                    { cancelable: false }
                );

            } }, 0.8)
    };

    navigationFoodDiary(){
            this.props.navigation.navigate(FOODDIARY_SCREEN);
        setTimeout(()=>{
        },1000);

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
    headerTitle: <HeaderTitle text={Trans.tran('PraviedKey.personal_Code')} style={{marginLeft: '-15%'}}/>,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
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
        FETCH_UpdatePassCode: bindActionCreators(APIUser.fetchUpdatePassCode, dispatch),
        FETCH_SearchUser: bindActionCreators(APIUser.fetchSearchUser, dispatch),
        REDUCER_ONEDATA: bindActionCreators(getOneUser, dispatch),
    })
)(PraviedKeyScreen)
