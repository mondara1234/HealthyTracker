import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container } from 'native-base';
import Dialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import SideMenu from '../../common/components/SideMenu';

class foodDiaryScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            DialogData: true,
        }
    }

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'FoodDiary'}</Text>
                <SideMenu/>
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
                        <View style={styles.containerTextDialogBody}>
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
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogBodyView: {
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
