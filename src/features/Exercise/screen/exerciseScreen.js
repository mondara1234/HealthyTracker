import React from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Image, BackHandler, Alert} from 'react-native';
import { Container, Left, Body, ListItem, Content}  from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonText from '../../common/components/CommonText';
import SideMenu from '../../common/components/SideMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HandleBack from "../../common/components/HandleBack";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../../BMI/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { DETAILEXERCISE_SCREEN } from "../router";
import {SERVER_URL} from "../../../common/constants";
import {AllMenuFood} from "../../Exercise/redux/actions";
import Trans from "../../common/containers/Trans";

class exerciseScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            DataExercise: [],
            editing: true
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
        const {user} = this.props.Users;
        const UserName = user.map((data) => {return data.UserName});
        this.SerachUserExercise(UserName);
    }

    async SerachUserExercise(UserName) {
        let UserNames = `${UserName}`;
        const response = await fetch(`${SERVER_URL}/My_SQL/Exercise/SerachUserExercise.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: UserNames
            })
        }).then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_SearchExercise(response);
        const dataExercise = this.props.ExerciseUser.exerciseUser;
        console.log(dataExercise);
        this.setState({
            DataExercise: dataExercise
        });
        console.log(this.state.DataExercise);
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{  width: '98%', height: 90, backgroundColor: "#F4F4F4", borderWidth: 1, borderColor: '#068e81', marginTop: 5, marginLeft: '1%' }}>
                <ListItem  thumbnail
                           style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: -16, marginLeft: 5}}
                >
                    <Left>
                        <Image
                            source={{uri: item.ExerciseIMG}}
                            style={{ width: 100, height: 70, marginTop: 5}}
                        />
                    </Left>
                    <Body>
                    <View style={{width: '100%', height: 76, backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{width: '80%', height: 76, backgroundColor: "#F4F4F4"}}>
                            <CommonText text={item.ExerciseName} />
                        </View>
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
        console.log('Update Store:', this.props);
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content>
                        <View style={styles.container}>
                            <View style={{ flex: 1, width: '100%'}}>
                                <FlatList
                                    data={this.state.DataExercise}
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
            </HandleBack>
        );
    }
}

exerciseScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={Trans.tran('Exercise.title')}/>,
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

function mapStateToProps(state) {
    return{
        Users: state.dataUser,
        ExerciseUser: state.dataExerciseUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_SearchExercise: bindActionCreators(AllMenuFood, dispatch),
    })
)(exerciseScreen);
