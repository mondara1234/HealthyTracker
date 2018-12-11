import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import { Container,Text, Content, Accordion } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Images } from "../../User/components/images";
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../router";
import {TRICK_SCREEN} from "../../Trick/router";


class bmiScreen extends React.PureComponent {

    _renderHeader(dataArray, expanded) {
        return (
            <View style={{ width: '96%', margin: 10, justifyContent: 'center', alignItems: "center", backgroundColor: "#e3f1f1", borderWidth: 1, borderColor: '#068e81' }}>
                <View
                    style={{ width: '96%', flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center"}}
                >
                    <Text style={{ fontWeight: "600" }}>
                        {dataArray.title}
                    </Text>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                        <Text style={{ fontWeight: "400" }}>
                            {dataArray.kcal}
                        </Text>
                        <Text style={{ fontWeight: "600", marginLeft: 3 }}>
                            {dataArray.Unit}
                        </Text>
                    </View>
                </View>
                {expanded
                    ? <Text style={{ fontWeight: "600", color: '#068e81', marginBottom: 3}}>
                        {'ปิดรายละเอียด'}
                    </Text>
                    : <Text style={{ fontWeight: "600", color: '#068e81', marginBottom: 3}}>
                        {'เปิดรายละเอียด'}
                    </Text>}
            </View>
        );
    }

    _renderContent(dataArray) {
        return (
            <Text
                style={{ backgroundColor: "#e3f1f1", padding: 10 }}
            >
                {dataArray.content}
            </Text>
        );
    }

    render() {
        const dataArray = [
            { title: "น้ำหนักที่เหมาะสม", content: "เนื้อหา น้ำหนักที่เหมาะสม " , kcal: '72-76', Unit: 'กก'},
            { title: "ปริมาณน้ำที่แนะนำ", content: "เนื้อหา ปริมาณน้ำที่แนะนำ ", kcal: 1.99, Unit: 'ลิตร' },
            { title: "การบริโภคที่แนะนำ", content: "เนื้อหา การบริโภคที่แนะนำ ", kcal: 2428, Unit: 'แคลอรี่' },
        ];
        return (
            <Container>
                <View style={styles.container}>
                    <View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={styles.textHead}>{'BMI :'}</Text>
                                <Text style={[styles.textHead,{marginLeft: 60, color: '#068e81'}]}>{'21.36'}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.textHead}>{'เกณฑ์ :'}</Text>
                                <Text style={[styles.textHead,{marginLeft: 40, color: '#068e81'}]}>{'ปกติ'}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Image  style={{width: 60, height: 100}}
                                    source={Images.foodDiaty.kcal1}
                            />
                        </View>
                    </View>
                    <View style={styles.containerBarBMI }>
                        <View style={styles.barBMI} />
                    </View>
                    <View style={styles.containerClock}>
                        <Text style={[styles.textUnitKcal, { color: '#068e81'}]}> {'ควรเพิ่ม'} </Text>
                        <Text style={[styles.textUnitKcal, { color: '#406894'}]}> {'พอดี'} </Text>
                        <Text style={[styles.textUnitKcal, { color: '#940c17'}]}> {'ควรลด'} </Text>
                    </View>
                    <View
                        style = {{height: 1 , width: '100%', backgroundColor: '#068e81'}}>
                    </View>
                    <Content padder>
                        <Accordion
                            dataArray={dataArray}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            headerStyle={{ backgroundColor: "#b7daf8" }}
                            contentStyle={{ backgroundColor: "#ddecf8" }}
                        />
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

bmiScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'BMI'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: 20,
        alignItems: 'center'
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
        color: '#068e81'
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

});

export default bmiScreen;
