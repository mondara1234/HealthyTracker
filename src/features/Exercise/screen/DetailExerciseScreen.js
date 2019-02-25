import React from 'react';
import {StyleSheet, Text, TextInput, Image, View, TouchableOpacity, Dimensions, BackHandler, Alert, Linking } from 'react-native';
import { Container, Content } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HandleBack from "../../common/components/HandleBack";
import {bindActionCreators} from "redux";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {TRICK_SCREEN} from "../router";
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {BMI_SCREEN} from "../../BMI/router";
import Trans from "../../common/containers/Trans";

class DetailExerciseScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
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

    render() {
        const { exerciseData } = this.props.navigation.state.params;
        const { width } = Dimensions.get('window');

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content>
                        <View style={styles.container}>
                            <Image  style={{width: width - 40, height: 150, marginVertical: 20}}
                                    source={{uri: exerciseData.ExerciseIMG}}
                            />
                            <CommonText text={exerciseData.ExerciseName} style={{fontSize: 24, marginHorizontal: 15}} />
                            <View style={{flex: 1, width: width}}>
                                <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 10}}>
                                    <CommonText text={`${exerciseData.PeopleAdd}/${exerciseData.DateAdded}`} style={{ fontSize: 16 }} />
                                </View>
                                <View  style={{marginTop: 20, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10}}>
                                    <CommonText text={exerciseData.ExerciseDetail} />
                                    <View style={{width: '90%', flexDirection: 'row', marginTop: 15, marginLeft: -30}}>
                                        <CommonText text={`${Trans.tran('Exercise.source')} :`} />
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL(exerciseData.sourceURL)}
                                        >
                                            <CommonText text={exerciseData.sourceURL} style={{color: 'blue'}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
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

DetailExerciseScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={`${Trans.tran('Exercise.topic')}: ${navigation.state.params.exerciseData.ExerciseName}`} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 10,
        alignItems: 'center'
    }
});

export default withNavigation(DetailExerciseScreen);
