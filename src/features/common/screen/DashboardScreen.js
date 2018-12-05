import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text, Image } from 'react-native';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon, Button } from 'native-base';

const cards = [
    {
        text: 'Card 2',
        name: '3',
        image: require('../../../../pulic/assets/images/Boruto.jpg'),
    },
    {
        text: 'Card 4',
        name: 'One',
        image: require('../../../../pulic/assets/images/user.png'),
    },
    {
        text: 'Card One',
        name: '2',
        image: require('../../../../pulic/assets/images/List.jpg'),
    },
];

class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            query: '',
            fullData: []
        };
    }

    renderItem =(item) => {
      return (
          <Card style={{ elevation: 3 }}>
              <CardItem>
                  <Left>
                      <Thumbnail source={item.image} />
                      <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                      </Body>
                  </Left>
              </CardItem>
              <CardItem cardBody>
                  <Image style={{ height: 100, flex: 1 }} source={item.image} />
              </CardItem>
              <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
              </CardItem>
          </Card>
      )
    };

    render() {
        return (
            <ImageBackground
                source={require('../../../../pulic/assets/images/Boruto.jpg')}
                style={styles.container}
            >
                <View style={styles.overlayContainer}>
                    <View style={styles.top}>
                        <Text style={styles.header}> {"Healthy Tracker"} </Text>
                    </View>
                    <View style={styles.containerDeckSwiper}>
                        <Button
                            style={{ marginTop: 100 }}
                            onPress={() => this._deckSwiper._root.swipeLeft()}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                        <View style={styles.deckSwiperImg}>
                            <DeckSwiper
                                ref={(c) => this._deckSwiper = c}
                                dataSource={cards}
                                renderItem={(item) => this.renderItem(item)}
                            />
                        </View>
                        <Button
                            style={{ marginTop: 100 }}
                            onPress={() => this._deckSwiper._root.swipeRight()}
                        >
                            <Icon name="arrow-forward" />
                        </Button>
                    </View>
                </View>
            </ImageBackground>

        );
    }
}

DashboardScreen.navigationOptions  = ({navigation}) => ({
    header: null
});

const windows = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: windows.width,
        height: windows.height
    },
    overlayContainer: {
        width: windows.width,
        height: windows.height,
        backgroundColor: 'rgba(47, 163, 218, 0.4)'
    },
    top: {
        marginTop: 20,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 25,
        borderColor: '#fff',
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: 'rgba(255, 55, 255, 0.1)'
    },
    containerDeckSwiper:{
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20
    },
    deckSwiperImg:{
        flex: 1,
        height: 300
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }

});

export default DashboardScreen;
