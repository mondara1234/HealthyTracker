import React from 'react';
import { StyleSheet, View, BackHandler, Alert, WebView } from 'react-native';
import { Container, Content } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import Trans from "../../common/containers/Trans";
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
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <Content padder>
                            <CommonText style={styles.textTitle} text={Trans.tran('About.about')} />
                            <View style={styles.containerBody}>
                                <CommonText text={'Healthy Tracker'} />
                                <CommonText text={'คือ แอพพลิเคชั่นดูแลสุขภาพในส่วนของการควบคุมอาหารในแต่ละวัน'} />
                            </View>
                            <CommonText style={styles.textHead} text={Trans.tran('About.details_Application')} />
                            <View style={styles.containerBody}>
                                <CommonText
                                    text={
                                        'แอพพลิเคชั่น Healthy Tracker เป็น แอพพลิเคชั่นที่จะคอยควบคุมการรับประทานอาหารในแต่ละวันของผู้ใช้เพื่อให้ผู้ใช้ได้มีสุขภาพที่ดูดีหรือตามที่ต้องการโดยผู้ใช้จะต้องทำการเพิ่มอาหารที่รับประทานในแต่ละวันเพื่อให้ระบบได้ทำการประมวลผลของแคลอรี่ที่ได้รับประทานไปในแต่ละวันว่าเกิน ขาด หรือพอดีตามมาตราฐานที่ต้องได้รับต่อวันหรือไม่และทางผู้ดูแลระบบจะคอยตรวจสอบคำนวณสถิติจากอาหารของผู้ใช้เพื่อทำการแนะนำผู้ใช้อีกทางเปรียบเสมือน เทรนเนอร์ ส่วนตัวให้กับคุณและภายในแอพพลิเคชั่นยังมีเคล็ดลับเกี่ยวกับสุขภาพและข้อแนะนำตามค่าดัชนีมวลกายให้ผู้ใช้ได้ศึกษาหาข้อมูลเพิ่มอีกด้วย'
                                    }
                                 />
                            </View>
                            <CommonText style={styles.textHead} text={Trans.tran('About.contact')} />
                            <View style={[styles.containerBody, {marginBottom: '10%'}]}>
                                <CommonText text={Trans.tran('About.information_Please')} />
                                <CommonText text={`${'ชื่อผู้พัฒนา'}: กมลพัชร์ พิสทุธิกมล`} />
                                <CommonText text={`${Trans.tran('About.e_mail')}: kakzadsr@gmail.com`} />
                                <CommonText text={`${Trans.tran('About.telephone')}: 088-6060-128`} />
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
    headerTitle: <HeaderTitle text={Trans.tran('About.about')} />,
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
        marginLeft: 30
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 10
    },
    textHead: {
        fontSize: 22,
        marginTop:10,
        marginLeft: 10
    }

});

export default aboutScreen;
