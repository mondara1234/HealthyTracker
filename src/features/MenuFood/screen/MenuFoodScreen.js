import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList, BackHandler, Alert} from 'react-native';
import { Container, CardItem, Left, Thumbnail, Card, Body, ListItem } from 'native-base';
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
import food from '../../FoodDiary/api/food';
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN, FOODDETAIL_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";
import {SERVER_URL} from "../../../common/constants";
import {AllMenuFood} from "../redux/actions";

class menuFoodScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            nameFoodType: '',
            lengthFoodType: 0,
            query: '',
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
        const { foodType } = this.props.navigation.state.params ? this.props.navigation.state.params : '';
        console.log('foodType'+foodType);
        let foodTypes = foodType === undefined ? '' : `${foodType.TypeName}`;
        console.log('foodTypes'+foodTypes);
        let dataFoodType = foodType ? foodTypes : '';
        if(dataFoodType === ''){
            this.AllFoodMenu();
            this.setState({
                nameFoodType: 'ทั้งหมด'
            })
        }else{
            this.SerachFoodMenu(foodTypes);
            this.setState({
                nameFoodType: foodTypes
            })
        }

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
        console.log(dataFoodMenu);
        this.setState({
            films: dataFoodMenu,
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
        console.log(response);
        this.props.REDUCER_GetMenuFood(response);

        const dataFoodMenu = this.props.FoodMenu.foodMenu;
        console.log(dataFoodMenu);

        this.setState({
            films: dataFoodMenu,
            lengthFoodType: dataFoodMenu.length
        })
    }
    //ไว้รับค่าแล้วค้นหา
    findFilm(query) {
        if (query === '') {
            return [];
        }

        const { films } = this.state;
        return films.filter(searchData => searchData.FoodName.search(query.trim()) >= 0);
        /* film.episode_id ต้องการค้นหาจากอะไร*/
        /* filter  trim  คิอไร*/
    }

    //ไว้แสดงข้อความ
    static renderFilm(getFilms) {
        const { tyle, name, calorie, picture, key } = getFilms;

        return (
            <Card style={{ backgroundColor: "#2f56b1", borderWidth:2 }}>
                <CardItem  style={{backgroundColor: "#2f56b1", borderWidth:2 }}>
                    <Left  style={{backgroundColor: "#2f56b1", borderWidth:2 }}>
                        <Thumbnail
                            source={{uri: picture.thumbnail}}
                            style={{ width: 60, height: 60 }}
                        />
                    </Left>
                    <Body>
                    <Text numberOfLines={1} style={{fontSize: 18, color: '#020202', marginBottom: 5, fontWeight: 'bold'}}>{name.first}</Text>
                    <View style={{backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}>
                        <IconMaterialIcons name="navigate-next" size={40} color={'#000'} style={{ marginTop: 100}} />
                    </View>
                    <CommonText text={calorie + ' แคลอรี่'} style={{ fontSize: 14, color: '#068e81'}} />
                    </Body>
                </CardItem>
            </Card>
        );
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
                            <CommonText text={item.FoodCalorie + ' แคลอรี่'} style={{ fontSize: 14, color: '#068e81'}} />
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

    render() {
        const films = this.findFilm(this.state.query);//ประกาศตัวแปร เพื่อรับค่า findFilm โดยส่งค่า query ไป

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <Autocomplete
                            autoCapitalize="none" /*ไม่ต้องมีก็ได้*/
                            autoCorrect={true} /*ไม่ต้องมีก็ได้*/
                            style={styles.containerSearch}/*กำหนดรูปแบบช่องค้นหา*/
                            containerStyle={styles.autocompleteContainer}/*กำหนดรูปแบบแถบแสดงค้นหา*/
                            data={films.length === 1 ? [] : films}  /*ตรวจสอบข้อมูลที่หาเจอถ้ามีแค่อันเดียว ไม่แสดงช่องค้นหา แต่ถ้ามีเยอะจะแสดงให้เลือก*/
                            defaultValue={this.state.query} /*กำหนดค่าเริ่มต้นให้กับ แวรู้*/
                            onChangeText={text => this.setState({ query: text })} /*setค่าให้กับตัวแปล query เป้นไปตามที่กรอก*/
                            placeholder="กรอกชื่ออาหาร" /*ลายน้ำเพื่อพิมจะหายไป*/
                            renderItem={({ FoodCalorie, FoodName }) => (
                                <TouchableOpacity onPress={() => alert(`${FoodCalorie} ${FoodName}`)}>
                                    <CommonText text={`${FoodName} แสดงตรงค้นหา`} style={styles.itemText}/>
                                </TouchableOpacity>/*กำหนดรูปแบบการแสดงในช่่องค้นหาที่จะขึ้นเมื่อกรอกข้อความ*/
                            )}
                        />
                        <View style={{ width: '100%',height: 40, backgroundColor: "#068E81", flexDirection: 'row', marginTop: 60, alignItems: 'center'}}>
                            <CommonText text={'หมวดหมู่ '} style={{ fontSize: 14, color: '#fff', marginLeft: 10}} />
                            <CommonText text={this.state.nameFoodType} style={{ fontSize: 16, color: '#fff', marginLeft: 5, fontWeight: 'bold'}} />
                            <CommonText text={' จำนวนที่พบ '} style={{ fontSize: 14, color: '#fff', marginLeft: 10}} />
                            <CommonText text={this.state.lengthFoodType} style={{ fontSize: 16, color: '#fff', marginLeft: 5, fontWeight: 'bold'}} />
                            <CommonText text={' รายการ'} style={{ fontSize: 14, color: '#fff', marginLeft: 5}} />
                        </View>
                        <View style={{ flex: 1, width: '100%'}}>
                            <FlatList
                                data={this.state.films}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        {/*<View style={styles.descriptionContainer}>
                            {films.length > 0 ? (
                                menuFoodScreen.renderFilm(films[0])//คือไรทำไมเขียนแบบนี้
                            ) : (
                                <Text style={styles.infoText}>
                                    Enter Title of a Star Wars movie{'แสดงเนื้อหสด้านล่าง'}
                                </Text>
                            )}
                        </View>*/}
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
    headerTitle: <HeaderTitle text={'รายการอาหาร'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <HeaderLeftMenu icon={'flask'} onPress={() => alert('เลือกประเภทของการแสดงข้อมูล')} />
            <HeaderLeftMenu icon={'sort-alpha-asc'} onPress={() => alert('เรียงลำดับข้อมูล')} />
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    autocompleteContainer: {
        flex: 1,
        left: '20%',
        position: 'absolute',
        right: '20%',
        top: 0,
        marginTop: 20,
    },
    itemText: {
        fontSize: 15,
        margin: 2,
        color:'#dd1222'
    },
    containerSearch: {
        height: 40,
        backgroundColor:'#F4F4F4',
        color:'#068e81',
        borderWidth: 2,
        borderColor: '#068e81',
    },
    descriptionContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});

function mapStateToProps(state) {
    return{
        FoodMenu: state.dataMenuFood,
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_GetMenuFood: bindActionCreators(AllMenuFood, dispatch),
    })
)(menuFoodScreen);
