import React from 'react';
import { View, StyleSheet, BackHandler, Alert, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { bindActionCreators } from "redux";
import MenuItem from "../components/MenuItem";
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import Trans from "../../common/containers/Trans";
import HandleBack from "../../common/components/HandleBack";
import { AllFoodType } from "../../MenuFood/redux/actions";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";
import { SERVER_URL } from "../../../common/constants";

class FoodTypeScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            editing: true,
            dataSource: []
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

    componentDidMount() {
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
            dataSource: dataFoodType
        })
    }

    _renderItem = ({item, index}) => {
        return (
            <MenuItem
                itemImage={item.TypeIMG}
                name={item.TypeName}
                onPress={() => this.props.navigation.navigate({routeName: MENUFOOD_SCREEN, params: {foodType: item}})}
            />
        )
    };

    render() {
        console.log('Update Store:', this.props);
        return (
            <HandleBack onBack={this.onBack}>
                <Container style={{ flex: 1}}>
                    <Content>
                        <View style={styles.container}>
                            <View style={styles.menuContainer}>
                                <FlatList
                                    data={this.state.dataSource}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item, index) => index}
                                    horizontal={false}
                                    numColumns={3}
                                />
                            </View>
                        </View>
                    </Content>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate( FOODDIARY_SCREEN )}
                        menuFoodScreen={() => this.props.navigation.navigate( MENUFOOD_SCREEN )}
                        bmiScreen={() => this.props.navigation.navigate( BMI_SCREEN )}
                        trickScreen={() => this.props.navigation.navigate( TRICK_SCREEN )}
                    />
                </Container>
            </HandleBack>
        );
    }
}

FoodTypeScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={Trans.tran('MenuFood.foodType.food_Category')} color={'#fff'} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 20
    },
    menuContainer: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
    }

});

function mapStateToProps(state) {
    return{
        FoodType: state.dataMenuFood,
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_GetFoodType: bindActionCreators(AllFoodType, dispatch),
        //FETCH_AllMenuFood: bindActionCreators(APIMenuFood.fetchAllMenuFood, dispatch),
    })
)(FoodTypeScreen);

