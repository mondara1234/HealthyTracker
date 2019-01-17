import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import {Container, Card, CardItem, Body, Left, Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions, withNavigation } from "react-navigation";
import CommonText from '../../../common/components/CommonText';
import { Images } from "../../../User/components/images";
import { DETAILTRICK_SCREEN } from "../../../Trick/router";
import {seaech_TrickAll} from "../../../Trick/redux/actions";
import * as APITrick from "../../../Trick/api/api";

class AllTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dataTrickOne: [],
            dataTrickTwo: [],
            dataTrickAll: [],
        };
    }

    _renderItem = ({item}) => {

        return (
            <Card withSpace style={{marginTop: 20, marginLeft: 5,marginRight: 5 }}>
                <CardItem
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Body style={{ margin: -10, marginTop: 1  }}>
                    <Image
                        source={{uri: item.TrickIMG}}
                        style={{width: '100%', height: 150}}
                    />
                    <Text numberOfLines={1} style={{fontSize: 16, color: '#020202', marginTop: 3, fontWeight: 'bold'}}>{item.TrickName}</Text>
                    <View style={{width: '100%', height: 35,  flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 2 }}>
                        <Image  style={{marginHorizontal: 5, width: 30, height: 25}}
                                source={Images.TrickScreen.Heart}
                        />
                        <Text style={{ fontSize: 14, color: '#068e81'}}> {item.TrickLike + ' คน'} </Text>
                    </View>
                    </Body>
                </CardItem>
            </Card>

        )
    };

    _renderItem2 = ({item}) => {

        return (
            <Card withSpace style={{marginLeft: 10, marginRight: 10}}>
                <CardItem
                    style={{  width: 180}}
                    button
                    onPress={() => this.props.navigation.navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Body style={{ margin: -5 }}>
                    <Image
                        source={{uri: item.TrickIMG}}
                        style={{width: '100%', height: 100}}
                    />
                    <Text numberOfLines={1} style={{fontSize: 16, color: '#020202', marginTop: 3, fontWeight: 'bold'}}>{item.TrickName}</Text>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' , marginTop: 20}}>
                        <Image  style={{marginHorizontal: 5, width: 30, height: 25}}
                                source={Images.TrickScreen.Heart}
                        />
                        <Text style={{ fontSize: 14, color: '#068e81'}}> {item.TrickLike + ' คน'} </Text>
                    </View>
                    </Body>
                </CardItem>
            </Card>

        )
    };

    _renderItemAll = ({item}) => {
        return (
            <Card
                style={{flex: 1, width: '93%', marginLeft: 10}}
            >
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
                    <Text numberOfLines={1} style={{fontSize: 16, color: '#020202', marginTop: 3, marginLeft: 3, fontWeight: 'bold'}}> {item.TrickName}</Text>
                    <View style={{flex: 1, width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Image  style={{width: 28, height: 24}}
                                source={Images.TrickScreen.Heart}
                        />
                        <CommonText text={item.TrickLike + ' คน'} style={{ fontSize: 14, color: '#068e81'}} />
                    </View>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    componentDidMount() {
        this.getTrickAll();
    }

    async getTrickAll() {
        const response = await this.props.FETCH_SearchTrickAll();
        this.props.REDUCER_seaechTrickAll(response);
        const TrickAll = this.props.TrickAll.trickAll;
        let resultOne = [];
        let resultTwo = [];
        let resultAll = [];
        for (let i = 0; i < TrickAll.length; i++) {
            if (i < 1) {
                resultOne.push(TrickAll[i]);
            }
        }
        for (let i = 0; i < TrickAll.length; i++) {
            if (i < 3) {
                resultTwo.push(TrickAll[i]);
            }
        }
        for (let i = 3; i < TrickAll.length; i++) {
            resultAll.push(TrickAll[i]);
        }
        this.setState({
            dataTrickOne: resultOne,
            dataTrickTwo: resultTwo,
            dataTrickAll: resultAll,
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
                            data={this.state.dataTrickAll}
                            renderItem={this._renderItemAll}
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
        Users: state.dataUser,
        TrickAll: state.dataTrick
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        FETCH_SearchTrickAll: bindActionCreators(APITrick.fetchSearchTrickAll, dispatch),
        REDUCER_seaechTrickAll: bindActionCreators(seaech_TrickAll, dispatch),
    })
)(withNavigation(AllTab));

