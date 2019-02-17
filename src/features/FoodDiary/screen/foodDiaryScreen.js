import React from 'react';
import { StyleSheet, View, TextInput, Image, FlatList, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Container, ListItem, Left, Thumbnail, Body } from 'native-base';
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker from 'react-native-datepicker'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonTime from '../../common/components/form/CommonTime';
import HandleBack from "../../common/components/HandleBack";
import moment from "moment/moment";
import Trans from "../../common/containers/Trans";
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import SideMenu from '../../common/components/SideMenu';
import { Images } from "../../User/components/images";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { BMI_SCREEN } from "../../BMI/router";
import { MENUFOOD_SCREEN, FOODSEARCH_SCREEN } from "../../MenuFood/router";
import { METABOLIC_SCREEN } from "../router";
import * as APIUser from "../../User/api/api";
import * as APIDiary from "../../FoodDiary/api/api";
import { getSearchFoodUser } from "../../FoodDiary/redux/actions";
import { getOneUser } from "../../User/redux/actions";

class foodDiaryScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            editing: true,
            date: '',
            selected: '',
            TextInput_age: 0,
            TextInput_cm: 0,
            TextInput_gg: 0,
            dataSource: [],
            sumCalorie: 0,
            statusBar: 0,
            DialogData: false,
            DialogCalorie: false
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

        let date = new Date();
        let dateFormat = moment(date).format("YYYY-MM-DD");
        this.setState({
            date: dateFormat
        });

        const {user} = this.props.Users;
        const sex = user.map((data) => {return data.Sex});
        const UserName = user.map((data) => {return data.UserName});
        const BMRUser = user.map((data) => {return data.BMRUser});

        if (sex.toString() === '') {
            this.setState({
                DialogData: true
            });
        }

        this.getFoodUser(UserName,dateFormat);
        this.getSumCalorieFoodUser(BMRUser,UserName,dateFormat);
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
            <View style={styles.viewListItem}>
                <ListItem thumbnail style={styles.ListContainer}>
                    <Left>
                        <Thumbnail
                            source={{uri: item.FoodIMG}}
                            style={styles.imgList}
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
                        <CommonText text={item.FoodName}
                                    style={styles.textFoodName}
                        />
                        <IconFontAwesome
                            name="window-close-o"
                            size={30}
                            color={'#068e81'}
                            style={{marginTop: -14}}
                            onPress={() => this.DeleteFoodName(item)}
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
                            <CommonText text={Trans.tran('FoodDiary.number')} size={14}/>
                            <CommonText text={` ${item.FoodNumber}`} style={{fontSize: 14, color: '#068e81'}}/>
                            <CommonText text={` ${item.FoodUnit}`} size={14}/>
                        </View>
                        <CommonText text={`${item.FoodCalorie} ${Trans.tran('FoodDiary.calorie')}`}
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
                style={styles.separator}>
            </View>
        )
    };

    DeleteFoodName(item){
        let UserName = item.UserName;
        let FoodName = item.FoodName;
        let dateFormat = item.DiaryDate;
        let BMRUser = item.BMRUser;

        Alert.alert(
            Trans.tran('general.alert'),
            `${Trans.tran('FoodDiary.want_Delete')} ${item.FoodName} ${Trans.tran('FoodDiary.right')}`,
            [
                { text: Trans.tran('general.yes'), onPress: () => this.DeleteFoodNames(UserName,FoodName,dateFormat,BMRUser)},
                { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" }
            ],
            { cancelable: false },
        );
    }

    async DeleteFoodNames(UserName,FoodName,dateFormat,BMRUser){
        const response = await  this.props.FETCH_DeleteFoodName(UserName,FoodName,dateFormat);
        this.getFoodUser(UserName,dateFormat);
        this.getSumCalorieFoodUser(BMRUser,UserName,dateFormat);
    }

    //ใช้สำหรับข้อมูลเป็น Promise {_40: 0, _65: 0, _55: null, _72: null}
    async getData(UserName) {
        let UserNames =`${UserName}`;
        const response = await this.props.FETCH_SearchUser(UserNames);
        this.props.REDUCER_ONEDATA(response);
    }

    async getFoodUser(UserName,dateFormat) {
        let dateNow = this.state.date ? `${this.state.date}` : `${dateFormat}`;
        let UserNames =`${UserName}`;
        const response = await this.props.FETCH_SearchFoodUser(UserNames, dateNow);
        this.props.REDUCER_SearchFoodUser(response);
        const members = this.props.FoodUser.foodUser;
        this.setState({
            dataSource : members
        });
    }

    async getSumCalorieFoodUser(BMRUser,UserName,dateFormat) {
        let dateNow = this.state.date ? `${this.state.date}` : `${dateFormat}`;
        let UserNames =`${UserName}`;
        let BMRUsers =`${BMRUser}`;
        const response = await this.props.FETCH_SumCalorieFoodUser(UserNames, dateNow);
        let sumstatusBar = (response/(BMRUsers*2))*100;
        let sumcalorie = parseInt(sumstatusBar);
        this.setState({
            sumCalorie : response,
            statusBar: sumcalorie
        });
    }

    render() {
        const {user} = this.props.Users;
        const UserName = user.map((data) => {return data.UserName});
        const BMRUser = user.map((data) => {return data.BMRUser});

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
                        <CommonText text={Trans.tran('FoodDiary.clock')} style={styles.textDate} size={16}/>
                    </View>
                    <View style={styles.containerCalendar}>
                        <CommonText text={Trans.tran('FoodDiary.date')} style={styles.textDate}/>
                        <CommonText text={this.state.date} style={styles.textDate}/>
                        <DatePicker
                            style={{width: 40}}
                            date={this.state.date}
                            hideText
                            mode="date"
                            format="YYYY-MM-DD"
                            minDate="01/1/2019"
                            maxDate="31/12/2020"
                            customStyles={{
                                dateIcon: {
                                    width: 30,
                                    height: 30
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(fulldate) => {
                                this.setState({date: fulldate});
                                this.getFoodUser(UserName,fulldate);
                                this.getSumCalorieFoodUser(BMRUser,UserName,fulldate);
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
                        <Image style={{width: 100, height: 100}}
                               source={Images.foodDiaty.kcal1}
                        />
                        <View>
                            <View style={styles.containerCalendar}>
                                <CommonText text={Trans.tran('FoodDiary.energy_today')} style={styles.textTitlekcal} />
                                <CommonText text={this.state.sumCalorie} style={[styles.textSumkcal,{marginHorizontal: 10}]} />
                                <CommonText text={Trans.tran('FoodDiary.calorie')} style={styles.textTitlekcal}/>
                            </View>
                            <View style={styles.containerCalendar}>
                                <CommonText text={Trans.tran('FoodDiary.energy_per_day')} style={styles.textTitlekcal} />
                                <CommonText text={`${BMRUser}`} style={[styles.textSumkcal,{marginHorizontal: 10}]} />
                                <CommonText text={Trans.tran('FoodDiary.calorie')} style={styles.textTitlekcal} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerBarBMI}>
                        <View style={styles.viewBarBMI}>
                            <View
                                style={[
                                    styles.barBMI,
                                    {
                                        width: `${this.state.statusBar}%`,
                                        backgroundColor:
                                            this.state.statusBar < 45 ?
                                                '#068e81'
                                                :
                                                this.state.statusBar > 55 ?
                                                    '#940c17'
                                                    :
                                                    '#406894'
                                    }
                                    ]}
                            />
                            {this.state.statusBar > 100 ?
                                <CommonText
                                    text={`${Trans.tran('FoodDiary.over')} ${this.state.sumCalorie - BMRUser} ${Trans.tran('FoodDiary.calorie')}`}
                                    style={{marginLeft: '-93%'}}
                                    size={14}
                                    color={'#fff'}
                                />
                                :
                                this.state.statusBar > 50 ?
                                <CommonText
                                    text={`${Trans.tran('FoodDiary.over')} ${this.state.sumCalorie - BMRUser} ${Trans.tran('FoodDiary.calorie')}`}
                                    style={{marginLeft: '-18%'}}
                                    size={14}
                                />
                                    :
                                        <CommonText
                                            text={`${Trans.tran('FoodDiary.surplus')} ${BMRUser - this.state.sumCalorie} ${Trans.tran('FoodDiary.calorie')}่`}
                                            style={{marginRight: '2%'}}
                                            size={14}
                                        />
                            }
                        </View>
                    </View>
                    {this.state.statusBar > 50 ?
                        this.setState({DialogCalorie : true})
                        :this.setState({DialogCalorie : false})
                    }
                    <View style={styles.containerBody}>
                        <CommonText text={Trans.tran('FoodDiary.should_Add')}
                                    style={[styles.textUnitKcal, {marginLeft: 10, color: '#068e81'}]}/>
                        <CommonText text={Trans.tran('FoodDiary.fit')} style={[styles.textUnitKcal, {color: '#406894'}]}/>
                        <CommonText text={Trans.tran('FoodDiary.should_Reduce')} style={[styles.textUnitKcal, {color: '#940c17'}]}/>
                    </View>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                        menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                    {/*ไดอาร็อดการกรอกข้อมูลBMI*/}
                    <Dialog
                        visible={this.state.DialogData}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                        onTouchOutside={() => {
                            this.setState({DialogData: true})
                        }}//ไม่ให้กดข้างนอกได้
                        backgroundStyle={styles.customBackgroundDialog}
                        dialogTitle={//ส่วนของTitle
                            <DialogTitle
                                title={Trans.tran('FoodDiary.Dialog.please_Information')}
                                hasTitleBar={false}
                                textStyle={styles.dialogTextTitle}
                                style={[styles.dialogTitleView, {backgroundColor: '#F4F4F4'}]}
                            />
                        }//ส่วนของฺbutton
                        actions={[
                            <DialogButton
                                text={Trans.tran('Setting.save')}
                                textStyle={styles.dialogTextButton}
                                onPress={() => {
                                    if (
                                        this.state.selected === '' ||
                                        this.state.TextInput_age === 0 ||
                                        this.state.TextInput_cm === 0 ||
                                        this.state.TextInput_gg === 0
                                        ) {
                                            Alert.alert(
                                                Trans.tran('general.alert'),
                                                Trans.tran('general.please_Complete'),
                                                [
                                                    {
                                                        text: Trans.tran('general.close'), onPress: () => {
                                                        }, style: "cancel"
                                                    }
                                                ],
                                                {cancelable: false},
                                            );
                                        } else {
                                            const {user} = this.props.Users;
                                            let id = user.map((data) => { return data.UserID });
                                            let UserName = user.map((data) => { return data.UserName });
                                            let UserID = id.toString();
                                            let Sex = this.state.selected;
                                            let Age = this.state.TextInput_age;
                                            let Height = this.state.TextInput_cm;
                                            let Weight = this.state.TextInput_gg;
                                            let BMRUser = 0;

                                            if(Sex === 'male'){
                                                let BMR_male = 66 + (13.7 * Weight)+(5 * Height) - (6.8 * Age);
                                                BMRUser = BMR_male.toFixed();
                                            }else if(Sex === 'female') {
                                                let BMR_female = 665 + (9.6 * Weight) + (1.8 * Height) - (4.7 * Age);
                                                BMRUser = BMR_female.toFixed();
                                            }

                                            this.props.FETCH_UpdateUser(UserID, Sex, Age, Weight, Height, BMRUser);

                                            this.setState({DialogData: false});
                                            this.getData(UserName);
                                        }
                                }}
                                style={styles.dialogTitleView}
                            />
                        ]}
                    >{/*ส่วนของbody*/}
                        <View style={styles.dialogBodyView}>
                            <View style={styles.containerTextDialogBody}>
                                <CommonText text={Trans.tran('FoodDiary.Dialog.sex')} style={[styles.dialogTextBody, {marginLeft: 20}]}/>
                                <TouchableOpacity onPress={() => this.selectSex('male')}>
                                    <CommonText
                                        text={Trans.tran('FoodDiary.Dialog.male')}
                                        style={[styles.dialogTextBody, {
                                            marginLeft: 30,
                                            color: this.state.selected === 'male' ? '#068e81' : '#000'
                                        }]}
                                    />
                                </TouchableOpacity>
                                <CommonText text={'/'} style={[styles.dialogTextBody, {marginLeft: 3}]}/>
                                <TouchableOpacity onPress={() => this.selectSex('female')}>
                                    <CommonText
                                        text={Trans.tran('FoodDiary.Dialog.female')}
                                        style={[styles.dialogTextBody, {
                                            marginLeft: 3,
                                            color: this.state.selected === 'female' ? '#068e81' : '#000'
                                        }]}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerTextDialogBody}>
                                <CommonText text={Trans.tran('FoodDiary.Dialog.Age')} style={[styles.dialogTextBody, {marginLeft: 20}]}/>
                                <TextInput style={styles.inputBoxDialog}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholderTextColor="#068e81"
                                           keyboardType="numeric"
                                           textAlign="center"
                                           onChangeText={TextInputValue => this.setState({TextInput_age: TextInputValue})}
                                />
                                <CommonText text={Trans.tran('FoodDiary.Dialog.year')} style={styles.dialogTextBody}/>
                            </View>
                            <View style={styles.containerTextDialogBody}>
                                <CommonText text={Trans.tran('FoodDiary.Dialog.height')} style={styles.dialogTextBody}/>
                                <TextInput style={styles.inputBoxDialog}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholderTextColor="#068e81"
                                           keyboardType="numeric"
                                           textAlign="center"
                                           onChangeText={TextInputValue => this.setState({TextInput_cm: TextInputValue})}
                                />
                                <CommonText text={Trans.tran('FoodDiary.Dialog.cm')} style={styles.dialogTextBody}/>
                            </View>
                            <View style={[styles.containerTextDialogBody, {marginBottom: 30}]}>
                                <CommonText text={Trans.tran('FoodDiary.Dialog.weight')} style={styles.dialogTextBody}/>
                                <TextInput style={styles.inputBoxDialog}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           placeholderTextColor="#068e81"
                                           keyboardType="numeric"
                                           textAlign="center"
                                           onChangeText={TextInputValue => this.setState({TextInput_gg: TextInputValue})}
                                />
                                <CommonText text={Trans.tran('FoodDiary.Dialog.kg')} style={styles.dialogTextBody}/>
                            </View>
                        </View>
                    </Dialog>

                    {/*ไดอาร็อดการแจ้งเตือนเมื่อแคลอรี่เกินจากที่ต้องการ*/}
                    <Dialog
                        visible={this.state.DialogCalorie}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                        onTouchOutside={() => {
                            this.setState({DialogCalorie: true})
                        }}//ไม่ให้กดข้างนอกได้
                        backgroundStyle={styles.customBackgroundDialog}
                        dialogTitle={//ส่วนของTitle
                            <DialogTitle
                                title={'แจ้งเตือนแคลอรี่เกินจากที่ต้องได้รับ'}
                                hasTitleBar={false}
                                textStyle={[styles.dialogTextTitle,{color: '#fff'}]}
                                style={[styles.dialogTitleView, {backgroundColor: '#068e81'}]}
                            />
                        }//ส่วนของฺbutton
                        actions={[
                            <DialogButton
                                text={'ดูวิธีการเผาพลาญพลังงาน'}
                                textStyle={styles.dialogTextButton}
                                onPress={() => {
                                    this.setState({DialogCalorie: false});
                                    this.props.navigation.navigate(METABOLIC_SCREEN);
                                }}
                                style={styles.dialogTitleView}
                            />
                        ]}
                    >{/*ส่วนของbody*/}
                        <View style={{alignItems: 'center', justifyContent: 'center',paddingVertical: '10%'}}>
                            <Image  style={{width: '60%', height: 200}}
                                    source={Images.foodDiaty.Excess_energy}
                            />
                        </View>
                    </Dialog>
                </Container>
            </HandleBack>
        );
    }
}

foodDiaryScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={Trans.tran('FoodDiary.title')}/>,
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
    viewBarBMI: {
        height: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    barBMI: {
        height: 16
    },
    viewListItem: {
        width: '100%',
        height: 70,
        backgroundColor: "#F4F4F4"
    },
    ListContainer: {
        height: 70,
        backgroundColor: 'transparent'
    },
    imgList: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFoodName: {
        fontSize: 16,
        color: '#020202',
        marginLeft: 5,
        marginTop: 5
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#068e81'
    },
    containerBody: {
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
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
        FETCH_SearchUser: bindActionCreators(APIUser.fetchSearchUser, dispatch),
        FETCH_UpdateUser: bindActionCreators(APIUser.fetchUpdateUser, dispatch),
        FETCH_SearchFoodUser: bindActionCreators(APIDiary.fetchSearchFoodUser, dispatch),
        FETCH_SumCalorieFoodUser: bindActionCreators(APIDiary.fetchSumCalorieFoodUser, dispatch),
        FETCH_DeleteFoodName: bindActionCreators(APIDiary.fetchDeleteFoodName, dispatch),
        REDUCER_SearchFoodUser: bindActionCreators(getSearchFoodUser, dispatch),
        REDUCER_ONEDATA: bindActionCreators(getOneUser, dispatch)
    })
)(foodDiaryScreen);
