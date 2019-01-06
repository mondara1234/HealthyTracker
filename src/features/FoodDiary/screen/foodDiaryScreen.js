import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, BackHandler, Alert, ListView } from 'react-native';
import { Container, ListItem, Left, Thumbnail, Body } from 'native-base';
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker from 'react-native-datepicker'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonTime from '../../common/components/form/CommonTime';
import HandleBack from "../../common/components/HandleBack";
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import SideMenu from '../../common/components/SideMenu';
import { Images } from "../../User/components/images";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { BMI_SCREEN } from "../../BMI/router";
import { MENUFOOD_SCREEN, FOODSEARCH_SCREEN } from "../../MenuFood/router";
import * as APIUser from "../../User/api/api";
import * as APIDeary from "../../FoodDiary/api/api";
import { AllFoodUser, getOneFoodUser } from "../../FoodDiary/redux/actions";
import { getSearchFoofUser } from ".././redux/actions";
import { SERVER_URL } from "../../../common/constants";

class foodDiaryScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            editing: true,
            date: '',
            DialogData: false,
            selected: '',
            TextInput_age: 0,
            TextInput_cm: 0,
            TextInput_gg: 0,
            dataSource: [],
        };
    }

    onBack = () => {
        if (this.state.editing) {
            Alert.alert(
                "แจ้งเตือน",
                "คุณต้องการปิด App ใช่ไหม?",
                [
                    {text: "ปิด", onPress: () => BackHandler.exitApp()},
                    {
                        text: "ยกเลิก", onPress: () => {
                        }, style: "cancel"
                    },
                ],
                {cancelable: false},
            );
            return true;
        }

        return false;

    };

     componentDidMount() {

         console.log('saver'+ this.props.FETCH_AllFoodUser());
         let data = this.props.FETCH_AllFoodUser();
         console.log(data);

        let date, day, month, year, fulldate;

        date = new Date();
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();

        if (day < 10) {
            day = '0' + day.toString();
        }
        if (month < 10) {
            month = '0' + month.toString();
        }

        fulldate = day.toString() + '-' + month.toString() + '-' + year.toString();

        this.setState({
            date: fulldate
        });

        const {user} = this.props.Users;
        const sex = user.map((data) => {return data.Sex});
         const UserName = user.map((data) => {return data.UserName});

        if (sex.toString() === '') {
            this.setState({
                DialogData: true
            });
        }
        // let modnara = this.props.ETCH_SeachFoodUser(UserName);
        //  console.log('ETCH_SeachFoodUser; '+ modnara);

         const members = this.props.FoodUser.foodUser;
         // let result = [];
         // for (let i = 0; i < members.length; i++) {
         //     if (members[i].Email === Email) {
         //         result.push(members[i]);
         //         this.props.REDUCER_ONEDATA(result);
         //     }
         // }

        const {foodUser} = this.props.FoodUser;

        console.log('members; '+ members);

    }

    selectSex = (selectedSex) => {

        if (selectedSex === 'male') {
            this.setState({
                selected: selectedSex
            })
        } else {
            this.setState({
                selected: selectedSex
            })
        }
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={{width: '100%', height: 70, backgroundColor: "#F4F4F4"}}>
                <ListItem thumbnail style={{height: 70, backgroundColor: 'transparent'}}>
                    <Left>
                        <Thumbnail
                            source={{uri: item.picture.thumbnail}}
                            style={{width: 60, height: 60, alignItems: 'center', justifyContent: 'center'}}
                        />
                    </Left>
                    <Body>
                    <View style={{
                        height: 35,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <CommonText text={item.name.first}
                                    style={{fontSize: 16, color: '#020202', marginLeft: 5, marginTop: 5}}/>
                        <IconFontAwesome
                            name="window-close-o"
                            size={30}
                            color={'#068e81'}
                            style={{marginTop: -14}}
                            onPress={() => alert('ต้องการลบรายการอาหารนี้ใช่ไหม')}
                        />
                    </View>
                    <View style={{
                        height: 35,
                        marginBottom: -2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent'
                    }}>
                        <View style={styles.containerRowList}>
                            <CommonText text={'จำนวน '} size={14}/>
                            <CommonText text={'1'} style={{fontSize: 14, color: '#068e81'}}/>
                            <CommonText text={' หน่วย'} size={14}/>
                        </View>
                        <CommonText text={item.calorie + ' แคลอรี่'}
                                    style={{fontSize: 14, color: '#068e81', marginRight: 3}}/>
                    </View>
                    </Body>
                </ListItem>
            </View>
        )
    };

    renderSeparator = () => {
        return (
            <View
                style={{height: 1, width: '100%', backgroundColor: '#068e81'}}>
            </View>
        )
    };
    //ใช้สำหรับข้อมูลเป็น Promise {_40: 0, _65: 0, _55: null, _72: null}
    async getData(itemID) {
        const response = await fetch(`${SERVER_URL}/My_SQL/user/ShowOneDataList.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: itemID
            })
        }).then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });

        this.props.REDUCER_ONEDATA(response);
    }

    async getFoodUser(UserName) {
        const response = await fetch(`${SERVER_URL}/My_SQL/foodDiary/SeachFoodUser.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: UserName
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('json'+ responseJson);
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                console.log('ds'+ ds);
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });

        this.props.REDUCER_GetFoodUser(response);
        console.log('response'+ response);
    }

    render() {
        console.log('Update Store:', this.props);
        return (
            <HandleBack onBack={this.onBack}>
                <Container style={styles.container}>
                    <View style={styles.containerClock}>
                        <IconFontAwesome
                            name="clock-o"
                            size={30}
                            color={'#068e81'}
                            style={styles.styleIconClock}
                        />
                        <CommonTime/>
                        <CommonText text={'น.'} style={styles.textDate} size={16}/>
                    </View>
                    <View style={styles.containerCalendar}>
                        <CommonText text={'วันที่'} style={styles.textDate}/>
                        <CommonText text={this.state.date} style={styles.textDate}/>
                        <DatePicker
                            style={{width: 40}}
                            date={this.state.date}
                            hideText
                            mode="date"
                            format="DD-MM-YYYY"
                            minDate="01/1/2016"
                            maxDate="31/12/2020"
                            customStyles={{
                                dateIcon: {
                                    width: 30,
                                    height: 30
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                this.setState({date: date})
                            }}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            flex: 1,
                            width: '90%',
                            borderWidth: 1,
                            marginHorizontal: 5,
                            borderColor: '#068e81'
                        }}>
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                            <IconFontAwesome
                                name="plus-circle"
                                size={50}
                                color={'#068e81'}
                                style={{
                                    marginTop: -30,
                                    marginLeft: '86%',
                                }}
                                onPress={() => this.props.navigation.navigate(FOODSEARCH_SCREEN)}
                            />
                        </View>
                    </View>
                    <View style={styles.containerKcal}>
                        <Image style={{width: 60, height: 100}}
                               source={Images.foodDiaty.kcal1}
                        />
                        <View>
                            <View style={styles.containerCalendar}>
                                <CommonText text={'พลังงานที่ได้รับในวันนี้ '} style={styles.textTitlekcal}/>
                                <CommonText text={'200'} style={styles.textSumkcal}/>
                                <CommonText text={' แคลอรี่'} style={styles.textTitlekcal}/>
                            </View>
                            <View style={styles.containerCalendar}>
                                <CommonText text={'พลังงานที่ต้องการต่อวัน '} style={styles.textTitlekcal}/>
                                <CommonText text={'1875'} style={styles.textSumkcal}/>
                                <CommonText text={' แคลอรี่'} style={styles.textTitlekcal}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerBarBMI}>
                        <View style={{
                            height: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={styles.barBMI}/>
                            <Text style={{marginRight: 10}}>{'เหลือ 1675 kcal'}</Text>
                        </View>
                    </View>
                    <View style={{
                        width: '98%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <CommonText text={'ควรเพิ่ม'}
                                    style={[styles.textUnitKcal, {marginLeft: 10, color: '#068e81'}]}/>
                        <CommonText text={'พอดี'} style={[styles.textUnitKcal, {color: '#406894'}]}/>
                        <CommonText text={'ควรลด'} style={[styles.textUnitKcal, {color: '#940c17'}]}/>
                    </View>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                        menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                    <Dialog
                        visible={this.state.DialogData}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                        onTouchOutside={() => {
                            this.setState({DialogData: true})
                        }}//ไม่ให้กดข้างนอกได้
                        backgroundStyle={styles.customBackgroundDialog}
                        dialogTitle={//ส่วนของTitle
                            <DialogTitle
                                title="กรุณากรอกข้อมูลส่วนตัวของคุณ"
                                hasTitleBar={false}
                                textStyle={styles.dialogTextTitle}
                                style={[styles.dialogTitleView, {backgroundColor: '#F4F4F4'}]}
                            />
                        }//ส่วนของฺbutton
                        actions={[
                            <DialogButton
                                text="บันทึก"
                                textStyle={styles.dialogTextButton}
                                onPress={() => {
                                    if (
                                        this.state.selected === '' ||
                                        this.state.TextInput_age === 0 ||
                                        this.state.TextInput_cm === 0 ||
                                        this.state.TextInput_gg === 0
                                        ) {
                                            Alert.alert(
                                                "แจ้งเตือน",
                                                " กรุณากรอกให้ครบ",
                                                [
                                                    {
                                                        text: "ปิด", onPress: () => {
                                                        }, style: "cancel"
                                                    }
                                                ],
                                                {cancelable: false},
                                            );
                                        } else {
                                            const {user} = this.props.Users;
                                            const id = user.map((data) => { return data.UserID });
                                            const UserID = id.toString();
                                            const Sex = this.state.selected;
                                            const Age = this.state.TextInput_age;
                                            const Weight = this.state.TextInput_cm;
                                            const Height = this.state.TextInput_gg;

                                            this.props.FETCH_UpdateUser(UserID, Sex, Age, Weight, Height);
                                            this.setState({DialogData: false});
                                            this.getData(UserID);
                                        }
                                }}
                                style={styles.dialogTitleView}
                            />
                        ]}
                    >{/*ส่วนของbody*/}
                        <View style={styles.dialogBodyView}>
                            <View style={styles.containerTextDialogBody}>
                                <CommonText text={'เพศ'} style={[styles.dialogTextBody, {marginLeft: 20}]}/>
                                <TouchableOpacity onPress={() => this.selectSex('male')}>
                                    <CommonText
                                        text={'ชาย'}
                                        style={[styles.dialogTextBody, {
                                            marginLeft: 30,
                                            color: this.state.selected === 'male' ? '#068e81' : '#000'
                                        }]}
                                    />
                                </TouchableOpacity>
                                <CommonText text={'/'} style={[styles.dialogTextBody, {marginLeft: 3}]}/>
                                <TouchableOpacity onPress={() => this.selectSex('female')}>
                                    <CommonText
                                        text={'หญิง'}
                                        style={[styles.dialogTextBody, {
                                            marginLeft: 3,
                                            color: this.state.selected === 'female' ? '#068e81' : '#000'
                                        }]}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerTextDialogBody}>
                                <CommonText text={'อายุ'} style={[styles.dialogTextBody, {marginLeft: 20}]}/>
                                <TextInput style={styles.inputBoxDialog}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholderTextColor="#068e81"
                                           keyboardType="numeric"
                                           textAlign="center"
                                           onChangeText={TextInputValue => this.setState({TextInput_age: TextInputValue})}
                                />
                                <CommonText text={'ปี'} style={styles.dialogTextBody}/>
                            </View>
                            <View style={styles.containerTextDialogBody}>
                                <CommonText text={'ส่วนสูง'} style={styles.dialogTextBody}/>
                                <TextInput style={styles.inputBoxDialog}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholderTextColor="#068e81"
                                           keyboardType="numeric"
                                           textAlign="center"
                                           onChangeText={TextInputValue => this.setState({TextInput_cm: TextInputValue})}
                                />
                                <CommonText text={'เซนติเมตร'} style={styles.dialogTextBody}/>
                            </View>
                            <View style={[styles.containerTextDialogBody, {marginBottom: 30}]}>
                                <CommonText text={'น้ำหนัก'} style={styles.dialogTextBody}/>
                                <TextInput style={styles.inputBoxDialog}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholderTextColor="#068e81"
                                           keyboardType="numeric"
                                           textAlign="center"
                                           onChangeText={TextInputValue => this.setState({TextInput_gg: TextInputValue})}
                                />
                                <CommonText text={'กิโลกรัม'} style={styles.dialogTextBody}/>
                            </View>
                        </View>
                    </Dialog>
                </Container>
            </HandleBack>
        );
    }
}

foodDiaryScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'ไดอารี่อาหาร'}/>,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />,
    headerRight: <HeaderLeftMenu icon={null} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4'
    },
    containerClock: {
        justifyContent: 'flex-end',
        marginRight: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    containerCalendar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    containerRowList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textDate: {
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81',
        marginRight: 5
    },
    styleIconClock: {
        marginRight: 10
    },
    styleIconCalendar: {
        marginLeft: 10,
        color: '#000'
    },
    containerKcal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    textTitlekcal: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    textSumkcal: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81'
    },
    textUnitKcal: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81'
    },
    Containerimage: {
        flexDirection: 'row'
    },
    dialogBodyView: {
        paddingTop: 30,
        backgroundColor: '#F4F4F4',
        paddingLeft: '12%'
    },
    dialogTitleView: {
        backgroundColor: '#068e81',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBoxDialog: {
        width: 100,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        fontSize: 16,
        color: '#068e81',
        marginVertical: 5,
        marginHorizontal: 10
    },
    dialogTextBody: {
        color: '#000',
        fontSize: 16
    },
    dialogTextButton: {
        color: '#fff',
        fontSize: 18
    },
    dialogTextTitle: {
        color: '#000',
        fontSize: 20
    },
    containerTextDialogBody: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerBarBMI: {
        width: '94%' ,
        height: 20,
        justifyContent: 'center',
        borderWidth: 2,
        marginHorizontal: 10
    },
    barBMI: {
        height: 16,
        width: '12%',
        backgroundColor: '#068e81'
    },
});

function mapStateToProps(state) {
    return{
        Users: state.dataUser,
        FoodUser: state.dataDiary
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_UpdateUser: bindActionCreators(APIUser.fetchUpdateUser, dispatch),
        FETCH_SeachFoodUser: bindActionCreators(APIDeary.fetchSearchFoodUser, dispatch),
        FETCH_AllFoodUser: bindActionCreators(APIDeary.fetchAllFoodUser, dispatch),
        REDUCER_ALLDATA: bindActionCreators(AllFoodUser, dispatch),
        REDUCER_ONEDATA: bindActionCreators(getOneFoodUser, dispatch),
        REDUCER_GetFoodUser: bindActionCreators(getSearchFoofUser, dispatch)
    })
)(foodDiaryScreen);
