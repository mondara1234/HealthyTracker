import React from 'react';
import { StyleSheet, View, Image, BackHandler, Alert } from 'react-native';
import { Container, Content, Accordion } from 'native-base';
import { NavigationActions } from "react-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import Trans from "../../common/containers/Trans";
import HandleBack from "../../common/components/HandleBack";
import { Images } from "../../User/components/images";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../router";
import { TRICK_SCREEN } from "../../Trick/router";
import * as APIBMIUser from "../../BMI/api/api";
import { seaech_BMIUser } from "../../BMI/redux/actions";

class bmiScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            editing: true,
            dataArray : [],
            Sex:'',
            bmi: 0,
            criterionbmi: ''
        }
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

    _renderHeader(dataArray, expanded) {
        return (
            <View style={styles.containerHead}>
                <View style={styles.containerBodyHead}>
                    <CommonText text={dataArray.NameBMI} />
                    <View style={styles.containerUnitHead}>
                        <CommonText text={dataArray.UnitBMI} />
                        <CommonText text={dataArray.SumBMI} style={{ marginLeft: 3 }} />
                    </View>
                </View>
                {expanded
                    ?
                    <CommonText text={Trans.tran('BMI.close_Details')} style={styles.showBody}/>
                    :
                    <CommonText text={Trans.tran('BMI.open_Details')} style={styles.showBody}/>
                }
            </View>
        );
    }

    _renderContent(dataArray) {
        return (
            <CommonText text={dataArray.DetailBMI} style={styles.containerContent} />
        );
    }

    componentDidMount() {

        const {user} = this.props.Users;
        const Height = user.map((data) => {return data.Height});
        const Weight = user.map((data) => {return data.Weight});
        const Sex = user.map((data) => {return data.Sex});
        let SumBMi = Math.pow(Weight, 2)/Height;
        let BMRUser = 0;
        let criterionBMI = '';

        if(SumBMi.toFixed(2) < 18.50){
            BMRUser = 1;
            criterionBMI = Trans.tran('BMI.criterionBMI.thin');

        }else if(SumBMi.toFixed(2) < 23.00){
            BMRUser = 2;
            criterionBMI = Trans.tran('BMI.criterionBMI.normal');

        }else if(SumBMi.toFixed(2) < 25.00){
            BMRUser = 3;
            criterionBMI = Trans.tran('BMI.criterionBMI.buxom');

        }else if(SumBMi.toFixed(2) < 30.00){
            BMRUser = 4;
            criterionBMI = Trans.tran('BMI.criterionBMI.fat');

        }else if(30.00 < SumBMi.toFixed(2) ){
            BMRUser = 5;
            criterionBMI = Trans.tran('BMI.criterionBMI.fat_much');
        }
        this.setState({
            bmi : SumBMi.toFixed(2),
            criterionbmi: criterionBMI,
            Sex: `${Sex}`
        });
        this.getBMRUser(BMRUser)

    }

    async getBMRUser(BMRUser) {
        let BMRUsers =`${BMRUser}`;
        const response = await this.props.FETCH_SearchBMIUse(BMRUsers);
        this.props.REDUCER_seaech_BMIUser(response);
        const arrayBMI = this.props.BmiUser.bmiUser;
        this.setState({
            dataArray : arrayBMI
        });
    }

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content>
                        <View style={styles.container}>
                            <View style={styles.containerBMI}>
                                <View>
                                    <View style={styles.containerBodyBMI}>
                                        <CommonText text={`${Trans.tran('BMI.title')} :`} style={styles.textHead} />
                                        <CommonText text={this.state.bmi} style={styles.valueHead} />
                                    </View>
                                    <View style={styles.containerBodyBMI}>
                                        <CommonText text={`${Trans.tran('BMI.criterion')} :`} style={[styles.textHead,{marginLeft: '30%'}]} />
                                        <CommonText text={this.state.criterionbmi} style={styles.valueHead} />
                                    </View>
                                </View>
                                <View style={styles.containerBodyBMI}>
                                    {`${this.state.criterionbmi}` === 'ผอม' && `${this.state.Sex}` === 'male' ?
                                        <Image  style={{width: 60, height: 100, marginLeft: '10%'}}
                                                source={Images.BMI.male_thin}
                                        />
                                        :`${this.state.criterionbmi}` === 'ผอม' && `${this.state.Sex}` === 'female' ?
                                            <Image  style={{width: 60, height: 100, marginLeft: '10%'}}
                                                    source={Images.BMI.male_thin}
                                            />
                                            :`${this.state.criterionbmi}` === 'ปกติ' && `${this.state.Sex}` === 'male' ?
                                                <Image  style={{width: 60, height: 120, marginLeft: '10%'}}
                                                    source={Images.BMI.male_slender}
                                                />
                                                :`${this.state.criterionbmi}` === 'ปกติ' && `${this.state.Sex}` === 'female' ?
                                                    <Image  style={{width: 60, height: 100, marginLeft: '10%'}}
                                                            source={Images.BMI.Female_slender}
                                                    />
                                                    :`${this.state.Sex}` === 'male' ?
                                                        <Image  style={{width: 60, height: 120, marginLeft: '3%'}}
                                                                source={Images.BMI.male_fat}
                                                        />
                                                        : <Image  style={{width: 60, height: 100, marginLeft: '3%'}}
                                                            source={Images.BMI.Female_Fat}
                                                        />
                                    }
                                </View>
                            </View>
                            <View style={styles.containerBarBMI }>
                                <View
                                    style={[
                                        styles.barBMI,
                                        {
                                            width: this.state.bmi < 18.50 ?
                                                '5%'
                                                :
                                                this.state.bmi < 23.00 ?
                                                    '25%'
                                                    :
                                                    this.state.bmi < 25.00 ?
                                                        '45%'
                                                        :
                                                        this.state.bmi < 30.00 ?
                                                            '68%'
                                                            :
                                                            '100%',
                                            backgroundColor:
                                                this.state.bmi < 18.50 ?
                                                    '#068e81'
                                                    :
                                                    this.state.bmi < 23.00 ?
                                                        '#406894'
                                                        :
                                                        this.state.bmi < 25.00 ?
                                                            '#946649'
                                                            :
                                                            this.state.bmi < 30.00 ?
                                                                '#940c17'
                                                                :
                                                                '#428e94'
                                        }
                                    ]}
                                />
                            </View>
                            <View style={styles.containerClock}>
                                <CommonText
                                    text={Trans.tran('BMI.criterionBMI.thin')}
                                    style={[styles.textUnitKcal, { color: '#068e81'}]}
                                />
                                <CommonText
                                    text={Trans.tran('BMI.criterionBMI.normal')}
                                    style={[styles.textUnitKcal, { color: '#406894'}]}
                                />
                                <CommonText
                                    text={Trans.tran('BMI.criterionBMI.buxom')}
                                    style={[styles.textUnitKcal, { color: '#946649'}]}
                                />
                                <CommonText
                                    text={Trans.tran('BMI.criterionBMI.fat')}
                                    style={[styles.textUnitKcal, { color: '#940c17'}]}
                                />
                                <CommonText
                                    text={Trans.tran('BMI.criterionBMI.fat_much')}
                                    style={[styles.textUnitKcal, { color: '#428e94'}]}
                                />
                            </View>
                            <View
                                style = {styles.separator}>
                            </View>
                            <View padder>
                                <CommonText
                                    style={[styles.textUnitKcal, {fontSize:18, marginTop: 10}]}
                                    color={'#068e81'}
                                    text={Trans.tran('BMI.suggestion')}
                                />
                                <Accordion
                                    dataArray={this.state.dataArray}
                                    renderHeader={this._renderHeader}
                                    renderContent={this._renderContent}
                                    headerStyle={{ backgroundColor: "#b7daf8" }}
                                    contentStyle={{ backgroundColor: "#ddecf8" }}
                                    style={{marginRight: '2%'}}
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
    headerTitle: <HeaderTitle text={Trans.tran('BMI.title')} />,
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
        flex: 1,
        width: '100%',
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
        fontSize: 20,
        marginTop: 10
    },
    valueHead:{
        fontSize: 22,
        marginTop: 10,
        marginLeft: '10%',
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

function mapStateToProps(state) {
    return{
        Users: state.dataUser,
        BmiUser: state.dataBMIUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_SearchBMIUse: bindActionCreators(APIBMIUser.fetchSearchBMIUser, dispatch),
        REDUCER_seaech_BMIUser: bindActionCreators(seaech_BMIUser, dispatch),
    })
)(bmiScreen);
