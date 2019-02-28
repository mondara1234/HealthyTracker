import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList, BackHandler, Alert, Keyboard} from 'react-native';
import { Container, Header, Left, Thumbnail, CheckBox, Body, ListItem } from 'native-base';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import { AllFoodType, AllMenuFood } from "../redux/actions";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN, FOODDETAIL_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";
import {SERVER_URL} from "../../../common/constants";
import {getRouteName} from "../../User/redux/actions";

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
        let rountname = 'รายการอาหาร';
        this.props.REDUCER_ROUNTNAME(rountname);

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
        Keyboard.dismiss();
        const response = this.state.films;
        if(this.state.statusSort === false){
            response.sort(function (a, b) {
                if(a.FoodName < b.FoodName) { return -1; }
                if(a.FoodName > b.FoodName) { return 1; }
                return 0;
            });
            this.setState({
                films: response,
                statusSort: true
            });
        }else{
            response.reverse(function(a, b){
                if(a.FoodName < b.FoodName) { return -1; }
                if(a.FoodName > b.FoodName) { return 1; }
                return 0;
            });
            this.setState({
                films: response,
                statusSort: false
            });
        }
    }

    //ไว้รับค่าแล้วค้นหา
    findFilm(value) {
        this.setState({query: value});
        let data = this.state.setDataFood;
        let nameFoodType = this.state.nameFoodType;
        if (value === '') {
            this.setState({
                films: data,
                lengthFoodType: data.length
            })
        }else{
            this.SearchFoodMenu(value,nameFoodType)
        }
    }

    async SearchFoodMenu(value, nameFoodType) {
        let valueFoodName = `${value}`;
        let FoodType = `${nameFoodType}`;
        const response = await fetch(`${SERVER_URL}/My_SQL/MenuFood/SeachFoodName.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodname : valueFoodName,
                nameFoodtype: FoodType
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
            <View style={styles.containerRenderItem}>
                <ListItem  thumbnail
                           style={styles.listItem}
                           onPress={() => this.props.navigation.navigate({routeName: FOODDETAIL_SCREEN, params: {foodData: item}}) }
                >
                    <Left>
                        <Thumbnail
                            source={{uri: item.FoodIMG}}
                            style={{ width: 60, height: 60}}
                        />
                    </Left>
                    <Body>
                    <View style={styles.bodyRendsrItem}>
                        <View>
                            <Text numberOfLines={1} style={styles.fontbase}>{item.FoodName}</Text>
                            <CommonText text={`${item.FoodCalorie} ${Trans.tran('FoodDiary.calorie')}`} style={styles.fontCalorie} />
                        </View>
                        <View style={styles.viewCenter}>
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
                <ListItem style={styles.listCheckBox}>
                    <CheckBox
                        checked={this.checkedCheckBox(item)}
                        onPress={() => {this.selectCheckBox(item)}}
                    />
                    <Body>
                        <CommonText text={item.TypeName} style={[styles.fontCheckBox, {marginLeft: 3}]} />
                    </Body>
                </ListItem>
            </View>
        )
    };

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Header style={styles.bgColorApp}>
                        <HeaderLeftMenu
                            onPress={() => {
                                Keyboard.dismiss();
                                this.props.navigation.navigate('DrawerOpen')
                            }}
                        />
                        <HeaderTitle text={Trans.tran('MenuFood.title')} />
                        <View style={styles.viewRowCenter}>
                            <HeaderLeftMenu
                                icon={'flask'}
                                onPress={() =>
                                {
                                    Keyboard.dismiss();
                                    this.setState({statusCheckBox: !this.state.statusCheckBox })
                                }}
                            />
                            <HeaderLeftMenu
                                icon={ (this.state.statusSort === false ? 'sort-alpha-desc':'sort-alpha-asc')}
                                style={{marginRight: 5}}
                                onPress={() => this.sortFoodMenu()}
                            />
                        </View>
                    </Header>
                    <View style={styles.container}>
                        {this.state.statusCheckBox ?
                            <View style={styles.containerCheckBox}>
                                <CommonText text={Trans.tran('MenuFood.can_one')} style={[styles.fontCheckBox, {margin: 5}]} />
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
                        <View style={styles.containerViewSearch}>
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
                        <View style={styles.viewNumberFound}>
                            <CommonText text={Trans.tran('MenuFood.foodSearch.category')} style={styles.fonttitleFoodType} />
                            <CommonText text={this.state.nameFoodType} style={styles.fontFoodType} />
                            <CommonText text={Trans.tran('MenuFood.number_Found')} style={styles.fonttitleFoodType} />
                            <CommonText text={this.state.lengthFoodType} style={styles.fontFoodType} />
                            <CommonText text={Trans.tran('MenuFood.list')} style={styles.fonttitleFoodType} />
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
    },
    containerRenderItem: {
        width: '100%',
        height: 70,
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
        backgroundColor: '#9c1700'
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
        width: '100%',
        height: 40,
        backgroundColor: "#068E81",
        flexDirection: 'row',
        alignItems: 'center'
    },
    fonttitleFoodType: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10
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
        FoodMenu: state.dataMenuFood,
        FoodType: state.dataMenuFood
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_GetMenuFood: bindActionCreators(AllMenuFood, dispatch),
        REDUCER_GetFoodType: bindActionCreators(AllFoodType, dispatch),
        REDUCER_ROUNTNAME: bindActionCreators(getRouteName, dispatch),
    })
)(menuFoodScreen);
