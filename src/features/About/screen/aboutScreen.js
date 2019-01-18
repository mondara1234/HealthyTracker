import React from 'react';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';
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
                                <CommonText text={Trans.tran('About.about')} />
                                <CommonText text={'คือ แอฟพลิเคชันดูแลสุขภาพในส่วนของการควบคุมอาหารในแต่ละวัน'} />
                            </View>
                            <CommonText style={styles.textHead} text={Trans.tran('About.details_Application')} />
                            <View style={styles.containerBody}>
                                <CommonText text={'เนื้อหา..................................................................................' +
                                '........................................................................................' +
                                '........................................................................................' +
                                '........................................................................................'}
                                />
                            </View>
                            <CommonText style={styles.textHead} text={Trans.tran('About.contact')} />
                            <View style={styles.containerBody}>
                                <CommonText text={Trans.tran('About.information_Please')} />
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
