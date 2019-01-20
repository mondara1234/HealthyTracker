import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {Container, Card, CardItem, Body, Left, Right , Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {NavigationActions, withNavigation} from "react-navigation";
import CommonText from '../../../common/components/CommonText';
import { Images } from "../../../User/components/images";
import ImgRank from '../../../common/components/ImgRank';
import { DETAILTRICK_SCREEN } from "../../../Trick/router";
import * as APITrick from "../../api/api";
import {seaech_TrickRank} from "../../redux/actions";
import Trans from "../../../common/containers/Trans";

class RankTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dataTrickOne: [],
            dataTrickTwo: [],
            dataTrickRank: [],
        };
    }

    _renderItem = ({item, index}) => {
        const Rankin = index + 1;
        return (
            <Card withSpace style={{marginTop: 20, marginLeft: 5,marginRight: 5 }}>
                <CardItem
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Body style={{ margin: -10, marginTop: 1  }}>
                    <ImgRank
                        nameUriImg={item.TrickIMG}
                        nameRank={Rankin}
                        styleImgRank={{marginTop: -120}}
                        styleImg={{width: '100%', height: 150}}
                    />
                    <Text numberOfLines={1} style={{fontSize: 16, color: '#020202', marginTop: 3, fontWeight: 'bold'}}>{item.TrickName}</Text>
                    <View style={{width: '100%', height: 35,  flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 2 }}>
                        <Image  style={{marginHorizontal: 5, width: 30, height: 25}}
                                source={Images.TrickScreen.Heart}
                        />
                        <Text style={{ fontSize: 14, color: '#068e81'}}> {`${item.TrickLike} ${Trans.tran('Trick.person')}`} </Text>
                    </View>
                    </Body>
                </CardItem>
            </Card>

        )
    };

    _renderItem2 = ({item, index}) => {
        const Rankin = index + 2;
        return (
            <Card withSpace style={{marginLeft: 10, marginRight: 10}}>
                <CardItem
                    style={{  width: 180}}
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Body style={{ margin: -5 }}>
                    <ImgRank
                        nameUriImg={item.TrickIMG}
                        nameRank={Rankin}
                        styleImgRank={{marginTop: -120}}
                        styleImg={{width: '100%', height: 150}}
                    />
                    <Text numberOfLines={1} style={{fontSize: 16, color: '#020202', marginTop: 3, fontWeight: 'bold'}}>{item.TrickName}</Text>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' , marginTop: 20}}>
                        <Image  style={{marginHorizontal: 5, width: 30, height: 25}}
                                source={Images.TrickScreen.Heart}
                        />
                        <Text style={{ fontSize: 14, color: '#068e81'}}> {`${item.TrickLike} ${Trans.tran('Trick.person')}`} </Text>
                    </View>
                    </Body>
                </CardItem>
            </Card>

        )
    };

    _renderItemRank = ({item, index}) => {
        const Rankin = index + 4;
        return (
            <Card
                style={{flex: 1, width: '93%', marginLeft: 10}}
            >
                <CardItem
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Left>
                        <ImgRank
                            nameUriImg={item.TrickIMG}
                            styleImg={{width: 70, height: 70}}
                            styleImgRank={{marginTop: -43}}
                            nameRank={Rankin}
                        />
                    </Left>
                    <Body style={{ marginLeft: '-50%'}}>
                    <Text numberOfLines={1} style={{fontSize: 16, color: '#020202', marginTop: 3, marginLeft: 3, fontWeight: 'bold'}}> {item.TrickName}</Text>
                    <View style={{flex: 1, width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Image  style={{width: 28, height: 24}}
                                source={Images.TrickScreen.Heart}
                        />
                        <CommonText text={`${item.TrickLike} ${Trans.tran('Trick.person')}`} style={{ fontSize: 14, color: '#068e81'}} />
                    </View>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    componentDidMount() {
        this.getTrickRank();
    }

    async getTrickRank() {
        const response = await this.props.FETCH_SearchTrickRank();
        this.props.REDUCER_seaechTrickRank(response);
        const TrickRank = this.props.TrickRank.trickRank;
        let resultOne = [];
        let resultTwo = [];
        let resultRank = [];
        for (let i = 0; i < TrickRank.length; i++) {
            if (i < 1) {
                resultOne.push(TrickRank[i]);
            }
        }
        for (let i = 1; i < TrickRank.length; i++) {
            if (i < 3) {
                resultTwo.push(TrickRank[i]);
            }
        }
        for (let i = 3; i < TrickRank.length; i++) {
            resultRank.push(TrickRank[i]);
        }
        this.setState({
            dataTrickOne: resultOne,
            dataTrickTwo: resultTwo,
            dataTrickRank: resultRank,
        });

    }

    render() {
        return (
            <Container withBackground>
                <Content>
                    <View style={{flex: 1, width: '100%', marginTop: 5}}>
                        <FlatList
                            data={this.state.dataTrickOne}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={{flex: 1, width: '100%',justifyContent: 'center', alignItems: 'center'}}>
                        <FlatList
                            data={this.state.dataTrickTwo}
                            renderItem={this._renderItem2}
                            horizontal
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={{flex: 1, width: '100%', marginTop: 10}}>
                        <FlatList
                            data={this.state.dataTrickRank}
                            renderItem={this._renderItemRank}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return{
        TrickRank: state.dataTrick
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_SearchTrickRank: bindActionCreators(APITrick.fetchSearchTrickRank, dispatch),
        REDUCER_seaechTrickRank: bindActionCreators(seaech_TrickRank, dispatch),
    })
)(withNavigation(RankTab));

