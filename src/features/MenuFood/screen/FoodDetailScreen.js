import React from 'react';
import { StyleSheet, TextInput, Image, View, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Container } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import ImageGif from '../components/ImageGif';
import {Images} from "../../User/components/images";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {TRICK_SCREEN} from "../../Trick/router";
import {MENUFOOD_SCREEN} from "../router";
import {BMI_SCREEN} from "../../BMI/router";

class FoodDetailScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            numberUnit: 1,
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
        const { foodData } = this.props.navigation.state.params;
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <View style={{ width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', paddingLeft: '2%'}}>
                            <Image  style={{marginHorizontal: 10 ,marginVertical: 10, width: 100, height: 100}}
                                    source={{uri: foodData.FoodIMG}}
                            />
                            <View>
                                <CommonText text={foodData.FoodName} style={{fontSize: 22, color: '#068e81'}} />
                                <CommonText text={`${foodData.FoodCalorie} แคลลอรี่`} color={'#068e81'} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: '5%'}} >
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholder="1"
                                           placeholderTextColor = "#068e81"
                                           selectionColor="#fff"
                                           keyboardType="numeric"
                                           onChangeText={numberUnit =>this.setState({numberUnit: numberUnit})}
                                />
                                <CommonText text={foodData.FoodUnit} style={{fontSize: 20, color: '#068e81'}} />
                            </View>
                        </View>
                        <View
                            style = {{height: 1 , width: '100%', backgroundColor: '#080808', marginTop: 10}}>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                            <TouchableOpacity
                                style={[styles.button,{marginLeft: '10%'}]}
                                onPress={ () => this.props.navigation.navigate({
                                routeName: FOODDIARY_SCREEN,
                                params: {foodData: foodData}})}
                            >
                                <CommonText text={'บันทึกลงไดอารี่'} style={styles.buttonText} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,{marginRight: '10%'}]}>
                                <CommonText text={'บันทึกและค้นหาต่อ'} style={styles.buttonText} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center' , justifyContent: 'center'}}>
                                <CommonText text={'ปริมาณแคลลอรี่เปรียบเทียบต่อ '} />
                                <CommonText text={this.state.numberUnit}/>
                                <CommonText text={` ${foodData.FoodUnit}`} />
                            </View>
                            <View style={{ backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center' , justifyContent: 'center', marginTop: 100}}>
                                <ImageGif itemImage={Images.imgGif.walk} nameImg={'เดิน 10 นาที'} />
                                <ImageGif itemImage={Images.imgGif.Run} nameImg={'วิ่ง 10 นาที'} />
                                <ImageGif itemImage={Images.imgGif.ride_bicycle} nameImg={'ปั่น 72 นาที'} />
                                <ImageGif itemImage={Images.imgGif.swimming} nameImg={'ว่าย 59 นาที'} />
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

FoodDetailScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'รายละเอียดอาหาร'} color={'#fff'}/>,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 10,
    },
    inputBox: {
        width: 80,
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
        backgroundColor: '#068e81'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
    })
)(FoodDetailScreen);

