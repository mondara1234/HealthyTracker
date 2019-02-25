import React from 'react';
import { StyleSheet, TextInput, Image, View, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { Container, Content } from 'native-base';
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Trans from "../../common/containers/Trans";
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { BMI_SCREEN } from "../../BMI/router";
import * as APITrick from "../../Trick/api/api";

class DetailTrickScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            editing: true,
            statusLike: '',
            trickLike: 0
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

    componentDidMount() {
        const { trickData } = this.props.navigation.state.params;
        const trickID = trickData.TrickID;
        const {user} = this.props.Users;
        const UserName = user.map((data) => {return data.UserName});
        let UserNames =`${UserName}`;
        let trickIDs =`${trickID}`;

        this.SearchUserLikeTrick(UserNames,trickIDs);

    }

    async SearchUserLikeTrick(UserNames,trickIDs) {
        const response = await this.props.FETCH_SearchUserLikeTrick(UserNames,trickIDs);
        if(response === 'allow'){
            this.setState({
                statusLike: 'allow',
            });
        }else{
            this.setState({
                statusLike: 'disallow',
            });
        }
    }

    async DeleteUserLikeTrick(){
        const { trickData } = this.props.navigation.state.params;
        const trickID = trickData.TrickID;
        const trickLike = (this.state.trickLike === 0 ? parseInt(trickData.TrickLike) : this.state.trickLike) - 1;
        const {user} = this.props.Users;
        const UserName = user.map((data) => {return data.UserName});
        let UserNames =`${UserName}`;
        let trickIDs =`${trickID}`;
        let trickLikes =`${trickLike }`;
        const response = await  this.props.FETCH_DeleteUserLikeTrick(UserNames,trickIDs);
        this.SearchUserLikeTrick(UserNames,trickID);
        this.UpdateLike(trickIDs,trickLikes);
    }

    async InsertUserLikeTrick(){
        const { trickData } = this.props.navigation.state.params;
        const trickID = trickData.TrickID;
        const trickLike = (this.state.trickLike === 0 ? parseInt(trickData.TrickLike) : this.state.trickLike) + 1;
        const {user} = this.props.Users;
        const UserName = user.map((data) => {return data.UserName});
        let UserNames =`${UserName}`;
        let trickIDs =`${trickID}`;
        let trickLikes =`${trickLike }`;
        const response = await  this.props.FETCH_InsertUserLikeTrick(UserNames,trickIDs);
        this.SearchUserLikeTrick(UserNames,trickID);
        this.UpdateLike(trickIDs,trickLikes);
    }

    async UpdateLike(trickIDs,trickLikes){
        const response = await this.props.FETCH_UpdateLike(trickIDs,trickLikes);
        this.SearchTrickID(trickIDs)
    }

    async SearchTrickID(trickIDs){
        const response = await this.props.FETCH_SearchTrickID(trickIDs);
        let TrickLike = response.map((data) => {return data.TrickLike});
        this.setState({
            trickLike: parseInt(TrickLike)
        });
    }

    render() {
        const { trickData } = this.props.navigation.state.params;

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Content padder>
                        {this.state.statusLike === 'allow' ?
                            <View style={styles.containerLike}>
                                <CommonText text={Trans.tran('Trick.unlike')} />
                                <TouchableOpacity
                                    onPress={()=> this.DeleteUserLikeTrick()}
                                >
                                    <Image  style={styles.sizeHeart}
                                    source={require('../../../../pulic/assets/images/Heart.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        :
                            <View style={styles.containerLike}>
                                <CommonText text={Trans.tran('Trick.like')} />
                                <TouchableOpacity
                                    onPress={()=> this.InsertUserLikeTrick()}
                                >
                                    <Image  style={styles.sizeHeart}
                                            source={require('../../../../pulic/assets/images/Heart.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={styles.container}>
                            <Image  style={styles.sizeIMGTrick}
                                    source={{uri: trickData.TrickIMG}}
                            />
                            <CommonText text={trickData.TrickName} style={styles.fontTitleName} />
                            <View style={styles.viewPropleAdd}>
                                <View style={styles.containerRow}>
                                    <Image  style={styles.sizeHeartDetail}
                                            source={require('../../../../pulic/assets/images/Heart.png')}
                                    />
                                    <CommonText text={`${this.state.trickLike === 0 ? trickData.TrickLike : this.state.trickLike} ${Trans.tran('Trick.person')}`} size={16} />
                                </View>
                                <CommonText text={`${trickData.PeopleAdd} / ${trickData.DateAdded}`} size={16} />
                            </View>
                            <CommonText text={trickData.TrickDetail} style={{marginTop: 40}} />
                            <TouchableOpacity style={{marginTop: 10}} onPress={() => Linking.openURL(trickData.sourceURL)}>
                                <CommonText text={`ที่มา : ${trickData.sourceURL}`} color={'#07097d'} />
                            </TouchableOpacity>
                        </View>
                    </Content>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate(FOODDIARY_SCREEN)}
                        menuFoodScreen={() => this.props.navigation.navigate(MENUFOOD_SCREEN)}
                        bmiScreen={() => this.props.navigation.navigate(BMI_SCREEN)}
                        trickScreen={() => this.props.navigation.navigate(TRICK_SCREEN)}
                    />
                </Container>
            </HandleBack>
        );
    }
}

DetailTrickScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={`${Trans.tran('Trick.Tab.title')}: ${navigation.state.params.trickData.TrickName}`} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
    },
    inputBox: {
        width: 60,
        height: 80,
        backgroundColor: '#fff',
        borderWidth: 1,
        fontSize: 25,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    button: {
        width: 150,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 30,
        marginLeft: 20,
        backgroundColor: '#068e81'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    containerLike: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    sizeHeart: {
        marginHorizontal: 10,
        width: 36,
        height: 30
    },
    sizeIMGTrick: {
        marginHorizontal: 10,
        marginVertical: 10,
        width: '90%',
        height: 150
    },
    fontTitleName:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: '2%'
    },
    viewPropleAdd: {
        width: '100%',
        backgroundColor: '#F4F4F4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerRow: {
        backgroundColor: "#F4F4F4",
        flexDirection: 'row'
    },
    sizeHeartDetail: {
        marginHorizontal: 10,
        width: 27,
        height: 23
    }
});

function mapStateToProps(state) {
    return{
        Users: state.dataUser
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_SearchUserLikeTrick: bindActionCreators(APITrick.fetchSearchUserLikeTrick, dispatch),
        FETCH_DeleteUserLikeTrick: bindActionCreators(APITrick.DeleteUserLikeTrick, dispatch),
        FETCH_InsertUserLikeTrick: bindActionCreators(APITrick.InsertUserLikeTrick, dispatch),
        FETCH_UpdateLike: bindActionCreators(APITrick.UpdateLikeTrick, dispatch),
        FETCH_SearchTrickID: bindActionCreators(APITrick.SearchTrickID, dispatch),
    })
)(DetailTrickScreen);
