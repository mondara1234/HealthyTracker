import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, BackHandler, Alert } from 'react-native';
import { Container, Thumbnail } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../../BMI/router";
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {TRICK_SCREEN} from "../../Trick/router";
import themeVariables from "../../../../native-base-theme/variables/platform";
import {Images} from "../../User/components/images";

class profileScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'male',
            editing: true
        }
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

    render() {
        const profileImage = 'https://randomuser.me/api/portraits/thumb/men/97.jpg';

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={{flex: 1 , alignItems: 'center', paddingTop: 20}}>
                        <View style={{width: '96%', borderWidth: 2 ,borderColor: '#068e81',justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingBottom: 10}}>
                            <View style={{paddingLeft: 3, height: 30, width: '100%', backgroundColor: '#068e81', justifyContent: 'center', marginBottom: 10}}>
                                <CommonText text={'ข้อมูล BMR'} color={'#fff'} />
                            </View>
                            <View style={{width: '85%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <CommonText text={'BMI :'} size={14} />
                                </View>
                                <View style={{width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <CommonText text={'58'} style={{fontSize: 16, color: '#068E81'}} />
                                </View>
                            </View>
                            <View style={{width: '85%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <CommonText text={'น้ำหนักอยู่ในเกณฑ์ :'} size={14} />
                                </View>
                                <View style={{width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <CommonText text={'ปกติ'} style={{fontSize: 16, color: '#068E81'}} />
                                </View>
                            </View>
                            <View style={{width: '85%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <CommonText text={'พลังงานที่ต้องการต่อวัน :'} size={14} />
                                </View>
                                <View style={{width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <CommonText text={'2875 แคลลอรี่'} style={{fontSize: 16, color: '#068E81'}} />
                                </View>
                            </View>
                        </View>
                        <View style={{width: '96%', borderWidth: 2 ,borderColor: '#068e81',justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingBottom: 10}}>
                            <View style={{paddingLeft: 3, height: 30, width: '100%', flexDirection: 'row', backgroundColor: '#068e81', justifyContent: 'space-between', alignItems: 'center'}}>
                                <CommonText text={'ข้อมูล ส่วนตัว'} color={'#fff'} />
                                <TouchableOpacity style={{paddingHorizontal: 10, backgroundColor: '#F4F4F4',flexDirection: 'row', marginRight: 3, height: 26, alignItems: 'center', justifyContent: 'center'}}>
                                    <IconFontAwesome5
                                        name="user-edit"
                                        size={20}
                                        color={'#068e81'}
                                        style={styles.styleIconFontAwesome}
                                    />
                                    <CommonText text={'แก้ไข'} style={{ color: '#068e81', fontSize: 14}} />
                                </TouchableOpacity>
                            </View>
                            <View style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    source={
                                        profileImage
                                            ? {uri: profileImage}
                                            : require('../../../../pulic/assets/images/user-default.png')

                                    }
                                    style={styles.userThumb}
                                />
                                <View>
                                    <CommonText text={'NameUser'} color={'#068e81'} />
                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                        <CommonText text={'E-mail:'} />
                                        <CommonText text={'kakzadsr@gmail.com'} style={{ color: '#068e81', marginLeft: 10}} />
                                    </View>
                                    <TouchableOpacity style={{ backgroundColor: '#068e81', height: 25, width: 100 , alignItems: 'center', justifyContent: 'center'}}>
                                        <CommonText text={'เปลี่ยนรหัสผ่าน'} style={{ color: '#fff', fontSize: 14}} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity style={{ backgroundColor: '#068e81', marginTop: -10, marginLeft: 6, height: 20, width: 100 , alignItems: 'center', justifyContent: 'center'}}>
                                    <CommonText text={'เปลี่ยนรูปโปรไฟล์'} style={{ color: '#fff', fontSize: 12}} />
                                </TouchableOpacity>
                            </View>
                            <View style={{width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20}}>
                                <View style={{marginLeft:10 ,width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <CommonText text={'เพศ :'} />
                                    <CommonText
                                        text={'ชาย'}
                                        style={{marginLeft: 20,color: this.state.selected === 'male' ? '#068e81' : '#000'}}
                                        onPress={() => this.selectSex('male')}
                                    />
                                    <CommonText text={' / '}  />
                                    <CommonText
                                        text={'หญิง'}
                                        style={{color: this.state.selected === 'female' ? '#068e81' : '#000'}}
                                        onPress={() => this.selectSex('female')}
                                    />
                                </View>
                                <View style={{width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <CommonText text={'อายุ (ปี)'}/>
                                </View>
                            </View>
                            <View style={{paddingHorizontal: 20, width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{width: '60%', alignItems: 'center', marginTop: 20}}>
                                    <CommonText text={'น้ำหนัก (กก)'} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               placeholder="58"
                                               placeholderTextColor = "#068e81"
                                    />
                                    <CommonText text={'ส่วนสูง (ซม)'} style={{marginTop: 10}} />
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               placeholder="169"
                                               placeholderTextColor = "#068e81"
                                    />
                                </View>
                                <View style={{width: '40%', alignItems: 'center', marginTop: 10}}>
                                    <TextInput style={styles.inputBox}
                                               underlineColorAndroid='rgba(0,0,0,0)'
                                               placeholder="21"
                                               placeholderTextColor = "#068e81"
                                    />
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop:10}}>
                                        <Image  style={{width: 60, height: 100}}
                                                source={Images.ProfileScreen.smile}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
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

profileScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'จัดการข้อมูลส่วนตัว'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    userThumb: {
        width: 70,
        height: 70,
        marginVertical: 20,
        marginRight: 20
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
});

export default profileScreen;
