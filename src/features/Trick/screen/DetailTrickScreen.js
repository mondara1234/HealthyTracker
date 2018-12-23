import React from 'react';
import {StyleSheet, Text, TextInput, Image, View, TouchableOpacity, BackHandler, Alert} from 'react-native';
import { Container, Content } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import {bindActionCreators} from "redux";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {TRICK_SCREEN} from "../router";
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {BMI_SCREEN} from "../../BMI/router";
import {Images} from "../../User/components/images";

class DetailTrickScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
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

    render() {
        const { trickData } = this.props.navigation.state.params;
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content>
                        <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                            <CommonText text={'กดถูกใจ'} />
                            <Image  style={{marginHorizontal: 10, width: 36, height: 30}}
                                    source={Images.TrickScreen.Heart}
                            />
                        </View>
                        <View style={styles.container}>
                            <Image  style={{marginHorizontal: 10 ,marginVertical: 10, width: '90%', height: 150}}
                                    source={{uri: trickData.picture.large}}
                            />
                            <CommonText text={trickData.name.first} style={{fontSize: 22, fontWeight: 'bold'}} />
                            <View style={{width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{backgroundColor: "#F4F4F4", flexDirection: 'row'}}>
                                    <Image  style={{marginHorizontal: 10, width: 26, height: 20}}
                                            source={Images.TrickScreen.Heart}
                                    />
                                    <CommonText text={`${trickData.Follow} คน`} size={16} />
                                </View>
                                <CommonText text={`${trickData.credit}/${trickData.dateAdd}`} size={16} />
                            </View>
                            <CommonText text={trickData.detailtrick} style={{ fontSize: 30, marginTop: 40}} />
                        </View>
                    </Content>
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

DetailTrickScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'เคล็ดลับ: ชื่อที่เรากดเข้ามา'} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
    },
    inputBox: {
        width: 60,
        height: 80,
        backgroundColor: '#fff',
        borderWidth: 1,
        fontSize: 25,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    button: {
        width: 150,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 30,
        marginLeft: 20,
        backgroundColor: '#068e81'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
});

export default withNavigation(DetailTrickScreen);
