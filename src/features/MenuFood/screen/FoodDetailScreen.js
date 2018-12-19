import React from 'react';
import {StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
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
            UserEmail: '',
        }
    }

    render() {
        const { foodData } = this.props.navigation.state.params;
        return (
            <Container>
                <View style={styles.container}>
                    <View style={{ width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', paddingLeft: '2%'}}>
                        <Image  style={{marginHorizontal: 10 ,marginVertical: 10, width: 80, height: 80}}
                                source={{uri: foodData.picture.large}}
                        />
                        <View>
                            <Text style={{fontSize: 22, color: '#068e81', fontWeight: 'bold'}}>{foodData.name.first}</Text>
                            <Text style={{fontSize: 18, color: '#068e81'}}>{foodData.calorie + ' แคลลอรี่'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: '5%'}} >
                            <TextInput style={styles.inputBox}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       placeholder="1"
                                       placeholderTextColor = "#068e81"
                                       selectionColor="#fff"
                                       keyboardType="numeric"
                                       onChangeText={UserEmail =>this.setState({UserEmail})}
                            />
                            <Text style={{fontSize: 20, color: '#068e81'}}>{'หน่วย'}</Text>
                        </View>
                    </View>
                    <Text style={{fontSize: 16, marginLeft: '3%'}}>{'*หน่วย = ชาม/ถ้วย/ฝัก/ลูก'}</Text>
                    <View
                        style = {{height: 1 , width: '100%', backgroundColor: '#080808'}}>
                    </View>
                    <View style={{ width: '100%',backgroundColor:'#21acdd' ,flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                        <TouchableOpacity
                            style={[styles.button,{marginLeft: '10%'}]}
                            onPress={ () => this.props.navigation.navigate({
                            routeName: FOODDIARY_SCREEN,
                            params: {foodData: foodData}})}
                        >
                            <Text style={styles.buttonText}> {'บันทึกลงไดอารี่'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,{marginRight: '10%'}]}>
                            <Text style={styles.buttonText}> {'บันทึกและค้นหาต่อ'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center' , justifyContent: 'center', marginTop: 50}}>
                        <Text style={{fontSize: 16}}>{'ปริมาณแคลลอรี่เปรียบเทียบต่อ '}</Text>
                        <Text style={{fontSize: 16}}>{'1'}</Text>
                        <Text style={{fontSize: 16}}>{' หน่วย'}</Text>
                    </View>
                    <View style={{ backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center' , justifyContent: 'center', marginTop: 50}}>
                        <ImageGif itemImage={Images.imgGif.walk} nameImg={'เดิน 9 นาที'} />
                        <ImageGif itemImage={Images.imgGif.Run} nameImg={'วิ่ง 7 นาที'} />
                        <ImageGif itemImage={Images.imgGif.ride_bicycle} nameImg={'ปั่น 5 นาที'} />
                        <ImageGif itemImage={Images.imgGif.swimming} nameImg={'ว่าย 3 นาที'} />
                    </View>
                </View>
                <SideMenu
                    diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                    menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                    bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                    trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                />
            </Container>
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

