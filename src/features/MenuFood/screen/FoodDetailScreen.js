import React from 'react';
import { StyleSheet, TextInput, Image, View, TouchableOpacity, BackHandler, Alert, Keyboard } from 'react-native';
import { Container } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import moment from 'moment';
import HandleBack from "../../common/components/HandleBack";
import Trans from "../../common/containers/Trans";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import ImageGif from '../components/ImageGif';
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";
import * as APIDiary from "../../FoodDiary/api/api";

class FoodDetailScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            numberUnit: 1,
            FoodCalorie: 0,
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

    async  SaveFoodUser(number,foodData){
        Keyboard.dismiss();
        let date = new Date();
        const {user} = this.props.Users;
        let UserName = user.map((data) => {return data.UserName});
        let UserNames = `${UserName}`;
        let FoodName = foodData.FoodName;
        let numberFood = this.state.numberUnit;
        let numberUnit = parseInt(numberFood);
        let FoodCalorie = foodData.FoodCalorie;
        let FoodIMG = foodData.FoodIMG;
        let FoodUnit = foodData.FoodUnit;
        let dateNow = moment(date).format("YYYY-MM-DD");

        if(numberFood.toString() !== ''){
            if(numberFood.toString() !== numberUnit.toString() && numberFood.toString() !== ''){
                Alert.alert(
                    Trans.tran('general.alert'),
                    Trans.tran('MenuFood.alert.pleas_Integer'),
                    [
                        { text: Trans.tran('general.close'), onPress: () => {}, style: "cancel" },
                    ],
                    { cancelable: false },
                );
            }else{
                const response = await this.props.FETCH_SearchFoodName(UserNames,dateNow,FoodName);
                if(response.length !== 0){
                    let FoodNumbers = response.map((data) => {return data.FoodNumber});
                    numberFood = parseInt(numberFood) + parseInt(FoodNumbers);
                    FoodCalorie = FoodCalorie * numberFood;
                    this.props.FETCH_UpdateFoodUser(UserNames, FoodCalorie, numberFood, dateNow, FoodName);
                }else{
                    FoodCalorie = FoodCalorie * numberFood;
                    this.props.FETCH_InsertFoodUser(UserNames, FoodName, FoodCalorie, FoodIMG, FoodUnit, numberFood, dateNow);
                }
                if(number === 1){
                    this.props.navigation.navigate({
                        routeName: FOODDIARY_SCREEN
                    })
                }else if(number === 2){
                    this.props.navigation.navigate({
                        routeName: MENUFOOD_SCREEN
                    })
                }
            }
        }else{
            Alert.alert(
                Trans.tran('general.alert'),
                'กรุณาใส่จำนวนอาหาร',
                [
                    { text: Trans.tran('general.close'), onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
        }


    };

    render() {
        const { foodData } = this.props.navigation.state.params;
        let number = 1;
        let number1 = 2;
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <View style={styles.containerFood}>
                            <Image  style={styles.containerImgFood}
                                    source={{uri: foodData.FoodIMG}}
                            />
                            <View style={{width: '40%'}}>
                                <CommonText text={foodData.FoodName} style={styles.fontHead} />
                                <CommonText text={`${foodData.FoodCalorie} ${Trans.tran('FoodDiary.calorie')}`} color={'#068e81'} size={16} />
                            </View>
                            <View style={styles.viewNumberUnit} >
                                <TextInput style={styles.inputBox}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           defaultValue="1"
                                           placeholderTextColor = "#068e81"
                                           selectionColor="#fff"
                                           keyboardType="numeric"
                                           maxLength={2}
                                           onChangeText={numberUnit => this.setState({numberUnit: numberUnit === '' ? 0 : numberUnit})}
                                />
                                <CommonText text={foodData.FoodUnit} style={[styles.fontHead, {fontSize: 18}]} />
                            </View>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.viewRowSpace}>
                            <TouchableOpacity
                                style={[styles.button,{marginLeft: '5%'}]}
                                onPress={ () => this.SaveFoodUser(number,foodData) }
                            >
                                <CommonText text={Trans.tran('MenuFood.foodDetail.save_Diary')} style={styles.buttonText} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button,{marginRight: '5%'}]}
                                onPress={ () => this.SaveFoodUser(number1,foodData) }
                            >
                                <CommonText text={Trans.tran('MenuFood.foodDetail.save_Searching')} style={styles.buttonText} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewCenter }>
                            <View style={styles.viewRowCenter}>
                                <CommonText text={Trans.tran('MenuFood.foodDetail.amountcalories_compared')} />
                                <CommonText text={this.state.numberUnit}/>
                                <CommonText text={` ${foodData.FoodUnit}`} />
                            </View>
                            <View style={[styles.viewRowCenter,{ marginTop: 100}]}>
                                <ImageGif
                                    itemImage={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIRpi1.gif'}}
                                    nameImg={`${Trans.tran('MenuFood.foodDetail.imgGit.walk')} ${parseInt((foodData.FoodCalorie / 5) * this.state.numberUnit)} ${Trans.tran('MenuFood.foodDetail.imgGit.minute')}`}
                                />
                                <ImageGif
                                    itemImage={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIRVVW.gif'}}
                                    nameImg={`${Trans.tran('MenuFood.foodDetail.imgGit.run')} ${parseInt((foodData.FoodCalorie / 12) * this.state.numberUnit)} ${Trans.tran('MenuFood.foodDetail.imgGit.minute')}`}
                                />
                                <ImageGif
                                    itemImage={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIRH5g.gif'}}
                                    nameImg={`${Trans.tran('MenuFood.foodDetail.imgGit.spin')} ${parseInt((foodData.FoodCalorie / 10) * this.state.numberUnit)} ${Trans.tran('MenuFood.foodDetail.imgGit.minute')}`}
                                />
                                <ImageGif
                                    itemImage={{uri: 'https://66.media.tumblr.com/ecede36920fe80d915bdbf63fbb11638/tumblr_ob894kvYAk1qzomoco1_540.gif'}}
                                    nameImg={`${Trans.tran('MenuFood.foodDetail.imgGit.Swim')} ${parseInt((foodData.FoodCalorie / 12) * this.state.numberUnit)} ${Trans.tran('MenuFood.foodDetail.imgGit.minute')}`}
                                />
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
    headerTitle: <HeaderTitle text={Trans.tran('MenuFood.foodDetail.title')} color={'#fff'}/>,
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
        width: 40,
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        fontSize: 20,
        color: '#068e81',
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
    containerFood: {
        width: '100%',
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '2%'
    },
    containerImgFood: {
        marginHorizontal: 10,
        marginVertical: 10,
        width: 60,
        height: 60
    },
    fontHead: {
        fontSize: 18,
        color: '#068e81'
    },
    viewNumberUnit: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '0.5%'
    },
    separator: {
        height: 1 ,
        width: '100%',
        backgroundColor: '#080808',
        marginTop: 10
    },
    viewRowSpace: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    viewCenter: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewRowCenter: {
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        alignItems: 'center' ,
        justifyContent: 'center'
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
        FETCH_InsertFoodUser: bindActionCreators(APIDiary.fetchInsert, dispatch),
        FETCH_SearchFoodName: bindActionCreators(APIDiary.fetchSearchFoodName, dispatch),
        FETCH_UpdateFoodUser: bindActionCreators(APIDiary.fetchUpdateFoodUser, dispatch),
    })
)(FoodDetailScreen);

