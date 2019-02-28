import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Card, CardItem, Body, Left, Content } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions, withNavigation  } from "react-navigation";
import moment from "moment/moment";
import Trans from "../../../common/containers/Trans";
import CommonText from '../../../common/components/CommonText';
import { DETAILTRICK_SCREEN } from "../../router";
import { seaech_TrickNew } from "../../../Trick/redux/actions";
import * as APITrick from "../../../Trick/api/api";

class NewTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataTrickOne: [],
            dataTrickTwo: [],
            dataTrickNew: [],
        };
    }

    _renderItem = ({item}) => {

        return (
            <Card withSpace style={styles.containeCard}>
                <CardItem
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Body style={styles.bodyCard}>
                    <Image
                        source={{uri: item.TrickIMG}}
                        style={{width: '100%', height: 150}}
                    />
                    <Text numberOfLines={1} style={styles.fontTitleName}> {item.TrickName} </Text>
                    <View style={styles.containerHeart}>
                        <Image  style={styles.sizeHeart}
                                source={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIRtTJ.png'}}
                        />
                        <CommonText text={`${item.TrickLike} ${Trans.tran('Trick.person')}`} size={14} color={'#068e81'} />
                    </View>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    _renderItem2 = ({item}) => {

        return (
            <Card withSpace style={styles.containerCardTwo}>
                <CardItem
                    style={{ width: 150 }}
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Body style={{ margin: -5 }}>
                    <Image
                        source={{uri: item.TrickIMG}}
                        style={{width: '100%', height: 100}}
                    />
                    <Text numberOfLines={1} style={styles.fontTitleName}>{item.TrickName}</Text>
                    <View style={[styles.viewHeartTwo, {marginTop: 20}]}>
                        <Image  style={styles.sizeHeart}
                                source={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIRtTJ.png'}}
                        />
                        <CommonText text={`${item.TrickLike} ${Trans.tran('Trick.person')}`} size={14} color={'#068e81'} />
                    </View>
                    </Body>
                </CardItem>
            </Card>

        )
    };

    _renderItemNew = ({item}) => {
        return (
            <Card style={styles.containeCardALL}>
                <CardItem
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Left>
                        <Image
                            source={{uri: item.TrickIMG}}
                            style={{width: 70, height: 70}}
                        />
                    </Left>
                    <Body style={{ marginLeft: '-50%'}}>
                    <Text numberOfLines={1} style={[styles.fontTitleName, {marginLeft: 3}]}> {item.TrickName} </Text>
                    <View style={[styles.viewHeartTwo,{marginTop: '8%'}]}>
                        <Image  style={{width: 28, height: 24}}
                                source={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIRtTJ.png'}}
                        />
                        <CommonText text={`${item.TrickLike < 10 ? '0'+item.TrickLike : item.TrickLike} ${Trans.tran('Trick.person')}`} size={14} color={'#068e81'} style={{marginLeft: '2%'}} />
                    </View>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    componentDidMount() {
        let date = new Date();
        let dateFormat = moment(date).format("YYYY-MM-DD");
        let dateNow = `${dateFormat}`;
        this.getTrickNew(dateNow);
    }

    async getTrickNew(dateNow) {
        const response = await this.props.FETCH_SearchTrickNew(dateNow);
        this.props.REDUCER_seaechTrickNew(response);
        const TrickNew = this.props.TrickNew.trickNew;
        let resultOne = [];
        let resultTwo = [];
        let resultNew = [];
        for (let i = 0; i < TrickNew.length; i++) {
            if (i < 1) {
                resultOne.push(TrickNew[i]);
            }
        }
        for (let i = 1; i < TrickNew.length; i++) {
            if (i < 3) {
                resultTwo.push(TrickNew[i]);
            }
        }
        for (let i = 3; i < TrickNew.length; i++) {
            resultNew.push(TrickNew[i]);
        }
        this.setState({
            dataTrickOne: resultOne,
            dataTrickTwo: resultTwo,
            dataTrickNew: resultNew,
        });

    }

    render() {
        return (
            <Container withBackground>
                <Content>
                    <View style={[styles.containerFlasList, {marginTop: 5}]}>
                        <FlatList
                            data={this.state.dataTrickOne}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={styles.containerFlasListTwo}>
                        <FlatList
                            data={this.state.dataTrickTwo}
                            renderItem={this._renderItem2}
                            horizontal
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={[styles.containerFlasList, {marginTop: 10}]}>
                        <FlatList
                            data={this.state.dataTrickNew}
                            renderItem={this._renderItemNew}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    containeCard: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
    bodyCard: {
        margin: -10,
        marginTop: 1
    },
    fontTitleName: {
        fontSize: 16,
        color: '#020202',
        marginTop: 3,
        fontWeight: 'bold'
    },
    containerHeart: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 2
    },
    sizeHeart: {
        marginHorizontal: 5,
        width: 30,
        height: 25
    },
    containerCardTwo: {
        marginLeft: 10,
        marginRight: 10
    },
    viewHeartTwo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    containeCardALL: {
        flex: 1,
        width: '93%',
        marginLeft: 10
    },
    containerFlasList: {
        flex: 1,
        width: '100%'
    },
    containerFlasListTwo: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    return{
        TrickNew: state.dataTrick
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_SearchTrickNew: bindActionCreators(APITrick.fetchSearchTrickNew, dispatch),
        REDUCER_seaechTrickNew: bindActionCreators(seaech_TrickNew, dispatch),
    })
)(withNavigation(NewTab));

