import React from 'react';
import {StyleSheet, Text, TextInput, Image, View, TouchableOpacity, Dimensions, BackHandler, Alert} from 'react-native';
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

    render() {
        const { exerciseData } = this.props.navigation.state.params;
        const { width } = Dimensions.get('window');

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content>
                        <View style={styles.container}>
                            <Image  style={{width: width - 40, height: 150, marginVertical: 20}}
                                    source={{uri: exerciseData.picture.large}}
                            />
                            <CommonText text={exerciseData.name.first} style={{fontSize: 24, marginLeft: 15}} />
                            <View style={{flex: 1, width: width}}>
                                <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 10}}>
                                    <CommonText text={'Admin/28/11/61'} style={{ fontSize: 16 }} />
                                </View>
                                <View  style={{marginTop: 20,  alignItems: 'center', justifyContent: 'center'}}>
                                    <CommonText text={exerciseData.detailExercise} style={{ fontSize: 30, color: '#000'}} />
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
    headerTitle: <HeaderTitle text={`เคล็ดลับ: ${navigation.state.params.exerciseData.name.first}`} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 10,
        alignItems: 'center'
    },
    inputBox: {
        width: 60,
        height: 80,
        backgroundColor: '#fff',
        borderWidth: 1,
        fontSize: 25,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    button: {
        width: 150,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 30,
        marginLeft: 20,
        backgroundColor: '#068e81'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
});

export default withNavigation(DetailExerciseScreen);
