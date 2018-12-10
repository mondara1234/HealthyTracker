import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {Container, Card, CardItem, Body, Left, Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "react-navigation";
import { Images } from "../../../User/components/images";
import RankTrick from '../../components/RankTrick';
import food from "../../../FoodDiary/api/food";
import { DETAILTRICK_SCREEN } from "../../../Trick/router";

class RankTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            films: food,
        };
    }

    _renderItem = ({item, index}) => {
        const Rankin = index + 1;
        const { navigate } = this.props.navigation;
        return (
            <Card withSpace style={{marginTop: 20, marginRight: -18 }}>
                <TouchableOpacity style={{  width: '100%', height: 70, backgroundColor: "#F4F4F4"}}
                                  onPress={() => navigate({routeName: DETAILTRICK_SCREEN, params: {trickData: item}}) }
                >
                    <Body>
                    <View style={{ width: '100%', backgroundColor: "#F4F4F4", flexDirection: 'row', justifyContent: 'space-between', marginTop: -10, marginLeft: -10}}>
                        <View style={{width: 80, height: 70}}>
                            <Image
                                source={{uri: item.picture.large}}
                                style={{width: 80, height: 70}}
                            />
                        </View>
                        <Text style={{fontSize: 18, color: '#020202', marginLeft: 10, marginTop: 10, fontWeight: 'bold'}}>{item.name.first}</Text>
                        <View style={{width: '50%', backgroundColor: "#F4F4F4", alignItems: 'flex-end', justifyContent: 'flex-end',marginTop: -40}}>
                            <RankTrick  itemImage={Images.TrickScreen.Rank}
                                        nameImg={Rankin}
                            />
                            <View style={{backgroundColor: "#F4F4F4", flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                <Image  style={{marginHorizontal: 10, width: 26, height: 20}}
                                        source={Images.TrickScreen.Heart}
                                />
                                <Text style={{ fontSize: 14, color: '#068e81'}}> {item.calorie + ' คน'} </Text>
                            </View>
                        </View>
                    </View>
                    </Body>
                </TouchableOpacity>
            </Card>
        )
    };

    render() {
        return (
            <Container withBackground>
                <Content>
                    <View style={{flex: 1, width: '100%'}}>
                        <Card withSpace style={{marginTop: 20, marginLeft: -10 ,marginRight: -15 }}>
                            <CardItem style={{  width: '100%', height: '100%', backgroundColor: "#F4F4F4"}}>
                                <Body>
                                <Image
                                    source={{uri: "https://randomuser.me/api/portraits/men/97.jpg"}}
                                    style={{width: '98%', height: 80, marginTop: -10}}
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
                        <View style={{marginTop: 20, marginLeft: 15, width: '45%'}}>
                            <Card withSpace style={{marginLeft: 10 , marginRight: 10}}>
                                <CardItem style={{  width: '100%', height: '100%', backgroundColor: "#F4F4F4"}}>
                                    <Body>
                                    <Image
                                        source={{uri: "https://randomuser.me/api/portraits/men/97.jpg"}}
                                        style={{width: '100%', height: 60, marginTop: -10}}
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
                        <View style={{marginTop: 20, marginLeft: 10, width: '45%'}}>
                            <Card withSpace style={{marginLeft: 10 , marginRight: 10}}>
                                <CardItem style={{  width: '100%', height: '100%', backgroundColor: "#F4F4F4"}}>
                                    <Body>
                                    <Image
                                        source={{uri: "https://randomuser.me/api/portraits/men/97.jpg"}}
                                        style={{width: '100%', height: 60, marginTop: -10}}
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
                    <View style={{flex: 1, width: '100%'}}>
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

export default withNavigation(RankTab);

