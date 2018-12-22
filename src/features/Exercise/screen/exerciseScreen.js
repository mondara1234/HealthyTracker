import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Container, Left, Body, ListItem, Content}  from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonText from '../../common/components/CommonText';
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../../BMI/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { DETAILEXERCISE_SCREEN } from "../router";
import DataExercise from "../api/DataExercise";

class exerciseScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: DataExercise
        };
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{  width: '98%', height: 90, backgroundColor: "#F4F4F4", borderWidth: 1, borderColor: '#068e81', marginTop: 5, marginLeft: '1%' }}>
                <ListItem  thumbnail
                           style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: -16, marginLeft: 5}}
                >
                    <Left>
                        <Image
                            source={{uri: item.picture.thumbnail}}
                            style={{ width: 100, height: 70, marginTop: 5}}
                        />
                    </Left>
                    <Body>
                        <View style={{width: '100%', height: 76, backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <CommonText text={item.name.first} />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <IconMaterialIcons
                                    name="navigate-next" size={50} color={'#068e81'}
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
                <Content>
                    <View style={styles.container}>
                        <View style={{ flex: 1, width: '100%'}}>
                            <FlatList
                                data={this.state.films}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    </View>
                </Content>
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
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
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
