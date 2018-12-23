import React from 'react';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import { Container, Content } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../../BMI/router";
import {TRICK_SCREEN} from "../../Trick/router";

class userManualScreen extends React.PureComponent {
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
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <Content>
                            <CommonText text={'คู่มือการใช้งานเบื้องต้น'} style={styles.textTitle} />
                            <View style={styles.containerBody}>
                                <Text style={styles.textbody}>
                                    {'เนื้อหา..................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '........................................................................................' +
                                    '..........................................................'}
                                </Text>
                            </View>
                        </Content>
                    </View>
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

userManualScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'คู่มือการใช้งาน'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    containerBody: {
        marginHorizontal:20,
        marginTop: 20
    },
    textTitle: {
        fontSize: 24,
        textAlign: 'center'
    },
    textbody :{
        fontSize: 18
    }

});
export default userManualScreen;
