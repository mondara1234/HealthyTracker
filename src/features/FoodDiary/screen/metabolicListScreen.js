import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, BackHandler, Alert, Keyboard } from 'react-native';
import { Container, Header, Thumbnail } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import Trans from "../../common/containers/Trans";
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { AllMetabolic } from "../redux/actions";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN, FOODDETAIL_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";
import { SERVER_URL } from "../../../common/constants";

class metabolicListScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            setMetabolicList: [],
            query: '',
            editing: true,
            statusSort: false
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
        this.AllmetabolicList();
    }

    async AllmetabolicList() {
        const response = await fetch(`${SERVER_URL}/My_SQL/foodDiary/AllmetabolicList.php`)
            .then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetAllMetabolic(response);
        const dataMetabolic = this.props.metabolic.metabolic;
        this.setState({
            setMetabolicList: dataMetabolic,
            films: dataMetabolic
        });
    }

    sortMetablic() {
        Keyboard.dismiss();
        const response = this.state.films;
        if(this.state.statusSort === false){
            response.sort(function (a, b) {
                if(a.metabolic_Name < b.metabolic_Name) { return -1; }
                if(a.metabolic_Name > b.metabolic_Name) { return 1; }
                return 0;
            });
            this.setState({
                films: response,
                statusSort: true
            });
        }else{
            response.reverse(function(a, b){
                if(a.metabolic_Name < b.metabolic_Name) { return -1; }
                if(a.metabolic_Name > b.metabolic_Name) { return 1; }
                return 0;
            });
            this.setState({
                films: response,
                statusSort: false
            });
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.containerItem}>
                <View style={[styles.bodyItem,{ width: '20%'}]}>
                    <Thumbnail square
                        source={{uri: item.img}}
                        style={styles.sizeImgMetabolic}
                    />
                </View>
                <View style={[styles.bodyItem,{ width: '40%'}]}>
                    <CommonText text={`${item.metabolic_Name}`} size={14}/>
                </View>
                <View style={[styles.bodyItem,{ width: '40%'}]}>
                    <CommonText text={`${item.Calorie}  กิโลแคลอรี่`} size={14} />
                </View>
            </View>
        )
    };

    //ไว้รับค่าแล้วค้นหา
    findFilm(value) {
        this.setState({query: value});
        let data = this.state.setMetabolicList;
        if (value === '') {
            this.setState({
                films: data
            })
        }else{
            this.SearchMetabolicList(value)
        }
    }

    async SearchMetabolicList(value) {
        let metabolic_Name = `${value}`;
        const response = await fetch(`${SERVER_URL}/My_SQL/foodDiary/SeachMetabolic_Name.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                metabolicname : metabolic_Name
            })
        }).then(response => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {
                console.error(error);
            });
        this.props.REDUCER_GetAllMetabolic(response);
        const dataMetabolic = this.props.metabolic.metabolic;

        let data = [];
        if( dataMetabolic === 'ไม่พบ' ){
            this.setState({
                films: data
            })
        }else{
            this.setState({
                films: dataMetabolic
            })
        }
    }

    BtnClear(){ // ปุ่ม x (ลบ)
        let data = this.state.setMetabolicList;
        this.setState({
            films: data,
            query: '',
        })
    }

    render() {
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Header style={styles.bgColorApp}>
                        <HeaderLeftMenu onPress={() => {
                            Keyboard.dismiss();
                            this.props.navigation.navigate('DrawerOpen')
                        }} />
                        <HeaderTitle text={'กิจกรรมการเผาผลาญแคลอรี่'} />
                        <View style={styles.viewRowCenter}>
                            <HeaderLeftMenu icon={ (this.state.statusSort === false ? 'sort-alpha-desc':'sort-alpha-asc')} style={{marginRight: 5}} onPress={() => this.sortMetablic()} />
                        </View>
                    </Header>
                    <View style={styles.container}>
                        <View style={styles.containerViewSearch}>
                            <Icon name={'search'} size={25}/>
                            <Autocomplete
                                style={styles.containerSearch}/*กำหนดรูปแบบช่องค้นหา*/
                                containerStyle={styles.autocompleteContainer}/*กำหนดรูปแบบแถบแสดงค้นหา*/
                                defaultValue={this.state.query} /*กำหนดค่าเริ่มต้นให้กับ แวรู้*/
                                onChangeText={(value) => this.findFilm(value)} /*ส่งค่าที่กรอกเข้าไป*/
                                placeholder={'ใส่ชื่อกิจกรรมที่ต้องการค้นหา'} /*ลายน้ำเพื่อพิมจะหายไป*/
                            />
                            {this.state.query ?
                                <TouchableOpacity onPress={() => this.BtnClear()} >
                                    <Icon name={'close'} size={25} />
                                </TouchableOpacity>
                                : null
                            }
                        </View>
                        <View style={styles.viewNumberFound}>
                            <View style={[styles.titleList,{width: '20%'}]}>
                                <CommonText text={'รูปภาพ'} style={styles.fonttitleFoodType} />
                            </View>
                            <View style={[styles.titleList,{width: '40%'}]}>
                                <CommonText text={'กิจกรรม 1 ชั่วโมง'} style={styles.fonttitleFoodType} />
                            </View>
                            <View style={[styles.titleList,{width: '40%'}]}>
                                <CommonText text={'เผาผลาญ/กิโลแคลอรี่'} style={styles.fonttitleFoodType} />
                            </View>
                        </View>
                        <View style={styles.containerFlasList}>
                            <FlatList
                                data={this.state.films}
                                extraData={this.state}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    </View>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                        metabolicListScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                </Container>
            </HandleBack>
        );
    }
}

metabolicListScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerItem: {
        flexDirection: 'row',
        width: '99.9%',
        marginLeft: '0.10%'
    },
    titleList: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    sizeImgMetabolic:{
        width: 50,
        height: 50,
        marginHorizontal: '3%',
        marginVertical: '3%'
    },
    bodyItem:{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    autocompleteContainer:{
        width: '50%',
        marginHorizontal: 10
    },
    containerSearch: {
        height: 40,
        backgroundColor:'#F4F4F4',
        color:'#068e81',
        borderWidth: 2,
        borderColor: '#068e81',
    },
    btnClear: {
        height:50,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10
    },
    bgColorApp: {
        backgroundColor: '#9c1700'
    },
    viewRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerViewSearch: {
        height: 50,
        width: '90%',
        backgroundColor: "#F4F4F4",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    viewNumberFound: {
        width: '99.9%',
        height: 40,
        backgroundColor: "#068E81",
        flexDirection: 'row',
        alignItems: 'center'
    },
    fonttitleFoodType: {
        fontSize: 14,
        color: '#fff',
    },
    containerFlasList: {
        flex: 1,
        width: '100%'
    }

});

function mapStateToProps(state) {
    return{
        metabolic: state.dataDiary
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_GetAllMetabolic: bindActionCreators(AllMetabolic, dispatch)
    })
)(metabolicListScreen);
