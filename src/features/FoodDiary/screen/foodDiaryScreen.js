import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList } from 'react-native';
import { Container, H3, ListItem, Left, Thumbnail, Body } from 'native-base';
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import SideMenu from '../../common/components/SideMenu';
import { Images } from "../../User/components/images";
import food from '../api/food';
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { BMI_SCREEN } from "../../BMI/router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";

class foodDiaryScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: food,
            DialogData: false,
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{width: '100%', height: 70, backgroundColor: index % 2 == 0 ? "#8ef7ff" : "#ff78f4"}}>
                <ListItem thumbnail >
                    <Left>
                        <Thumbnail source={{uri: item.picture.thumbnail}}  style={{ width: 60, height: 60, marginLeft: 15, marginBottom: 15}} />
                    </Left>
                    <Body style={{backgroundColor: index % 2 == 0 ? "#8ef7ff" : "#ff78f4"}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <H3 style={{fontSize: 16, color: '#020202', marginBottom: 10}}>{item.name.first} </H3>
                        <IconFontAwesome name="window-close-o" size={30} style={{ marginTop: -40}}/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{ fontSize: 14, color: '#000',}}> {'จำนวน '+ item.calorie + ' หน่วย'} </Text>
                        <Text style={{ fontSize: 14, color: '#068e81',}}> {item.calorie + ' แคลอรี่'} </Text>
                    </View>
                    </Body>
                </ListItem>
            </View>
        )
    };

    renderSeparator=() =>{
        return(
            <View
                style = {{height: 1 , width: '100%', backgroundColor: '#080808'}}>
            </View>
        )
    };

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.containerClock}>
                    <IconFontAwesome name="clock-o" size={30} style={styles.styleIconClock} />
                    <Text style={styles.textClock}> {'22:45'} </Text>
                    <Text style={styles.textClock}> {'น.'} </Text>
                </View>
                <View style={styles.containerCalendar}>
                    <Text style={styles.textCalendar}> {'วันที่'} </Text>
                    <Text style={styles.textCalendar}> {'22/02/61'} </Text>
                    <IconFontAwesome name="calendar" size={30} style={styles.styleIconCalendar} />
                </View>
                <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{ flex: 1, width: '90%', borderWidth: 1 , marginHorizontal: 5}}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </View>
                </View>
                <View style={styles.containerKcal}>
                    <Image  style={{width: 60, height: 100}}
                            source={Images.foodDiaty.kcal1}
                    />
                    <View>
                        <View style={styles.containerCalendar}>
                            <Text style={styles.textTitlekcal}> {'พลังงานที่ได้รับในวันนี้ '} </Text>
                            <Text style={styles.textSumkcal}> {'200'} </Text>
                            <Text style={styles.textTitlekcal}> {' แคลอรี่'} </Text>
                        </View>
                        <View style={styles.containerCalendar}>
                            <Text style={styles.textTitlekcal}> {'พลังงานที่ต้องการจ่อวัน '} </Text>
                            <Text style={styles.textSumkcal}> {'1875'} </Text>
                            <Text style={styles.textTitlekcal}> {' แคลอรี่'} </Text>
                        </View>
                    </View>
                </View>
                <Image  style={{marginHorizontal: 10, width: '92%', height: 20}}
                        source={require('../../../../pulic/assets/images/MeasuringBar.png')}
                />
                <View style={styles.containerClock}>
                    <Text style={[styles.textUnitKcal, { marginLeft: 10, color: '#068e81'}]}> {'ควรเพิ่ม'} </Text>
                    <Text style={[styles.textUnitKcal, { marginHorizontal: 40, color: '#406894'}]}> {'พอดี'} </Text>
                    <Text style={[styles.textUnitKcal, { marginRight: 10, color: '#940c17'}]}> {'ควรเผาผลาญ'} </Text>
                </View>
                <SideMenu
                    diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                    menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                    bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                    trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                />
                <Dialog
                    visible={this.state.DialogData}//เช้ดค่าจากตัวแปลเพื่อเปิดหรือปิด
                    onTouchOutside={() => {this.setState({ DialogData: true })}}//ไม่ให้กดข้างนอกได้
                    backgroundStyle={styles.customBackgroundDialog}
                    dialogTitle={//ส่วนของTitle
                        <DialogTitle
                            title="กรุณากรอกข้อมูลส่วนตัวของคุณ"
                            hasTitleBar={false}
                            textStyle={styles.dialogTextTitle}
                            style={[styles.dialogTitleView,{backgroundColor: '#F4F4F4'}]}
                        />
                    }//ส่วนของฺbutton
                    actions={[
                        <DialogButton
                            text="บันทึก"
                            textStyle={styles.dialogTextButton}
                            onPress={() => {
                                this.setState({ DialogData: false })
                            }}
                            style={styles.dialogTitleView}
                        />
                    ]}
                >{/*ส่วนของbody*/}
                    <View style={styles.dialogBodyView}>
                        <View style={styles.containerTextDialogBody}>
                            <Text style={[styles.dialogTextBody,{ marginLeft: 20 }]}>{'เพศ'}</Text>
                            <Text style={[styles.dialogTextBody,{ marginLeft: 30 }]}>{'ชาย'}</Text>
                            <Text style={[styles.dialogTextBody,{ marginLeft: 3 }]}>{'/'}</Text>
                            <Text style={[styles.dialogTextBody,{ marginLeft: 3 }]}>{'หญิง'}</Text>
                        </View>
                        <View style={styles.containerTextDialogBody}>
                            <Text style={[styles.dialogTextBody,{ marginLeft: 20 }]}>{'อายุ'}</Text>
                            <TextInput style={styles.inputBoxDialog}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       placeholderTextColor = "#068e81"
                                       keyboardType="numeric"
                                       textAlign="center"
                                       onChangeText={ TextInputValue => this.setState({ TextInput_age : TextInputValue })}
                            />
                            <Text style={styles.dialogTextBody}>{'ปี'}</Text>
                        </View>
                        <View style={styles.containerTextDialogBody}>
                            <Text style={styles.dialogTextBody}>{'ส่วนสูง'}</Text>
                            <TextInput style={styles.inputBoxDialog}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       placeholderTextColor = "#068e81"
                                       keyboardType="numeric"
                                       textAlign="center"
                                       onChangeText={ TextInputValue => this.setState({ TextInput_cm : TextInputValue }) }
                            />
                            <Text style={styles.dialogTextBody}>{'เซนติเมตร'}</Text>
                        </View>
                        <View style={[styles.containerTextDialogBody,{ marginBottom: 30 }]}>
                            <Text style={styles.dialogTextBody}>{'น้ำหนัก'}</Text>
                            <TextInput style={styles.inputBoxDialog}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       placeholderTextColor = "#068e81"
                                       keyboardType="numeric"
                                       textAlign="center"
                                       onChangeText={ TextInputValue => this.setState({ TextInput_gg : TextInputValue }) }
                            />
                            <Text style={styles.dialogTextBody}>{'กิโลกรัม'}</Text>
                        </View>
                    </View>
                </Dialog>
            </Container>
        );
    }
}

foodDiaryScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'FoodDiary'}/>,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
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
    textClock: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81'
    },
    textCalendar: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81'
    },
    styleIconClock: {
        marginRight: 10,
        color: '#000'
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
});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
    })
)(foodDiaryScreen);
