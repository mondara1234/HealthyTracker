import React from 'react';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../../BMI/router";
import { TRICK_SCREEN } from "../../Trick/router";

class aboutScreen extends React.PureComponent {
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
                        <Content padder>
                            <CommonText style={styles.textTitle} text={'เกี่ยวกับเรา'} />
                            <View style={styles.containerBody}>
                                <CommonText text={'Healthy Tracker'} />
                                <CommonText text={'คือ แอฟพลิเคชันดูแลสุขภาพในส่วนของการควบคุมอาหารในแต่ละวัน'} />
                            </View>
                            <CommonText style={styles.textHead} text={'รายละเอียดของ แอฟพลิเคชัน'} />
                            <View style={styles.containerBody}>
                                <CommonText text={'เนื้อหา..................................................................................' +
                                '........................................................................................' +
                                '........................................................................................' +
                                '........................................................................................'}
                                />
                            </View>
                            <CommonText style={styles.textHead} text={'ติดต่อเรา'} />
                            <View style={styles.containerBody}>
                                <CommonText text={'สอบถามข้อมูลเพิ่มเติมได้ทาง'} />
                                <CommonText text={'E-mail: kakzadsr@gmail.com'} />
                                <CommonText text={'เบอร์โทรศัพท์: 088-6060-128'} />
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

aboutScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'เกี่ยวกับเรา'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    containerBody: {
        marginHorizontal:20,
        marginTop: 10,
        marginLeft: 10
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 30
    },
    textHead: {
        fontSize: 22,
        marginTop:10,
        marginLeft: 30
    }

});

export default aboutScreen;
