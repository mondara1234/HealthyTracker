import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Container, CardItem, Left, Thumbnail, Card, Body, ListItem } from 'native-base';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import food from '../../FoodDiary/api/food';
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN, FOODDETAIL_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";

class menuFoodScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: food,
            query: ''
        };
    }

    //ไว้รับค่าแล้วค้นหา
    findFilm(query) {
        if (query === '') {
            return [];
        }

        const { films } = this.state;
        return films.filter(searchData => searchData.name.first.search(query.trim()) >= 0);
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
                    <Text style={{fontSize: 18, color: '#020202', marginBottom: 5, fontWeight: 'bold'}}>{item.name.first}</Text>
                    <View style={{backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}>
                        <IconMaterialIcons name="navigate-next" size={40} color={'#000'} style={{ marginTop: 100}} />
                    </View>
                    <Text style={{ fontSize: 14, color: '#068e81'}}> {item.calorie + ' แคลอรี่'} </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{  width: '100%', height: 70, backgroundColor: "#F4F4F4", borderWidth: 1 }}>
                <ListItem  thumbnail
                           style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: -7 }}
                           onPress={() => this.props.navigation.navigate({routeName: FOODDETAIL_SCREEN, params: {foodData: item}}) }
                >
                    <Left>
                        <Thumbnail
                            source={{uri: item.picture.thumbnail}}
                            style={{ width: 60, height: 60}}
                        />
                    </Left>
                    <Body style={{ width: '100%'}}>
                    <View style={{ width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                            <Text style={{fontSize: 18, color: '#020202', marginBottom: 5, fontWeight: 'bold'}}>{item.name.first}</Text>
                            <Text style={{ fontSize: 14, color: '#068e81'}}> {item.calorie + ' แคลอรี่'} </Text>
                        </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <IconMaterialIcons name="navigate-next" size={30} color={'#000'} />
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
                        renderItem={({ calorie, name }) => (
                            <TouchableOpacity onPress={() => alert(calorie + name.first)}>
                                <Text style={styles.itemText}>
                                    {name.first} ({'แสดงตรงค้นหา'})
                                </Text>
                            </TouchableOpacity>/*กำหนดรูปแบบการแสดงในช่่องค้นหาที่จะขึ้นเมื่อกรอกข้อความ*/
                        )}
                    />
                    <View style={{ width: '100%',height: 40, backgroundColor: "#068E81", flexDirection: 'row', marginTop: 60, alignItems: 'center'}}>
                        <Text style={{ fontSize: 14, color: '#fff', marginLeft: 10}}> {'หมวดหมู่'}</Text>
                        <Text style={{ fontSize: 14, color: '#fff', marginLeft: 5}}> {' จานเดียว'}</Text>
                        <Text style={{ fontSize: 14, color: '#fff', marginLeft: 10}}> {'  จำนวนที่พบ'}</Text>
                        <Text style={{ fontSize: 14, color: '#fff', marginLeft: 5}}> {' 25'}</Text>
                        <Text style={{ fontSize: 14, color: '#fff', marginLeft: 5}}> {' รายการ'}</Text>
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
        );
    }
}

menuFoodScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'รายการอาหาร'} color={'#fff'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
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

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
    })
)(menuFoodScreen);
