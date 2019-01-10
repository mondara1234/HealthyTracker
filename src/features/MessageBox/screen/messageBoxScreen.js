import React, { Component } from 'react';
import { Alert, BackHandler, ListView, View } from 'react-native';
import { Container, Content, Button, Icon, List, ListItem } from 'native-base';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { MESSAGEDETAIL_SCREEN } from "../../MessageBox/router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { BMI_SCREEN } from "../../BMI/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";

const datas = [
    { title: 'ยินดีต้อนรับสู Healthy Tracker', detail: 'เนื้อหาต่างๆ', name: "Snoopy", status: true },
    { title: 'ต้องการลดน้ำหนัก 5โล ใน 1อาทิตย์', detail: 'เนื้อหาต่างๆ', name: "Oliver", status: false },
    { title: 'การคาดเดารูปร่างคุณ จากอาหารที่คุณกิน', detail: 'เนื้อหาต่างๆ', name: "Oliver", status: false }

];

class messageBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: true,
            listViewData: datas,
            editing: true,
            status: false
        };
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

    messageDetail = (data) => {
        if(data.status === false){
            this.setState({
                status: !this.state.status
            });
        }
        this.props.navigation.navigate(
            {routeName: MESSAGEDETAIL_SCREEN, params: {messageData: data}}
        )
    };

    deleteRow(data, secId, rowId, rowMap) {
        console.warn('data: '+ data.name);// กลุ่มข้อมูล แต่จะแสดงตามหลัง.
        console.warn('secId: '+ secId);//แสดงค่า แต่เป้น s1
        console.warn('rowId: '+ rowId);//เป้นกลุ่ม object แต่ไม่แสดงค่า
        console.warn('rowMap: '+ rowMap);//เป้นกลุ่ม object แต่ไม่แสดงค่า
        rowMap[`${secId}${rowId}`].props.closeRow();//รับค่า ไว้ใน object เพื่อลบ ตามค่าใน object

        const newData = [...this.state.listViewData]; //ประกาศตัวแปร เพื่อรับค่า state
        Alert.alert(
            "แจ้งเตือน",
            "คุณต้องการลบข้อความนี้ ใช่ไหม?",
            [
                {
                    text: "ลบ",
                    onPress: () =>
                    {
                        newData.splice(rowId, 1);// ลบ ค่าในตัวแปร ตาม rowID ลบ 1
                        this.setState({ listViewData: newData }); // set ค่า state ใหม่
                    }
                },
                { text: "ยกเลิก", onPress: () => {}, style: "cancel" },
            ],
            { cancelable: false }
        );
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });// ประกาศตัวแปร รับรูปแบบแหล่งข้อมูล
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                        {this.state.listViewData ?
                            <Content>
                                <List
                                    rightOpenValue={-55}
                                    dataSource={ds.cloneWithRows(this.state.listViewData)} //ใส่ค่าข้อมูลไปในตัวแปรรับเพื่อนใส่ข้อมูล ไปยังแหล่งข้อมูล
                                    renderRow={data =>

                                        <ListItem
                                            style={{backgroundColor: this.state.status === false ? '#bfbfbf' : '#fff'}}
                                            onPress={() => this.messageDetail(data)}>
                                            <CommonText text={data.title} style={{marginLeft: 10}}/>
                                        </ListItem>

                                    }
                                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full danger onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}>
                                            <Icon active name="trash"/>
                                        </Button>}
                                />
                            </Content>
                            :
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <CommonText text={'ไม่มีข้อความ'} size={30}/>
                            </View>

                        }
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

messageBoxScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'กล่องข้อมความ'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={'question-circle'} size={30} onPress={() => Alert.alert('กดที่ข้อความ เพื่อทำการดูรายละเอียด'+'\n'+'กดค้างที่ข้อความแล้วเลื่อนไปทางซ้าย เพื่อทำการลบข้อความ')} />
});

export default messageBoxScreen;
