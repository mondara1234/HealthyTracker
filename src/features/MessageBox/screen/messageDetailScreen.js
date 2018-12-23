import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, Dimensions, BackHandler, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HandleBack from "../../common/components/HandleBack";
import {bindActionCreators} from "redux";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { BMI_SCREEN } from "../../BMI/router";

class messageDetailScreen extends React.PureComponent {
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
        const { messageData } = this.props.navigation.state.params;
        const { width } = Dimensions.get('window');

        return (
            <HandleBack onBack={this.onBack}>
                <Container style={styles.container}>
                    <View style={styles.container}>
                        <Content>
                            <CommonText text={messageData.title} style={{fontSize: 22, marginLeft: 15}} />
                            <View  style={{marginTop: 20,  alignItems: 'center', justifyContent: 'center'}}>
                                <CommonText text={messageData.detail} style={{ fontSize: 20, color: '#000'}} />
                            </View>
                        </Content>
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

messageDetailScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'รายละเอียดข้อความ'} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
    },
});

export default withNavigation(messageDetailScreen);
