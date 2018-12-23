import React from 'react';
import { Alert, BackHandler } from "react-native";
import { Container, Tab, TabHeading, Tabs, View } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import AllTab from './Tab/AllTab';
import NewTab from './Tab/NewTab';
import RankTab from './Tab/RankTab';
import { TRICK_SCREEN } from "../router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { BMI_SCREEN } from "../../BMI/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";

class TrickScreen extends React.PureComponent {
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
                <Container withBackground>
                    <View style={{flex :1}}>
                        <Tabs locked>
                            <Tab heading={
                                <TabHeading style={{ backgroundColor: "#068e81" }}>
                                    <CommonText text={'ทั้งหมด'} style={{ color: "#fff" }} />
                                </TabHeading>}
                            >
                                <AllTab />
                            </Tab>
                            <Tab heading={
                                <TabHeading style={{ backgroundColor: "#068e81" }}>
                                    <CommonText text={'ใหม่'} style={{ color: "#fff" }} />
                                </TabHeading>}
                            >
                                <NewTab />
                            </Tab>
                            <Tab heading={
                                <TabHeading style={{ backgroundColor: "#068e81" }}>
                                    <CommonText text={'ติดอันดับ'} style={{ color: "#fff" }} />
                                </TabHeading>}
                            >
                                <RankTab />
                            </Tab>
                        </Tabs>
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

TrickScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'เคล็ดลับ'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />,
    headerStyle: {
        backgroundColor: '#068e81',
        elevation: 0
    },
});

export default TrickScreen;
{/*
<RankTrick  itemImage={Images.TrickScreen.Rank}
            nameImg={'1'}
/>*/}
