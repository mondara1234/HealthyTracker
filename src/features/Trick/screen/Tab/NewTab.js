import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {Container, Card, CardItem, Body, Left, Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions, withNavigation  } from "react-navigation";
import CommonText from '../../../common/components/CommonText';
import { Images } from "../../../User/components/images";
import {DETAILTRICK_SCREEN} from "../../router";
import {seaech_TrickNew} from "../../../Trick/redux/actions";
import * as APITrick from "../../../Trick/api/api";
import moment from "moment/moment";

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

    _renderItemNew = ({item}) => {
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

