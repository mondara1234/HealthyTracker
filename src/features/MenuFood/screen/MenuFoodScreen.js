import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList, BackHandler, Alert} from 'react-native';
import { Container, Header, Left, Thumbnail, CheckBox, Body, ListItem } from 'native-base';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN, FOODDETAIL_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";
import {SERVER_URL} from "../../../common/constants";
import {AllFoodType, AllMenuFood} from "../redux/actions";
import Trans from "../../common/containers/Trans";
import Icon from "react-native-vector-icons/FontAwesome";

class menuFoodScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            setDataFood: [],
            dataFoodType: [],
            nameFoodType: '',
            lengthFoodType: 0,
            query: '',
            editing: true,
            statusCheckBox: false,
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
        const { foodType } = this.props.navigation.state.params ? this.props.navigation.state.params : '';
        let foodTypes = foodType === undefined ? '' : `${foodType.TypeName}`;
        let dataFoodType = foodType ? foodTypes : '';
        if(dataFoodType === ''){
            this.AllFoodMenu();
            this.setState({
                nameFoodType: Trans.tran('MenuFood.all')
            })
        }else{
            this.SerachFoodMenu(foodTypes);
            this.setState({
                nameFoodType: foodTypes
            })
        }
        this.getDataFoodMenu();
    }

    async getDataFoodMenu() {
        const response = await fetch(`${SERVER_URL}/My_SQL/MenuFood/AllFoodType.php`)
            .then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetFoodType(response);

        const dataFoodType = this.props.FoodType.foodType;

        this.setState({
            dataFoodType: dataFoodType
        })
    }

    async SerachFoodMenu(foodTypes) {
        const response = await fetch(`${SERVER_URL}/My_SQL/MenuFood/SeachFoodType.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodtypes: foodTypes
            })
        }).then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetMenuFood(response);
        const dataFoodMenu = this.props.FoodMenu.foodMenu;

        this.setState({
            films: dataFoodMenu,
            setDataFood: dataFoodMenu,
            lengthFoodType: dataFoodMenu.length
        })
    }

    async AllFoodMenu() {
        const response = await fetch(`${SERVER_URL}/My_SQL/MenuFood/AllMenuFood.php`)
            .then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetMenuFood(response);
        const dataFoodMenu = this.props.FoodMenu.foodMenu;
        this.setState({
            films: dataFoodMenu,
            setDataFood: dataFoodMenu,
            lengthFoodType: dataFoodMenu.length
        })
    }

     sortFoodMenu() {
        const response = this.state.films;
        if(this.state.statusSort === false){
            response.reverse(function(a, b){
                return b-a}
            );
            response.sort(function(a, b){
                return a-b}
            );
            this.setState({
                films: response,
                statusSort: true
            });
        }else{
            response.sort(function(a, b){
                return a-b}
            );
            response.reverse(function(a, b){
                return b-a}
            );
            this.setState({
                films: response,
                statusSort: false
            });
        }
        console.log('this.state.statusSort',this.state.statusSort);

         console.log('asdasd',response);
    }

    //ไว้รับค่าแล้วค้นหา
    findFilm(value) {
        this.setState({query: value});
        let data = this.state.setDataFood;
        if (value === '') {
            this.setState({
                films: data,
                lengthFoodType: data.length
            })
        }else{
            this.SearchFoodMenu(value)
        }
    }

    async SearchFoodMenu(value) {
        let valueFoodName =`${value}`;
        const response = await fetch(`${SERVER_URL}/My_SQL/MenuFood/SeachFoodName.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodname : valueFoodName,
            })
        }).then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetMenuFood(response);
        const dataFoodMenu = this.props.FoodMenu.foodMenu;
        let data = [];
        if( dataFoodMenu === 'ไม่พบ' ){
            this.setState({
                films: data,
                lengthFoodType: data.length
            })
        }else{
            this.setState({
                films: dataFoodMenu,
                lengthFoodType: dataFoodMenu.length
            })
        }

    }

    BtnClear(){ // ปุ่ม x (ลบ)
        let data = this.state.setDataFood;
        this.setState({
            films: data,
            query: '',
            lengthFoodType: data.length
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{  width: '100%', height: 70, backgroundColor: "#F4F4F4", borderWidth: 1 , borderColor: '#068e81'}}>
                <ListItem  thumbnail
                           style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: -7 }}
                           onPress={() => this.props.navigation.navigate({routeName: FOODDETAIL_SCREEN, params: {foodData: item}}) }
                >
                    <Left>
                        <Thumbnail
                            source={{uri: item.FoodIMG}}
                            style={{ width: 60, height: 60}}
                        />
                    </Left>
                    <Body style={{ width: '100%'}}>
                    <View style={{ width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                            <Text numberOfLines={1} style={{fontSize: 18, color: '#020202', marginBottom: 5, fontWeight: 'bold'}}>{item.FoodName}</Text>
                            <CommonText text={`${item.FoodCalorie} ${Trans.tran('FoodDiary.calorie')}`} style={{ fontSize: 14, color: '#068e81'}} />
                        </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <IconMaterialIcons name="navigate-next" size={30} color={'#068e81'} />
                            </View>
                    </View>
                    </Body>
                </ListItem>
            </View>
        )
    };

    selectCheckBox = (item) => {
        let foodTypes = `${item.TypeName}`;
        if(foodTypes !== this.state.nameFoodType){
            this.SerachFoodMenu(foodTypes);
            this.setState({
                nameFoodType: foodTypes
            })
        }else{
            this.AllFoodMenu();
            this.setState({
                nameFoodType: Trans.tran('MenuFood.all')
            })
        }

    };

    checkedCheckBox = (item) => {
        let status = this.state.nameFoodType === `${item.TypeName}` ? true: false;
        return status;
    };

    _renderCheckBox = ({ item, index }) => {
        return (
            <View style={{flex:1}}>
                <ListItem style={{backgroundColor: '#F4F4F4', borderBottomWidth: 0}}>
                    <CheckBox
                        checked={this.checkedCheckBox(item)}
                        onPress={() => {this.selectCheckBox(item)}}
                    />
                    <Body>
                        <CommonText text={item.TypeName} style={{fontSize: 16, marginLeft: 3}} />
                    </Body>
                </ListItem>
            </View>
        )
    };

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Header style={{backgroundColor: '#068e81'}}>
                        <HeaderLeftMenu onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                        <HeaderTitle text={Trans.tran('MenuFood.title')} />
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <HeaderLeftMenu icon={'flask'} onPress={() => this.setState({statusCheckBox: !this.state.statusCheckBox }) } />
                            <HeaderLeftMenu icon={ (this.state.statusSort === false ? 'sort-alpha-desc':'sort-alpha-asc')} style={{marginRight: 5}} onPress={() => this.sortFoodMenu()} />
                        </View>
                    </Header>
                    <View style={styles.container}>
                        {this.state.statusCheckBox ?
                            <View style={{width: '99.9%', borderWidth: 1, borderColor: '#068E81'}}>
                                <CommonText text={Trans.tran('MenuFood.can_one')} style={{fontSize: 16, margin: 5}} />
                                <FlatList
                                    data={this.state.dataFoodType}
                                    extraData={this.state}
                                    renderItem={this._renderCheckBox}
                                    keyExtractor={(item, index) => index}
                                    horizontal={false}
                                    numColumns={2}
                                />
                            </View>
                            : null
                        }
                        <View style={{height: 50, width: '90%', backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 5, }}>
                            <Icon name={'search'} size={25}/>
                            <Autocomplete
                                style={styles.containerSearch}/*กำหนดรูปแบบช่องค้นหา*/
                                containerStyle={styles.autocompleteContainer}/*กำหนดรูปแบบแถบแสดงค้นหา*/
                                defaultValue={this.state.query} /*กำหนดค่าเริ่มต้นให้กับ แวรู้*/
                                onChangeText={(value) => this.findFilm(value)} /*ส่งค่าที่กรอกเข้าไป*/
                                placeholder={Trans.tran('MenuFood.fill_Food_Name')} /*ลายน้ำเพื่อพิมจะหายไป*/
                            />
                            {this.state.query ?
                                <TouchableOpacity onPress={() => this.BtnClear()} >
                                    <Icon name={'close'} size={25} />
                                </TouchableOpacity>
                                 : null
                             }
                        </View>
                        <View style={{ width: '100%',height: 40, backgroundColor: "#068E81", flexDirection: 'row', alignItems: 'center'}}>
                            <CommonText text={Trans.tran('MenuFood.foodSearch.category')} style={{ fontSize: 14, color: '#fff', marginLeft: 10}} />
                            <CommonText text={this.state.nameFoodType} style={{ fontSize: 16, color: '#fff', marginLeft: 5, fontWeight: 'bold'}} />
                            <CommonText text={Trans.tran('MenuFood.number_Found')} style={{ fontSize: 14, color: '#fff', marginLeft: 10}} />
                            <CommonText text={this.state.lengthFoodType} style={{ fontSize: 16, color: '#fff', marginLeft: 5, fontWeight: 'bold'}} />
                            <CommonText text={Trans.tran('MenuFood.list')} style={{ fontSize: 14, color: '#fff', marginLeft: 5}} />
                        </View>
                        <View style={{ flex: 1, width: '100%'}}>
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
                        menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                </Container>
            </HandleBack>
        );
    }
}

menuFoodScreen.navigationOptions  = ({navigation}) => ({
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
    }
});

function mapStateToProps(state) {
    return{
        FoodMenu: state.dataMenuFood,
        FoodType: state.dataMenuFood,
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_GetMenuFood: bindActionCreators(AllMenuFood, dispatch),
        REDUCER_GetFoodType: bindActionCreators(AllFoodType, dispatch),
    })
)(menuFoodScreen);
