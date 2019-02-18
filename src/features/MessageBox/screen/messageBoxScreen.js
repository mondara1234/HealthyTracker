import React, { Component } from 'react';
import { Alert, BackHandler, ListView, StyleSheet, View } from 'react-native';
import { Container, Content, Button, Icon, List, ListItem, Header } from 'native-base';
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { bindActionCreators } from "redux";
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import Trans from "../../common/containers/Trans";
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
import { AllMessageBox } from "../../MessageBox/redux/actions";
import * as APIMessage from "../../MessageBox/api/api";

class messageBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listViewData: [],
            editing: true,
            DialogHelp: false
        };
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
            Trans.tran('general.alert'),
            Trans.tran('MessageBox.alert.delete_Message'),
            [
                {
                    text: Trans.tran('general.yes'),
                    onPress: () =>
                    {
                        let UserNames = `${data.AU_UserName}`;
                        let ID = `${data.AU_ID}`;

                        this.props.FETCH_DeleteMessageUse(ID);
                        this.getFoodUser(UserNames);
                    }
                },
                { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" },
            ],
            { cancelable: false }
        );
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });// ประกาศตัวแปร รับรูปแบบแหล่งข้อมูล
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Header style={styles.bgColorApp}>
                        <HeaderLeftMenu onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                        <HeaderTitle text={Trans.tran('MessageBox.title')} />
                        <View style={styles.viewRowCenter}>
                            <HeaderLeftMenu
                                icon={'question-circle'}
                                size={30}
                                onPress={() => this.setState({DialogHelp: !this.state.DialogHelp })}
                            />
                        </View>
                    </Header>
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
                                <CommonText text={Trans.tran('MessageBox.no_message')} size={30}/>
                            </View>

                        }
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate( FOODDIARY_SCREEN )}
                        menuFoodScreen={() => this.props.navigation.navigate( MENUFOOD_SCREEN )}
                        bmiScreen={() => this.props.navigation.navigate( BMI_SCREEN )}
                        trickScreen={() => this.props.navigation.navigate( TRICK_SCREEN )}
                    />
                </Container>
                <Dialog //Dialogตอนกรอกข้อมูลเส้ดสิ้น
                    visible={this.state.DialogHelp}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                    onTouchOutside={() => {this.setState({ DialogHelp: true })}}//ไม่ให้กดข้างนอกได้
                    dialogTitle={//ส่วนของTitle
                        <DialogTitle
                            title={"ช่วยเหลือ"}
                            hasTitleBar={false}
                            textStyle={styles.dialogTextTitle}
                            style={styles.dialogTitleView}
                        />
                    }
                    actions={[//ส่วนของฺbutton
                        <DialogButton
                            text={Trans.tran('general.close')}
                            textStyle={styles.dialogTextButton}
                            onPress={() => {
                                this.setState({ DialogHelp: false });
                            }}
                            style={styles.dialogTitleView}
                        />
                    ]}
                >{/*ส่วนของbody*/}
                    <View style={styles.dialogBodyView}>
                        <CommonText text={'กดที่ข้อความ --> เพื่อดูรายละเอียด'} style={styles.dialogTextBody} />
                        <CommonText text={'เลื่อนไปทางซ้าย --> เพื่อลบข้อความ'} style={styles.dialogTextBody} />
                    </View>
                </Dialog>
            </HandleBack>
        );
    }
}

messageBoxScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    bgColorApp: {
        backgroundColor: '#068e81'
    },
    viewRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogBodyView: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    dialogTitleView: {
        backgroundColor: '#068e81',
        height: 40,
        justifyContent: 'center',
    },
    dialogTextBody: {
        color: '#000',
        fontSize: 18
    },
    dialogTextButton: {
        color: '#fff',
        fontSize: 18
    },
    dialogTextTitle: {
        color: '#fff',
        fontSize: 20
    },

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
