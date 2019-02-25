import React from 'react';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import { withNavigation } from "react-navigation";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HandleBack from "../../common/components/HandleBack";
import Trans from "../../common/containers/Trans";
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
        const { messageData } = this.props.navigation.state.params;

        return (
            <HandleBack onBack={this.onBack}>
                <Container style={styles.container}>
                    <View style={{flex: 1, width: '99%', height: '80%',}}>
                        <View  style={{alignItems: 'center'}}>
                            <CommonText text={messageData.AU_Title} style={styles.titleMessage} />
                        </View>
                        <CommonText text={Trans.tran('MessageBox.detail_Message.description')} style={styles.descriptionMessage} />
                        <View  style={styles.viewDetailMessage}>
                            <Content>
                                <CommonText text={messageData.AU_Datile} style={styles.detailMessage} />
                            </Content>
                        </View>
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
    headerTitle: <HeaderTitle text={Trans.tran('MessageBox.detail_Message.title')} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
    },
    titleMessage: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 15
    },
    descriptionMessage: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20
    },
    viewDetailMessage: {
        borderWidth: 2,
        borderColor: '#068e81',
        width: '99%',
        height: '80%',
        flex: 1,
        marginBottom: '3%',
        marginLeft: '0.5%'
    },
    detailMessage: {
        margin: 10,
        fontSize: 20,
        color: '#000'
    }
});

export default withNavigation(messageDetailScreen);
