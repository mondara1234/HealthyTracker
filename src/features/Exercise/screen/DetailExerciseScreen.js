import React from 'react';
import {StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import {bindActionCreators} from "redux";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {TRICK_SCREEN} from "../router";
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {BMI_SCREEN} from "../../BMI/router";
import {Images} from "../../User/components/images";

class DetailExerciseScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { exerciseData } = this.props.navigation.state.params;
        return (
            <Container>
                <View style={styles.container}>
                    <Image  style={{marginHorizontal: 10 ,marginVertical: 10, width: '94%', height: 150}}
                            source={{uri: exerciseData.picture.large}}
                    />
                    <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold', marginLeft: 15}}>{exerciseData.name.first}</Text>
                    <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 10}}>
                        <Text style={{ fontSize: 16, color: '#000'}}> {'Admin/28/11/61'} </Text>
                    </View>
                    <View  style={{marginTop: 20,  alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ fontSize: 30, color: '#000'}}> {'ส่วนของเนื้อหา'} </Text>
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

DetailExerciseScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'เคล็ดลับ: ชื่อที่เรากดเข้ามา'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 10
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
