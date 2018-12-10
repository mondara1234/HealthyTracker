import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Container, CardItem, Left, Thumbnail, Card, Body, ListItem } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../../BMI/router";
import {TRICK_SCREEN} from "../../Trick/router";
import food from "../../FoodDiary/api/food";
import { DETAILEXERCISE_SCREEN } from "../router";

class exerciseScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: food,
            query: ''
        };
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{  width: '100%', height: 80, backgroundColor: "#F4F4F4", borderWidth: 1 }}>
                <ListItem  thumbnail
                           style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: -16, marginLeft: 5}}
                >
                    <Left>
                        <Image
                            source={{uri: item.picture.thumbnail}}
                            style={{ width: 100, height: 70}}
                        />
                    </Left>
                    <Body>
                    <View style={{width: '100%', height: 76, backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 16, color: '#020202', marginTop: 5, fontWeight: 'bold'}}>{item.name.first}</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <IconMaterialIcons
                                name="navigate-next" size={50} color={'#000'}
                                onPress={() => this.props.navigation.navigate({routeName: DETAILEXERCISE_SCREEN, params: {exerciseData: item}})}
                            />
                        </View>
                    </View>
                    </Body>
                </ListItem>
            </View>
        )
    };

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={{ flex: 1, width: '100%'}}>
                        <FlatList
                            data={this.state.films}
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
        );
    }
}

exerciseScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'ท่าออกกำลังกาย'}/>,
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
});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
    })
)(exerciseScreen);
