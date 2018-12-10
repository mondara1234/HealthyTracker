import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Container, Content } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../../BMI/router";
import {TRICK_SCREEN} from "../../Trick/router";

class aboutScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Content>
                        <Text style={styles.textTitle}>{'เกี่ยวกับเรา'}</Text>
                        <View style={styles.containerBody}>
                            <Text style={styles.textbody}>
                                {'Healthy Tracker'}
                            </Text>
                            <Text style={styles.textbody}>
                                {'คือ แอฟพลิเคชันดูแลสุขภาพในส่วนของการควบคุมอาหารในแต่ละวัน'}
                            </Text>
                        </View>
                        <Text style={styles.textHead}>{'รายละเอียดของ แอฟพลิเคชัน'}</Text>
                        <View style={styles.containerBody}>
                            <Text style={styles.textbody}>
                                {'เนื้อหา..................................................................................' +
                                '........................................................................................' +
                                '........................................................................................' +
                                '........................................................................................'}
                            </Text>
                        </View>
                        <Text style={styles.textHead}>{'ติดต่อเรา'}</Text>
                        <View style={styles.containerBody}>
                            <Text style={styles.textbody}>{'สอบถามข้อมูลเพิ่มเติมได้ทาง'}</Text>
                            <Text style={styles.textbody}>{'E-mail: kakzadsr@gmail.com'}</Text>
                            <Text style={styles.textbody}>{'เบอร์โทรศัพท์: 088-6060-128'}</Text>
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
        );
    }
}

aboutScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'เกี่ยวกับเรา'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
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
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 20
    },
    textHead: {
        fontSize: 22,
        marginTop:10,
        marginLeft: 20
    },
    textbody :{
        fontSize: 18,
        marginLeft: 10
    }

});

export default aboutScreen;
