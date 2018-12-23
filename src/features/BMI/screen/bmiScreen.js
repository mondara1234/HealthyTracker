import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, BackHandler, Alert } from 'react-native';
import { Container, Content, Accordion } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HandleBack from "../../common/components/HandleBack";
import { Images } from "../../User/components/images";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../router";
import { TRICK_SCREEN } from "../../Trick/router";


class bmiScreen extends React.PureComponent {
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

    _renderHeader(dataArray, expanded) {
        return (
            <View style={styles.containerHead}>
                <View style={styles.containerBodyHead}>
                    <CommonText text={dataArray.title} />
                    <View style={styles.containerUnitHead}>
                        <CommonText text={dataArray.kcal} />
                        <CommonText text={dataArray.Unit} style={{ marginLeft: 3 }} />
                    </View>
                </View>
                {expanded
                    ?
                    <CommonText text={'ปิดรายละเอียด'} style={styles.showBody}/>
                    :
                    <CommonText text={'เปิดรายละเอียด'} style={styles.showBody}/>
                }
            </View>
        );
    }

    _renderContent(dataArray) {
        return (
            <CommonText text={dataArray.content} style={styles.containerContent} />
        );
    }

    render() {
        const dataArray = [
            { title: "น้ำหนักที่เหมาะสม", content: "เนื้อหา น้ำหนักที่เหมาะสม " , kcal: '72-76', Unit: 'กก'},
            { title: "ปริมาณน้ำที่แนะนำ", content: "เนื้อหา ปริมาณน้ำที่แนะนำ ", kcal: 1.99, Unit: 'ลิตร' },
            { title: "การบริโภคที่แนะนำ", content: "เนื้อหา การบริโภคที่แนะนำ ", kcal: 2428, Unit: 'แคลอรี่' },
        ];
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content>
                        <View style={styles.container}>
                            <View style={styles.containerBMI}>
                                <View>
                                    <View style={styles.containerBodyBMI}>
                                        <CommonText text={'BMI :'} style={styles.textHead} />
                                        <CommonText text={'21.36'} style={styles.valueHead} />
                                    </View>
                                    <View style={styles.containerBodyBMI}>
                                        <CommonText text={'เกณฑ์ :'} style={[styles.textHead,{marginLeft: -13}]} />
                                        <CommonText text={'ปกติ'} style={styles.valueHead} />
                                    </View>
                                </View>
                                <View style={styles.containerBodyBMI}>
                                    <Image  style={{width: 60, height: 100}}
                                            source={Images.foodDiaty.kcal1}
                                    />
                                </View>
                            </View>
                            <View style={styles.containerBarBMI }>
                                <View style={styles.barBMI} />
                            </View>
                            <View style={styles.containerClock}>
                                <CommonText text={'ควรเพิ่ม'} style={[styles.textUnitKcal, { color: '#068e81'}]} />
                                <CommonText text={'พอดี'} style={[styles.textUnitKcal, { color: '#406894'}]} />
                                <CommonText text={'ควรลด'} style={[styles.textUnitKcal, { color: '#940c17'}]} />
                            </View>
                            <View
                                style = {styles.separator}>
                            </View>
                            <View padder>
                                <Accordion
                                    dataArray={dataArray}
                                    renderHeader={this._renderHeader}
                                    renderContent={this._renderContent}
                                    headerStyle={{ backgroundColor: "#b7daf8" }}
                                    contentStyle={{ backgroundColor: "#ddecf8" }}
                                />
                            </View>
                        </View>
                    </Content>
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

bmiScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'BMI'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: 20,
        alignItems: 'center'
    },
    containerHead: {
        width: '96%',
        margin: 10,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#e3f1f1",
        borderWidth: 1,
        borderColor: '#068e81'
    },
    containerBodyHead: {
        width: '96%',
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    containerUnitHead: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    showBody: {
        color: '#068e81',
        marginBottom: 3
    },
    containerContent: {
        backgroundColor: "#e3f1f1",
        padding: 10
    },
    containerBody: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    containerBMI:{
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    containerBodyBMI: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 20
    },
    textHead: {
        fontSize: 22,
        marginTop: 10,
        marginLeft: 20
    },
    valueHead:{
        fontSize: 22,
        marginTop: 10,
        marginLeft: 60,
        color: '#068e81'
    },
    textbody :{
        fontSize: 18,
        marginLeft: 10
    },
    containerClock: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 2
    },
    textUnitKcal: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81',
        paddingHorizontal: 10
    },
    containerBarBMI: {
        width: '98%' ,
        height: 30,
        justifyContent: 'center',
        borderWidth: 2,
        marginHorizontal: 10
    },
    barBMI: {
        height: 26,
        width: '50%',
        backgroundColor: '#406894'
    },
    separator: {
        height: 1 ,
        width: '100%',
        backgroundColor: '#068e81'
    }

});

export default bmiScreen;
