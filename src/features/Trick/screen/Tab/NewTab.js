import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {Container, Card, CardItem, Body, Left, Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "react-navigation";
import CommonText from '../../../common/components/CommonText';
import { Images } from "../../../User/components/images";
import RankTrick from '../../components/RankTrick';
import DataTrick from "../../api/DataTrick";
import {DETAILTRICK_SCREEN} from "../../router";

class NewTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            films: DataTrick,
        };
    }

    _renderItem = ({item}) => {
        const { navigate } = this.props.navigation;
        return (
            <Card
                style={{flex: 1, width: '93%', marginLeft: 10}}
            >
                <CardItem
                    button
                    onPress={() => navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}})}
                >
                    <Left>
                        <Image
                            source={{uri: item.picture.large}}
                            style={{width: 70, height: 70}}
                        />
                    </Left>
                    <Body style={{ marginLeft: '-50%'}}>
                    <Text style={{fontSize: 14, color: '#020202', marginTop: 3, marginLeft: 3, fontWeight: 'bold'}}>{item.name.first}</Text>
                    <View style={{flex: 1, width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Image  style={{width: 28, height: 24}}
                                source={Images.TrickScreen.Heart}
                        />
                        <Text style={{ fontSize: 14, color: '#068e81'}}> {item.Follow + ' คน'} </Text>
                    </View>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        return (
            <Container withBackground>
                <Content>
                    <View style={{flex: 1, width: '100%', marginTop: 10}}>
                        <Card withSpace style={{marginTop: 20, marginLeft: -10 ,marginRight: -15 }}>
                            <CardItem style={{  width: '100%', height: '100%', backgroundColor: "#F4F4F4"}}>
                                <Body>
                                    <Image
                                        source={{uri: "https://randomuser.me/api/portraits/men/97.jpg"}}
                                        style={{width: '98%', height: 150}}
                                    />
                                <View style={{ width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 14, color: '#020202', marginLeft: 10, marginTop: 3, fontWeight: 'bold'}}>{'ท้าให้ลอง'}</Text>
                                    <View style={{width: '80%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' , marginTop: 20}}>
                                        <Image  style={{marginHorizontal: 10, width: 26, height: 20}}
                                                source={Images.TrickScreen.Heart}
                                        />
                                        <Text style={{ fontSize: 14, color: '#068e81'}}> {'500' + ' คน'} </Text>
                                    </View>
                                </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
                        <View style={{marginTop: 10, marginLeft: 15, width: '45%'}}>
                            <Card withSpace style={{marginLeft: 10 , marginRight: 10}}>
                                <CardItem style={{  width: '100%', height: '100%', backgroundColor: "#F4F4F4"}}>
                                    <Body>
                                        <Image
                                            source={{uri: "https://randomuser.me/api/portraits/men/95.jpg"}}
                                            style={{width: '100%', height: 100}}
                                        />
                                    <Text style={{fontSize: 11, color: '#020202', marginTop: 3, marginLeft: -10, fontWeight: 'bold'}}>{'อาหารเช้าดีต่อสุขภาพ'}</Text>
                                    <View style={{width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' , marginTop: 20}}>
                                        <Image  style={{marginHorizontal: 5, width: 20, height: 16}}
                                                source={Images.TrickScreen.Heart}
                                        />
                                        <Text style={{ fontSize: 12, color: '#068e81'}}> {'150' + ' คน'} </Text>
                                    </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={{marginTop: 10, marginLeft: 10, width: '45%'}}>
                            <Card withSpace style={{marginLeft: 10 , marginRight: 10}}>
                                <CardItem style={{  width: '100%', height: '100%', backgroundColor: "#F4F4F4"}}>
                                    <Body>
                                        <Image
                                            source={{uri: "https://randomuser.me/api/portraits/men/97.jpg"}}
                                            style={{width: '100%', height: 100}}
                                        />
                                    <Text style={{fontSize: 11, color: '#020202', marginTop: 3, marginLeft: -10, fontWeight: 'bold'}}>{'อาหารเช้าดีต่อสุขภาพ'}</Text>
                                    <View style={{width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' , marginTop: 20}}>
                                        <Image  style={{marginHorizontal: 5, width: 20, height: 16}}
                                                source={Images.TrickScreen.Heart}
                                        />
                                        <Text style={{ fontSize: 12, color: '#068e81'}}> {'150' + ' คน'} </Text>
                                    </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                    </View>
                    <View style={{flex: 1, width: '100%', marginTop: 10}}>
                        <FlatList
                            data={this.state.films}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default withNavigation(NewTab);

