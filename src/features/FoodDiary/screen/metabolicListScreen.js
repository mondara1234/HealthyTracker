import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, BackHandler, Alert, Keyboard } from 'react-native';
import { Container, Header, Thumbnail } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import Trans from "../../common/containers/Trans";
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { AllMetabolic } from "../redux/actions";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN, FOODDETAIL_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";
import {SERVER_URL} from "../../../common/constants";

class metabolicListScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            query: '',
            editing: true,
            statusSort: false
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
        this.AllFoodMenu();
    }


    async AllFoodMenu() {
        const response = await fetch(`${SERVER_URL}/My_SQL/foodDiary/AllmetabolicList.php`)
            .then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetAllMetabolic(response);//มีปัญหาอยู่
        const dataMetabolic = this.props.FoodMenu.metabolic;
        console.log('dataMetabolic',dataMetabolic);
        this.setState({
            films: response
        });
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{flexDirection: 'row', width: '99.9%'}}>
                <View style={{borderWidth: 1, width: '20%', alignItems: 'center', justifyContent: 'center'}}>
                    <Thumbnail square
                        source={{uri: item.img}}
                        style={{ width: 50, height: 50, marginHorizontal: '3%', marginVertical: '3%'}}
                    />
                </View>
                <View style={{borderWidth: 1, width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    <CommonText text={`${item.metabolic_Name}`} size={14}/>
                </View>
                <View style={{borderWidth: 1, width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    <CommonText text={`${item.Calorie}  กิโลแคลอรี่`} size={14} />
                </View>
            </View>
        )
    };

    render() {
        console.log('adas', this.state.films);
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Header style={styles.bgColorApp}>
                        <HeaderLeftMenu onPress={() => {
                            Keyboard.dismiss();
                            this.props.navigation.navigate('DrawerOpen')
                        }} />
                        <HeaderTitle text={'กิจกรรมการเผาผลาญแคลอรี่'} />
                        <View style={styles.viewRowCenter}>
                            <HeaderLeftMenu icon={ (this.state.statusSort === false ? 'sort-alpha-desc':'sort-alpha-asc')} style={{marginRight: 5}} onPress={() => this.sortFoodMenu()} />
                        </View>
                    </Header>
                    <View style={styles.container}>
                        <View style={styles.containerViewSearch}>
                            <Icon name={'search'} size={25}/>
                            <Autocomplete
                                style={styles.containerSearch}/*กำหนดรูปแบบช่องค้นหา*/
                                containerStyle={styles.autocompleteContainer}/*กำหนดรูปแบบแถบแสดงค้นหา*/
                                defaultValue={this.state.query} /*กำหนดค่าเริ่มต้นให้กับ แวรู้*/
                                //onChangeText={(value) => this.findFilm(value)} /*ส่งค่าที่กรอกเข้าไป*/
                                placeholder={'ใส่ชื่อกิจกรรมที่ต้องการค้นหา'} /*ลายน้ำเพื่อพิมจะหายไป*/
                            />
                            {/*{this.state.query ?*/}
                                {/*<TouchableOpacity onPress={() => this.BtnClear()} >*/}
                                    {/*<Icon name={'close'} size={25} />*/}
                                {/*</TouchableOpacity>*/}
                                {/*: null*/}
                            {/*}*/}
                        </View>
                        <View style={styles.viewNumberFound}>
                            <View style={{borderWidth: 1, width: '20%', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                <CommonText text={'รูปภาพ'} style={styles.fonttitleFoodType} />
                            </View>
                            <View style={{borderWidth: 1, width: '40%', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                <CommonText text={'กิจกรรม 1 ชั่วโมง'} style={styles.fonttitleFoodType} />
                            </View>
                            <View style={{borderWidth: 1, width: '40%', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                <CommonText text={'เผาผลาญ/กิโลแคลอรี่'} style={styles.fonttitleFoodType} />
                            </View>
                        </View>
                        <View style={styles.containerFlasList}>
                            <FlatList
                                data={this.state.films}
                                extraData={this.state}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    </View>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                        metabolicListScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                </Container>
            </HandleBack>
        );
    }
}

metabolicListScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    autocompleteContainer:{
        width: '50%',
        marginHorizontal: 10
    },
    containerSearch: {
        height: 40,
        backgroundColor:'#F4F4F4',
        color:'#068e81',
        borderWidth: 2,
        borderColor: '#068e81',
    },
    btnClear: {
        height:50,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10
    },
    containerRenderItem: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: "#F4F4F4",
        borderWidth: 1 ,
        borderColor: '#068e81'
    },
    listItem: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -7
    },
    bodyRendsrItem: {
        width: '100%',
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fontbase: {
        fontSize: 18,
        color: '#020202',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    fontCalorie: {
        fontSize: 14,
        color: '#068e81'
    },
    viewCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    listCheckBox: {
        backgroundColor: '#F4F4F4',
        borderBottomWidth: 0
    },
    fontCheckBox: {
        fontSize: 16
    },
    bgColorApp: {
        backgroundColor: '#068e81'
    },
    viewRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerCheckBox: {
        width: '99.9%',
        borderWidth: 1,
        borderColor: '#068E81'
    },
    containerViewSearch: {
        height: 50,
        width: '90%',
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    viewNumberFound: {
        width: '99.9%',
        height: 40,
        backgroundColor: "#068E81",
        flexDirection: 'row',
        alignItems: 'center'
    },
    fonttitleFoodType: {
        fontSize: 14,
        color: '#fff',
    },
    fontFoodType: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    containerFlasList: {
        flex: 1,
        width: '100%'
    }

});

function mapStateToProps(state) {
    return{
        FoodMenu: state.dataMenuFood
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_GetAllMetabolic: bindActionCreators(AllMetabolic, dispatch)
    })
)(metabolicListScreen);
