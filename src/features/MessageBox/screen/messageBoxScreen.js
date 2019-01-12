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
import moment from "moment/moment";
import {bindActionCreators} from "redux";
import {AllMessageBox} from "../../MessageBox/redux/actions";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";
import * as APIMessage from "../../MessageBox/api/api";

class messageBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listViewData: [],
            editing: true,
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

    componentDidMount() {

        const {user} = this.props.Users;
        const UserName = user.map((data) => {return data.UserName});
        this.getFoodUser(UserName)

    }

    async getFoodUser(UserName) {
        let UserNames =`${UserName}`;
        const response = await this.props.FETCH_SearchUser(UserNames);
        this.props.REDUCER_ONEDATA(response);
        const members = this.props.MessageBox.messageBox;
        this.setState({
            listViewData : members
        });

    }

    messageDetail = (data) => {
        let UserNames = `${data.AU_UserName}`;
        let Title = `${data.AU_Title}`;

        if(data.AU_Status === 'false'){
           let status = 'true';
           this.props.FETCH_UpdateMessage(UserNames, Title, status);
           this.getFoodUser(UserNames);
        }

        this.props.navigation.navigate(
            {routeName: MESSAGEDETAIL_SCREEN, params: {messageData: data}}
        )
    };

    deleteRow(data) {
        Alert.alert(
            "แจ้งเตือน",
            "คุณต้องการลบข้อความนี้ ใช่ไหม?",
            [
                {
                    text: "ลบ",
                    onPress: () =>
                    {
                        let UserNames = `${data.AU_UserName}`;
                        let ID = `${data.AU_ID}`;

                        this.props.FETCH_DeleteMessageUse(ID);
                        this.getFoodUser(UserNames);

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
                                            style={{backgroundColor: data.AU_Status === 'false' ? '#bfbfbf' : '#fff'}}
                                            onPress={() => this.messageDetail(data)}>
                                            <CommonText text={data.AU_Title} style={{marginLeft: 10}}/>
                                        </ListItem>

                                    }
                                    renderRightHiddenRow={(data) =>
                                        <Button full danger onPress={_ => this.deleteRow(data)}>
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
    headerRight: <HeaderLeftMenu
        icon={'question-circle'}
        size={30}
        onPress={() =>
            Alert.alert(
                'กดที่ข้อความ -> เพื่อทำการดูรายละเอียด'+ '\n'+
                'เลื่อนไปทางซ้าย -> เพื่อทำการลบข้อความ'
            )}
    />
});

function mapStateToProps(state) {
    return{
        Users: state.dataUser,
        MessageBox: state.dataMessageBox
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_SearchUser: bindActionCreators(APIMessage.fetchSeachMessageUser, dispatch),
        FETCH_UpdateMessage: bindActionCreators(APIMessage.fetchUpdateMessageUser, dispatch),
        FETCH_DeleteMessageUse: bindActionCreators(APIMessage.fetchDeleteMessageUse, dispatch),
        REDUCER_ONEDATA: bindActionCreators(AllMessageBox, dispatch),
    })
)(messageBoxScreen);
